import { assert, expect } from 'chai';
import * as mongoose from 'mongoose';

import { getName } from '../../src/internal/utils';
import { arrayProp, buildSchema, isDocumentArray, prop, Ref } from '../../src/typegoose';
import { Genders } from '../enums/genders';
import { Alias, model as AliasModel } from '../models/alias';
import { GetSet, GetSetModel } from '../models/getSet';
import { InternetUserModel } from '../models/internetUser';
import { BeverageModel as Beverage, InventoryModel as Inventory, ScooterModel as Scooter } from '../models/inventory';
import { OptionsClass, OptionsModel } from '../models/options';
import { model as User } from '../models/user';
import {
  NonVirtual,
  NonVirtualGS,
  NonVirtualGSModel,
  NonVirtualModel,
  Virtual,
  VirtualModel,
  VirtualSub,
  VirtualSubModel
} from '../models/virtualprop';

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 */
export function suite() {
  it('should add a language and job using instance methods', async () => {
    const user = await User.create({
      firstName: 'harry',
      lastName: 'potter',
      gender: Genders.MALE,
      languages: ['english'],
      uniqueId: 'unique-id'
    });
    await user.addJob({ position: 'Dark Wizzard', title: 'Archmage' });
    await user.addJob();
    const savedUser = await user.addLanguage();

    expect(savedUser.languages).to.include('Hungarian');
    expect(savedUser.previousJobs.length).to.be.above(0);
    savedUser.previousJobs.map((prevJob) => {
      expect(prevJob.startedAt).to.be.a('date');
    });
  });

  it('should add and populate the virtual properties', async () => {
    const virtual1 = await VirtualModel.create({ dummyVirtual: 'dummyVirtual1' } as Virtual);
    const virtualsub1 = await VirtualSubModel.create({
      dummy: 'virtualSub1',
      virtual: virtual1._id
    } as Partial<VirtualSub>);
    const virtualsub2 = await VirtualSubModel.create({
      dummy: 'virtualSub2',
      virtual: mongoose.Types.ObjectId() as Ref<any>
    } as Partial<VirtualSub>);
    const virtualsub3 = await VirtualSubModel.create({
      dummy: 'virtualSub3',
      virtual: virtual1._id
    } as Partial<VirtualSub>);

    const newfound = await VirtualModel.findById(virtual1._id).populate('virtualSubs').exec();

    expect(newfound.dummyVirtual).to.be.equal('dummyVirtual1');
    expect(newfound.virtualSubs).to.not.be.an('undefined');
    if (isDocumentArray(newfound.virtualSubs)) {
      expect(newfound.virtualSubs[0].dummy).to.be.equal('virtualSub1');
      expect(newfound.virtualSubs[0]._id.toString()).to.be.equal(virtualsub1._id.toString());
      expect(newfound.virtualSubs[1].dummy).to.be.equal('virtualSub3');
      expect(newfound.virtualSubs[1]._id.toString()).to.be.equal(virtualsub3._id.toString());
      expect(newfound.virtualSubs).to.not.include(virtualsub2);
    } else {
      assert.fail('Expected "newfound.virtualSubs" to be populated');
    }
  });

  it('should make use of nonVirtual set pre-processor', async () => {
    {
      // test if everything works
      const doc = await NonVirtualModel.create({ non: 'HELLO THERE' } as Partial<NonVirtual>);

      expect(doc.non).to.not.be.an('undefined');
      expect(doc.non).to.be.equals('hello there');
    }
    {
      // test if other options work too
      const doc = await NonVirtualModel.create({});

      expect(doc.non).to.not.be.an('undefined');
      expect(doc.non).to.be.equals('hello_default');
    }
  });

  it(`should add dynamic fields using map`, async () => {
    const user = await InternetUserModel.create({
      socialNetworks: {
        twitter: 'twitter account',
        facebook: 'facebook account'
      },
      sideNotes: {
        day1: {
          content: 'day1',
          link: 'url'
        },
        day2: {
          content: 'day2',
          link: 'url//2'
        }
      },
      projects: {}
    });
    expect(user).to.not.be.an('undefined');
    expect(user).to.have.property('socialNetworks').to.be.instanceOf(Map);
    expect(user.socialNetworks.get('twitter')).to.be.eq('twitter account');
    expect(user.socialNetworks.get('facebook')).to.be.eq('facebook account');
    expect(user).to.have.property('sideNotes').to.be.instanceOf(Map);
    expect(user.sideNotes.get('day1')).to.have.property('content', 'day1');
    expect(user.sideNotes.get('day1')).to.have.property('link', 'url');
    expect(user.sideNotes.has('day2')).to.be.equal(true);

    expect(user.sideNotes.get('day1')).to.not.have.property('_id');
    expect(user.sideNotes.get('day2')).to.not.have.property('_id');
  });

  it('Should support dynamic references via refPath', async () => {
    const sprite = await Beverage.create({
      isDecaf: true,
      isSugarFree: false
    });

    await Beverage.create({
      isDecaf: false,
      isSugarFree: true
    });

    const vespa = await Scooter.create({
      makeAndModel: 'Vespa'
    });

    await Inventory.create({
      refItemPathName: 'Beverage',
      kind: sprite,
      count: 10,
      value: 1.99
    });

    await Inventory.create({
      refItemPathName: 'Scooter',
      kind: vespa,
      count: 1,
      value: 1099.98
    });

    // I should now have two "inventory" items, with different embedded reference documents.
    const items = await Inventory.find({}).populate('kind').exec();
    expect((items[0].kind as typeof Beverage).isDecaf).to.be.equals(true);

    // wrong type to make typescript happy
    expect((items[1].kind as typeof Beverage).isDecaf).to.be.an('undefined');
  });

  it('it should alias correctly', () => {
    const created = new AliasModel({ alias: 'hello from aliasProp', normalProp: 'hello from normalProp' } as Alias);

    expect(created).to.not.be.an('undefined');
    expect(created).to.have.property('normalProp', 'hello from normalProp');
    expect(created).to.have.property('alias', 'hello from aliasProp');
    expect(created).to.have.property('aliasProp');

    // include virtuals
    {
      const toObject = created.toObject({ virtuals: true });
      expect(toObject).to.not.be.an('undefined');
      expect(toObject).to.have.property('normalProp', 'hello from normalProp');
      expect(toObject).to.have.property('alias', 'hello from aliasProp');
      expect(toObject).to.have.property('aliasProp', 'hello from aliasProp');
    }
    // do not include virtuals
    {
      const toObject = created.toObject();
      expect(toObject).to.not.be.an('undefined');
      expect(toObject).to.have.property('normalProp', 'hello from normalProp');
      expect(toObject).to.have.property('alias', 'hello from aliasProp');
      expect(toObject).to.not.have.property('aliasProp');
    }
  });

  it('should add model with createdAt and updatedAt', async () => {
    const { id: createdId } = await OptionsModel.create({ someprop: 10 } as OptionsClass);

    const found = await OptionsModel.findById(createdId).exec();

    expect(found).to.not.be.an('undefined');
    expect(found).to.have.property('someprop', 10);
    expect(found.createdAt).to.be.a.instanceOf(Date);
    expect(found.updatedAt).to.be.a.instanceOf(Date);
  });

  it('should make use of non-virtuals with pre- and post-processors', async () => {
    const doc = await NonVirtualGSModel.create({ non: ['hi', 'where?'] } as NonVirtualGS);
    // stored gets { non: 'hi where?' }

    expect(doc.non).to.not.be.an('undefined');
    expect(doc.non).to.deep.equals(['hi', 'where?']);
  });

  it('should add options to ref [szokodiakos#379]', () => {
    class T { }
    class TestRef {
      @prop({ ref: T, customoption: 'custom' })
      public someprop: Ref<T>;
    }

    const schema = buildSchema(TestRef);
    const someprop = schema.path('someprop');
    expect(schema).to.not.be.an('undefined');
    expect(someprop).to.not.be.an('undefined');
    // @ts-ignore
    const opt: any = someprop.options;
    expect(opt.type).to.be.an('function');
    expect(opt.ref).to.equal('T');
    expect(opt).to.have.property('customoption', 'custom');
  });

  it('should add options to refPath [szokodiakos#379]', () => {
    class T { }
    class TestRefPath {
      @prop({ default: 'T' })
      public something: string;

      @prop({ refPath: 'something', customoption: 'custom' })
      public someprop: Ref<T>;
    }

    const schema = buildSchema(TestRefPath);
    const someprop = schema.path('someprop');
    expect(schema).to.not.be.an('undefined');
    expect(someprop).to.not.be.an('undefined');
    // @ts-ignore
    const opt: any = someprop.options;
    expect(opt.type).to.be.an('function');
    expect(opt.refPath).to.equal('something');
    expect(opt).to.have.property('customoption', 'custom');
  });

  it('should add options to itemsRef [szokodiakos#379]', () => {
    class T { }
    class TestItemsRef {
      @arrayProp({ itemsRef: T, customoption: 'custom' })
      public someprop: Ref<T>[];
    }

    const schema = buildSchema(TestItemsRef);
    const someprop = schema.path('someprop');
    expect(schema).to.not.be.an('undefined');
    expect(someprop).to.not.be.an('undefined');
    // @ts-ignore
    const opt: any = someprop.options.type[0];
    expect(opt.type).to.be.an('function');
    expect(opt.ref).to.equal('T');
    expect(opt).to.have.property('customoption', 'custom');
  });

  it('should add options to itemsRefPath [szokodiakos#379]', () => {
    class T { }
    class TestItemsRefPath {
      @prop({ default: 'T' })
      public something: string;

      @arrayProp({ itemsRefPath: 'something', customoption: 'custom' })
      public someprop: Ref<T>;
    }

    const schema = buildSchema(TestItemsRefPath);
    const someprop = schema.path('someprop');
    expect(schema).to.not.be.an('undefined');
    expect(someprop).to.not.be.an('undefined');
    // @ts-ignore
    const opt: any = someprop.options.type[0];
    expect(opt.type).to.be.an('function');
    expect(opt.refPath).to.equal('something');
    expect(opt).to.have.property('customoption', 'custom');
  });

  it('should make use of virtual get- & set-ters', async () => {
    {
      const doc = await GetSetModel.create({ actualProp: 'hello1' } as GetSet);
      expect(doc).to.not.be.an('undefined');
      expect(doc.actualProp).to.equal('hello1');
      expect(doc.some).to.equal('hello1');
    }
    {
      const doc = await GetSetModel.create({ some: 'hello2' } as GetSet);
      expect(doc).to.not.be.an('undefined');
      expect(doc.actualProp).to.equal('hello2');
      expect(doc.some).to.equal('hello2');
    }
  });

  it('should add schema paths when there is a virtual called `name`', () => {
    class TestName {
      @prop()
      public something: string;

      public get name() {
        return 'TestNameNOT';
      }
    }

    const schema = buildSchema(TestName);
    const someprop = schema.path('something');

    expect(getName(TestName)).to.equal('TestName');
    expect(schema).to.not.be.an('undefined');
    expect(someprop).to.not.be.an('undefined');
  });
}
