import { expect } from 'chai';
import * as mongoose from 'mongoose';

import { Ref } from '../../src/typegoose';
import { Genders } from '../enums/genders';
import { Alias, model as AliasModel } from '../models/alias';
import { model as InternetUser } from '../models/internet-user';
import { BeverageModel as Beverage, InventoryModel as Inventory, ScooterModel as Scooter } from '../models/inventory';
import { model as User } from '../models/user';
import { Virtual, VirtualSub } from '../models/virtualprop';

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 * @example
 * ```
 * import { suite as ShouldAddTest } from './shouldAdd.test'
 * ...
 * describe('Should add', ShouldAddTest.bind(this));
 * ...
 * ```
 */
export function suite() {
  it('should add a language and job using instance methods', async () => {
    const user = await User.create({
      firstName: 'harry',
      lastName: 'potter',
      gender: Genders.MALE,
      languages: ['english'],
      uniqueId: 'unique-id',
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
    const virtualModel = new Virtual().getModelForClass(Virtual);
    const virtualSubModel = new VirtualSub().getModelForClass(VirtualSub);

    const virtual1 = await new virtualModel({ dummyVirtual: 'dummyVirtual1' } as Virtual).save();
    const virtualsub1 = await new virtualSubModel({
      dummy: 'virtualSub1',
      virtual: virtual1._id
    } as Partial<VirtualSub>).save();
    const virtualsub2 = await new virtualSubModel({
      dummy: 'virtualSub2',
      virtual: mongoose.Types.ObjectId() as Ref<any>
    } as Partial<VirtualSub>).save();
    const virtualsub3 = await new virtualSubModel({
      dummy: 'virtualSub3',
      virtual: virtual1._id
    } as Partial<VirtualSub>).save();

    const newfound = await virtualModel.findById(virtual1._id).populate('virtualSubs').exec();

    expect(newfound.dummyVirtual).to.be.equal('dummyVirtual1');
    expect(newfound.virtualSubs).to.not.be.an('undefined');
    expect(newfound.virtualSubs[0].dummy).to.be.equal('virtualSub1');
    expect(newfound.virtualSubs[0]._id.toString()).to.be.equal(virtualsub1._id.toString());
    expect(newfound.virtualSubs[1].dummy).to.be.equal('virtualSub3');
    expect(newfound.virtualSubs[1]._id.toString()).to.be.equal(virtualsub3._id.toString());
    expect(newfound.virtualSubs).to.not.include(virtualsub2);
  });

  it(`should add dynamic fields using map`, async () => {
    const user = await InternetUser.create({
      socialNetworks: {
        'twitter': 'twitter account',
        'facebook': 'facebook account',
      },
      sideNotes: {
        'day1': {
          content: 'day1',
          link: 'url'
        },
        'day2': {
          content: 'day2',
          link: 'url//2'
        },
      },
      projects: {},
    });
    expect(user).to.not.be.an('undefined');
    expect(user).to.have.property('socialNetworks').to.be.instanceOf(Map);
    expect(user.socialNetworks.get('twitter')).to.be.eq('twitter account');
    expect(user.socialNetworks.get('facebook')).to.be.eq('facebook account');
    expect(user).to.have.property('sideNotes').to.be.instanceOf(Map);
    expect(user.sideNotes.get('day1')).to.have.property('content', 'day1');
    expect(user.sideNotes.get('day1')).to.have.property('link', 'url');
    expect(user.sideNotes.has('day2')).to.be.equal(true);
  });

  it('Should support dynamic references via refPath', async () => {
    const sprite = new Beverage({
      isDecaf: true,
      isSugarFree: false
    });
    await sprite.save();

    await new Beverage({
      isDecaf: false,
      isSugarFree: true
    }).save();

    const vespa = new Scooter({
      makeAndModel: 'Vespa'
    });
    await vespa.save();

    await new Inventory({
      refItemPathName: 'Beverage',
      kind: sprite,
      count: 10,
      value: 1.99
    }).save();

    await new Inventory({
      refItemPathName: 'Scooter',
      kind: vespa,
      count: 1,
      value: 1099.98
    }).save();

    // I should now have two "inventory" items, with different embedded reference documents.
    const items = await Inventory.find({}).populate('kind');
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
}
