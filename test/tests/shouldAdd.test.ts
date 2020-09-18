import * as mongoose from 'mongoose';
import { schemas } from '../../src/internal/data';

import { assertion, isNullOrUndefined } from '../../src/internal/utils';
import {
  buildSchema,
  DocumentType,
  getClass,
  getModelForClass,
  getName,
  isDocument,
  isDocumentArray,
  prop,
  Ref
} from '../../src/typegoose';
import { Alias, AliasModel } from '../models/alias';
import { GetClassTestParent, GetClassTestParentModel, GetClassTestSub } from '../models/getClass';
import { GetSet, GetSetModel } from '../models/getSet';
import { InternetUserModel } from '../models/internetUser';
import { Beverage, BeverageModel, InventoryModel, ScooterModel } from '../models/inventory';
import { Job } from '../models/job';
import { OptionsClass, OptionsModel } from '../models/options';
import { Genders, User, UserModel } from '../models/user';
import {
  NonVirtual,
  NonVirtualGS,
  NonVirtualGSModel,
  NonVirtualModel,
  VirtualModel,
  VirtualSubModel
} from '../models/virtualprop';

it('should add a language and job using instance methods', async () => {
  const user = await UserModel.create<DocumentType<Omit<User, 'fullName'>>>({
    firstName: 'harry',
    lastName: 'potter',
    gender: Genders.MALE,
    languages: ['english'],
    uniqueId: 'unique-id'
  });
  await user.addJob(new Job({ position: 'Dark Wizzard', title: 'Archmage' }));
  await user.addJob();
  const savedUser = await user.addLanguage();

  assertion(!isNullOrUndefined(savedUser.previousJobs), new Error('Expected "previousJobs" to not be undefined/null'));

  expect(savedUser.languages.includes('Hungarian')).toBe(true);
  expect(savedUser.previousJobs.length > 0).toBe(true);
  savedUser.previousJobs.map((prevJob) => {
    expect(prevJob.startedAt instanceof Date).toBe(true);
  });
});

it('should add and populate the virtual properties', async () => {
  const virtual1 = await VirtualModel.create({ dummyVirtual: 'dummyVirtual1' });
  const virtualsub1 = await VirtualSubModel.create({
    dummy: 'virtualSub1',
    virtual: virtual1._id
  });
  const virtualsub2 = await VirtualSubModel.create({
    dummy: 'virtualSub2',
    virtual: mongoose.Types.ObjectId() as Ref<any>
  });
  const virtualsub3 = await VirtualSubModel.create({
    dummy: 'virtualSub3',
    virtual: virtual1._id
  });

  const newfound = await VirtualModel.findById(virtual1._id).populate('virtualSubs').orFail().exec();

  expect(newfound.dummyVirtual).toEqual('dummyVirtual1');
  expect(newfound.virtualSubs).not.toBeUndefined();
  if (isDocumentArray(newfound.virtualSubs!)) {
    expect(newfound.virtualSubs[0].dummy).toEqual('virtualSub1');
    expect(newfound.virtualSubs[0]._id.toString()).toEqual(virtualsub1._id.toString());
    expect(newfound.virtualSubs[1].dummy).toEqual('virtualSub3');
    expect(newfound.virtualSubs[1]._id.toString()).toEqual(virtualsub3._id.toString());
    expect(newfound.virtualSubs.includes(virtualsub2)).not.toBe(true);
  } else {
    fail('Expected "newfound.virtualSubs" to be populated');
  }
});

it('should make use of nonVirtual set pre-processor', async () => {
  {
    // test if everything works
    const doc = await NonVirtualModel.create({ non: 'HELLO THERE' } as Partial<NonVirtual>);

    expect(doc.non).not.toBeUndefined();
    expect(doc.non).toEqual('hello there');
  }
  {
    // test if other options work too
    const doc = await NonVirtualModel.create({});

    expect(doc.non).not.toBeUndefined();
    expect(doc.non).toEqual('hello_default');
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
  expect(user).not.toBeUndefined();
  expect(user).toHaveProperty('socialNetworks');
  expect(user.socialNetworks).toBeInstanceOf(Map);
  expect(user.socialNetworks!.get('twitter')).toEqual('twitter account');
  expect(user.socialNetworks!.get('facebook')).toEqual('facebook account');
  expect(user).toHaveProperty('sideNotes');
  expect(user.sideNotes).toBeInstanceOf(Map);
  expect(user.sideNotes!.get('day1')).toHaveProperty('content', 'day1');
  expect(user.sideNotes!.get('day1')).toHaveProperty('link', 'url');
  expect(user.sideNotes!.has('day2')).toEqual(true);

  expect(user.sideNotes!.get('day1')).not.toHaveProperty('_id');
  expect(user.sideNotes!.get('day2')).not.toHaveProperty('_id');
});

it('should support dynamic references via refPath', async () => {
  const sprite = await BeverageModel.create({
    isDecaf: true,
    isSugarFree: false
  });

  const vespa = await ScooterModel.create({
    makeAndModel: 'Vespa'
  });

  await InventoryModel.create({
    refItemPathName: 'Beverage',
    kind: sprite,
    kindArray: [sprite],
    count: 10,
    value: 1.99
  });

  await InventoryModel.create({
    refItemPathName: 'Scooter',
    kind: vespa,
    kindArray: [vespa],
    count: 1,
    value: 1099.98
  });

  // I should now have two "inventory" items, with different embedded reference documents.
  const items = await InventoryModel.find({}).populate('kind kindArray').exec();
  expect(items[0].refItemPathName).toEqual('Beverage');
  expect((items[0].kind as Beverage).isDecaf).toEqual(true);
  expect((items[0].kindArray[0] as Beverage).isDecaf).toEqual(true);

  // wrong type to make TypeScript happy
  expect(items[1].refItemPathName).toEqual('Scooter');
  expect((items[1].kind as Beverage).isDecaf).toBeUndefined();
  expect((items[1].kindArray[0] as Beverage).isDecaf).toBeUndefined();
});

it('it should alias correctly', () => {
  const created = new AliasModel({ alias: 'hello from aliasProp', normalProp: 'hello from normalProp' } as Alias);

  expect(created).not.toBeUndefined();
  expect(created).toHaveProperty('normalProp', 'hello from normalProp');
  expect(created).toHaveProperty('alias', 'hello from aliasProp');
  expect(created).toHaveProperty('aliasProp');

  // include virtuals
  {
    const toObject = created.toObject({ virtuals: true });
    expect(toObject).not.toBeUndefined();
    expect(toObject).toHaveProperty('normalProp', 'hello from normalProp');
    expect(toObject).toHaveProperty('alias', 'hello from aliasProp');
    expect(toObject).toHaveProperty('aliasProp', 'hello from aliasProp');
  }
  // do not include virtuals
  {
    const toObject = created.toObject();
    expect(toObject).not.toBeUndefined();
    expect(toObject).toHaveProperty('normalProp', 'hello from normalProp');
    expect(toObject).toHaveProperty('alias', 'hello from aliasProp');
    expect(toObject).not.toHaveProperty('aliasProp');
  }
});

it('should add model with createdAt and updatedAt', async () => {
  const { id: createdId } = await OptionsModel.create({ someprop: 10 } as OptionsClass);

  const found = await OptionsModel.findById(createdId).exec();

  expect(found).not.toBeUndefined();
  expect(found).toHaveProperty('someprop', 10);
  expect(found!.createdAt).toBeInstanceOf(Date);
  expect(found!.updatedAt).toBeInstanceOf(Date);
});

it('should make use of non-virtuals with pre- and post-processors', async () => {
  const doc = await NonVirtualGSModel.create({ non: ['hi', 'where?'] } as NonVirtualGS);
  // stored gets { non: 'hi where?' }

  expect(doc.non).not.toBeUndefined();
  expect(doc.non).toEqual(['hi', 'where?']);
});

it('should add options to ref [szokodiakos#379]', () => {
  class T { }
  class TestRef {
    @prop({ ref: T, customoption: 'custom' })
    public someprop: Ref<T>;
  }

  const schema = buildSchema(TestRef);
  const someprop = schema.path('someprop');
  expect(schema).not.toBeUndefined();
  expect(someprop).not.toBeUndefined();
  // @ts-expect-error
  const opt: any = someprop.options;
  expect(typeof opt.type).toEqual('function');
  expect(opt.ref).toEqual('T');
  expect(opt).toHaveProperty('customoption', 'custom');
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
  expect(schema).not.toBeUndefined();
  expect(someprop).not.toBeUndefined();
  // @ts-expect-error
  const opt: any = someprop.options;
  expect(typeof opt.type).toEqual('function');
  expect(opt.refPath).toEqual('something');
  expect(opt).toHaveProperty('customoption', 'custom');
});

it('should add options to array-ref [szokodiakos#379]', () => {
  class T { }
  class TestArrayRef {
    @prop({ ref: T, customoption: 'custom' })
    public someprop: Ref<T>[];
  }

  const schema = buildSchema(TestArrayRef);
  const someprop = schema.path('someprop');
  expect(schema).not.toBeUndefined();
  expect(someprop).not.toBeUndefined();
  // @ts-expect-error
  const opt: any = someprop.options.type[0];
  expect(typeof opt.type).toEqual('function');
  expect(opt.ref).toEqual('T');
  expect(opt).toHaveProperty('customoption', 'custom');
});

it('should add options to array-refPath [szokodiakos#379]', () => {
  class EmptyClass { }
  class TestArrayRefPath {
    @prop({ default: getName(EmptyClass) })
    public something: string;

    @prop({ refPath: 'something', customoption: 'custom' })
    public someprop: Ref<EmptyClass>[];
  }

  const schema = buildSchema(TestArrayRefPath);
  const someprop = schema.path('someprop');
  expect(schema).not.toBeUndefined();
  expect(someprop).not.toBeUndefined();
  expect(someprop).toBeInstanceOf(mongoose.Schema.Types.Array);
  // @ts-expect-error
  const opt: any = someprop.options.type[0];
  expect(typeof opt.type).toEqual('function');
  expect(opt.refPath).toEqual('something');
  expect(opt).toHaveProperty('customoption', 'custom');
});

it('should make use of virtual get- & set-ters', async () => {
  {
    const doc = await GetSetModel.create({ actualProp: 'hello1' } as GetSet);
    expect(doc).not.toBeUndefined();
    expect(doc.actualProp).toEqual('hello1');
    expect(doc.someGetSet).toEqual('hello1');
  }
  {
    const doc = await GetSetModel.create({ someGetSet: 'hello2' } as GetSet);
    expect(doc).not.toBeUndefined();
    expect(doc.actualProp).toEqual('hello2');
    expect(doc.someGetSet).toEqual('hello2');
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

  expect(getName(TestName)).toEqual('TestName');
  expect(schema).not.toBeUndefined();
  expect(someprop).not.toBeUndefined();
});

describe('utils.getClass', () => {
  it('should get class by string', () => {
    const doc = new GetClassTestParentModel({ nested: { subprop: 'hi' } });

    expect(getClass(doc.typegooseName())).toEqual(GetClassTestParent);
    expect(getClass((doc.nested as any).typegooseName())).toEqual(GetClassTestSub);
  });

  it('should get class by Document / Embedded', () => {
    const doc = new GetClassTestParentModel({ nested: { subprop: 'hi' } });

    expect(getClass(doc)).toEqual(GetClassTestParent);
    expect(getClass(doc.nested)).toEqual(GetClassTestSub);
  });

  it('should get class by typegooseString', () => {
    const doc = { typegooseName: getName(GetClassTestParent), testy: { typegooseName: getName(GetClassTestSub) } };

    expect(getClass(doc)).toEqual(GetClassTestParent);
    expect(getClass(doc.testy)).toEqual(GetClassTestSub);
  });
});

it('should work with both map creation types', async () => {
  class MapTest {
    @prop({ type: Number, required: true })
    public prop: Map<string, number>;
  }

  const MapTestModel = getModelForClass(MapTest);

  const variant1 = new MapTestModel({
    prop: [
      ['key1', 1],
      ['key2', 2]
    ]
  });
  await variant1.validate();

  const variant2 = new MapTestModel({ prop: { key1: 1, key2: 2 } });
  await variant2.validate();
});

it('should set innerOptions correctly', () => {
  class InnerOptions {
    @prop({ type: String, innerOptions: { hello: true } })
    public someArray: string[];
  }

  const schema = buildSchema(InnerOptions);
  const path: any = schema.path('someArray');

  expect(path).toBeInstanceOf(mongoose.Schema.Types.Array);
  expect(path.caster).toBeInstanceOf(mongoose.Schema.Types.String);
  expect(path.caster.options).toHaveProperty('hello', true);
  expect(path.options).not.toHaveProperty('hello', true);
});

it('should set outerOptions correctly', () => {
  class OuterOptions {
    @prop({ type: String, outerOptions: { hello: true } })
    public someArray: string[];
  }

  const schema = buildSchema(OuterOptions);
  const path: any = schema.path('someArray');

  expect(path).toBeInstanceOf(mongoose.Schema.Types.Array);
  expect(path.caster).toBeInstanceOf(mongoose.Schema.Types.String);
  expect(path.caster.options).not.toHaveProperty('hello', true);
  expect(path.options).toHaveProperty('hello', true);
});

it('should use "dim" correctly', () => {
  class DimArrayClassNested {
    @prop()
    public nested?: string;
  }
  class DimArrayClass {
    @prop({ type: String, dim: 2 })
    public primitive?: string[][];

    @prop({ type: DimArrayClassNested, dim: 2 })
    public subdocument?: DimArrayClassNested[][];
  }

  const schema = buildSchema(DimArrayClass);
  const fromSchemas = schemas.get(getName(DimArrayClass));

  assertion(!isNullOrUndefined(fromSchemas), new Error('"fromSchemas" should not be undefined/null!'));

  // test primitive path
  {
    type PrimitivePath = mongoose.Schema.Types.Array & { casterConstructor: { caster: mongoose.Schema.Types.String; }; };
    const primitivePath: PrimitivePath = schema.path('primitive') as any;
    expect(primitivePath).toBeInstanceOf(mongoose.Schema.Types.Array);
    expect(primitivePath.casterConstructor).toBeInstanceOf(mongoose.Schema.Types.Array);
    expect(primitivePath.casterConstructor.caster).toBeInstanceOf(mongoose.Schema.Types.String);

    const primitiveFromSchemas: { type: [[{ type: mongoose.Schema.Types.String; }]]; } = fromSchemas.primitive as any;
    expect(primitiveFromSchemas).not.toHaveProperty('dim');
    expect(primitiveFromSchemas.type).toBeInstanceOf(Array);
    expect(primitiveFromSchemas.type[0][0].type).toEqual(String);
  }

  // test nested path
  {
    type SubDocumentPath = mongoose.Schema.Types.Array & { casterConstructor: { caster: { schema: mongoose.Schema; }; }; };
    const subdocumentPath: SubDocumentPath = schema.path('subdocument') as any;
    expect(subdocumentPath).toBeInstanceOf(mongoose.Schema.Types.Array);
    expect(subdocumentPath.casterConstructor).toBeInstanceOf(mongoose.Schema.Types.Array);
    expect(subdocumentPath.casterConstructor.caster).toBeInstanceOf(Function);
    expect(subdocumentPath.casterConstructor.caster.schema).toBeInstanceOf(mongoose.Schema);

    const subdocumentFromSchemas: { type: [[{ type: mongoose.Schema; }]]; } = fromSchemas.subdocument as any;
    expect(subdocumentFromSchemas).not.toHaveProperty('dim');
    expect(subdocumentFromSchemas.type).toBeInstanceOf(Array);
    expect(subdocumentFromSchemas.type[0][0].type).toBeInstanceOf(mongoose.Schema);
  }
});

it('should allow NestJS / Type-Graphql way of defining arrays [typegoose#365]', () => {
  class ArrayAsType {
    @prop({ type: () => [[String]], required: true })
    public primitive!: string[][];
  }

  const schema = buildSchema(ArrayAsType);

  type PrimitivePath = mongoose.Schema.Types.Array & { casterConstructor: { caster: mongoose.Schema.Types.String; }; };
  const primitivePath: PrimitivePath = schema.path('primitive') as any;
  expect(primitivePath).toBeInstanceOf(mongoose.Schema.Types.Array);
  expect(primitivePath.casterConstructor).toBeInstanceOf(mongoose.Schema.Types.Array);
  expect(primitivePath.casterConstructor.caster).toBeInstanceOf(mongoose.Schema.Types.String);
});

it('should allow dynamic use of "ref" (since mongoose 4.13)', async () => {
  class NestedRef {
    @prop({ required: true })
    public someProp!: string;
  }
  class ParentRef {
    @prop({ ref: () => (doc: DocumentType<ParentRef>) => doc.from })
    public nested!: Ref<NestedRef>;

    @prop({ required: true })
    public from!: string;
  }

  const NestedRefModel = getModelForClass(NestedRef);
  const ParentRefModel = getModelForClass(ParentRef);

  expect((schemas.get(getName(ParentRef)) as any).nested.ref).toBeInstanceOf(Function);

  const nested = await NestedRefModel.create({ someProp: 'Hello' });
  const parent = await ParentRefModel.create({ from: getName(NestedRef), nested: nested._id });

  const found = await ParentRefModel.findById(parent._id).populate('nested').orFail().exec();

  assertion(isDocument(found.nested), new Error('Expected "found.nested" to be populated'));
  expect(found.nested.someProp).toEqual('Hello');
});

it('should allow dynamic "foreignField" and "localField" (since mongoose 4.13)', async () => {
  class NestedFFLF {
    @prop({ required: true })
    public someProp!: string;

    @prop({ required: true })
    public parentId!: mongoose.Types.ObjectId;
  }
  class ParentFFLF {
    @prop({
      ref: () => NestedFFLF,
      foreignField: () => 'parentId',
      localField: (doc: DocumentType<ParentFFLF>) => doc.local,
      justOne: false
    })
    public nested?: Ref<NestedFFLF>[];

    @prop({ required: true })
    public local!: string;
  }

  const NestedFFLFModel = getModelForClass(NestedFFLF);
  const ParentFFLFModel = getModelForClass(ParentFFLF);

  const gotVirtuals: any = ParentFFLFModel.schema.virtualpath('nested');
  expect(gotVirtuals.options.foreignField).toBeInstanceOf(Function);
  expect(gotVirtuals.options.localField).toBeInstanceOf(Function);

  const parent = await ParentFFLFModel.create({ local: '_id' });
  await NestedFFLFModel.create({ someProp: 'Hello1', parentId: parent._id });
  await NestedFFLFModel.create({ someProp: 'Hello2', parentId: parent._id });

  const found = await ParentFFLFModel.findById(parent._id).populate('nested').orFail().exec();

  assertion(isDocumentArray(found.nested), new Error('Expected "found.nested" to be populated'));
  expect(found.nested.length).toEqual(2);
  expect(found.nested[0].someProp).toEqual('Hello1');
  expect(found.nested[1].someProp).toEqual('Hello2');
});
