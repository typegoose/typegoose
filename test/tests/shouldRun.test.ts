import mongoose from 'mongoose';
import { mapValueToSeverity } from '../../src/globalOptions';
import { AlreadyMerged, DecoratorKeys, PropType, Severity } from '../../src/internal/constants';
import { globalOptions } from '../../src/internal/data';
import {
  assertion,
  assignMetadata,
  createArrayFromDimensions,
  getName,
  isNullOrUndefined,
  isTypeMeantToBeArray,
  mergeMetadata,
  mergeSchemaOptions,
  toStringNoFail,
} from '../../src/internal/utils';
import { logger } from '../../src/logSettings';
import {
  addModelToTypegoose,
  buildSchema,
  DocumentType,
  getModelForClass,
  getModelWithString,
  isDocumentArray,
  modelOptions,
  Passthrough,
  prop,
  queryMethod,
} from '../../src/typegoose';
import type {
  ArraySubDocumentType,
  AsQueryMethod,
  Func,
  QueryHelperThis,
  QueryMethodMap,
  Ref,
  ReturnModelType,
  SubDocumentType,
} from '../../src/types';
import { CarModel } from '../models/car';
import { InternetUserModel } from '../models/internetUser';
import { PersonNestedModel, AddressNestedModel, AddressNested, PersonNested } from '../models/nestedObject';
import { PersonModel } from '../models/person';

// Note: this file is meant for github issue verification & test adding for these
// -> and when not an outsourced class(/model) is needed

beforeEach(() => {
  jest.restoreAllMocks();
});

it('should not error when trying to get model multiple times', () => {
  class TEST {}

  getModelForClass(TEST);
  getModelForClass(TEST);
});

it('should build multiple times', () => {
  class TEST {}

  buildSchema(TEST);
  buildSchema(TEST);
});

it('should make use of addModelToTypegoose', async () => {
  class TestAMTT {
    @prop({ required: true })
    public somevalue!: string;

    public somesecondvalue!: string;
  }

  const schema = buildSchema(TestAMTT);
  schema.add({ somesecondvalue: { type: String, required: true } });
  const model = addModelToTypegoose(mongoose.model(TestAMTT.name, schema), TestAMTT);
  const doc = await model.create({ somevalue: 'hello from SV', somesecondvalue: 'hello from SSV' } as TestAMTT);

  expect(doc).not.toBeUndefined();
  expect(doc.somevalue).toEqual('hello from SV');
  expect(doc.somesecondvalue).toEqual('hello from SSV');
});

it('should make use of Map default', async () => {
  class TestMapDefault {
    @prop({ type: String, default: new Map([['hello', 'hello']]) })
    public test?: Map<string, string>;

    @prop()
    public someother?: string;
  }

  const model = getModelForClass(TestMapDefault);
  const { _id: id } = await model.create({ someother: 'hi' });

  const found = await model.findById(id).orFail().exec();
  expect(found).not.toBeUndefined();
  expect(found.someother).toEqual('hi');
  expect(found.test instanceof Map).toBe(true);
  expect(new Map(found.test!)).toEqual(new Map([['hello', 'hello']]));
});

it('should work with Objects in Class [szokodiakos#54]', async () => {
  const spyWarn = jest.spyOn(logger, 'warn').mockImplementationOnce(() => void 0);

  class TESTObject {
    @prop()
    public test: {
      anotherTest: string;
    };
  }

  const model = getModelForClass(TESTObject);
  const doc = await model.create({ test: { anotherTest: 'hello' } } as TESTObject);

  expect(spyWarn).toHaveBeenCalledTimes(1);
  expect(spyWarn.mock.calls).toMatchSnapshot();
  expect(doc).not.toBeUndefined();
  expect(typeof doc.test).toBe('object');
  expect(doc.test.anotherTest).toEqual('hello');
});

it('simple test for assignMetadata', () => {
  class TestAssignMetadata {}

  assignMetadata(DecoratorKeys.ModelOptions, { testOption: 'hello' }, TestAssignMetadata);

  const reflected = Reflect.getMetadata(DecoratorKeys.ModelOptions, TestAssignMetadata);

  expect(reflected).not.toBeUndefined();
  expect(reflected).toHaveProperty('testOption', 'hello');
});

it('should just run with an non existing value in "assignMetadata"', () => {
  class Dummy {}

  assignMetadata(DecoratorKeys.ModelOptions, { test: 'hello' }, Dummy);
  assignMetadata(DecoratorKeys.ModelOptions, undefined, Dummy);
  expect(Reflect.getMetadata(DecoratorKeys.ModelOptions, Dummy)).toEqual({ test: 'hello' });
});

it('should just run with an non existing value in "mergeMetadata"', () => {
  class Dummy {}

  assignMetadata(DecoratorKeys.ModelOptions, { schemaOptions: { _id: false } }, Dummy);
  expect(mergeMetadata(DecoratorKeys.ModelOptions, undefined, Dummy)).toEqual({ schemaOptions: { _id: false } });
});
it('should not modify current metadata object in "mergeMetadata"', () => {
  class Dummy {}

  const someData = { property: 'value' };
  Reflect.defineMetadata(DecoratorKeys.ModelOptions, someData, Dummy);
  mergeMetadata(DecoratorKeys.ModelOptions, { schemaOptions: { _id: false } }, Dummy);
  expect(someData).toEqual({ property: 'value' });
});

it('should just run with an non existing value in "mergeSchemaOptions"', () => {
  class Dummy {}

  assignMetadata(DecoratorKeys.ModelOptions, { schemaOptions: { _id: false } }, Dummy);
  expect(mergeSchemaOptions(undefined, Dummy)).toEqual({ _id: false });
});

it('merge options with assignMetadata', () => {
  @modelOptions({ schemaOptions: { timestamps: true, _id: false } })
  class TestAssignMetadata {}

  const model = getModelForClass(TestAssignMetadata, {
    schemaOptions: {
      _id: true,
      // @ts-expect-error because it is only there for tests and doesn't exists on type "SchemaOptions" (from mongoose)
      testOption: 'hello',
    },
  });

  const schemaOptions = (model.schema as any).options;

  expect(schemaOptions).toHaveProperty('testOption', 'hello');
  expect(schemaOptions).toHaveProperty('timestamps', true);
  expect(schemaOptions).toHaveProperty('_id', true);
});

it('should make use of "@prop({ _id: false })" and have no _id', async () => {
  class TestidFalseNested {
    @prop()
    public hi: number;
  }

  class TestidFalse {
    @prop({ _id: false })
    public someprop?: TestidFalseNested;
  }

  const model = getModelForClass(TestidFalse);
  const doc = await model.create({ someprop: { hi: 10 } } as TestidFalse);

  expect(doc).not.toBeUndefined();
  expect(doc.someprop).toHaveProperty('hi', 10);
  expect(doc.someprop).not.toHaveProperty('_id');
});

it('should allow self-referencing classes', async () => {
  class SelfReference {
    @prop({ ref: () => SelfReference })
    public ref?: Ref<SelfReference>;
  }

  const SelfReferenceModel = getModelForClass(SelfReference);

  const doc1 = await SelfReferenceModel.create({});
  const doc2 = await SelfReferenceModel.create({ ref: doc1 });

  const found = await SelfReferenceModel.findById(doc2).orFail().populate('ref').exec();

  expect(found.toJSON()).toEqual(doc2.toJSON());
  const schemaPath = SelfReferenceModel.schema.path('ref');
  expect(schemaPath).toBeInstanceOf(mongoose.Schema.Types.ObjectId);
  expect((schemaPath as any).options.ref).toEqual(getName(SelfReference));
});

it('should make use of required as function [szokodiakos#247]', async () => {
  class RequiredFunction {
    @prop({ required: true })
    public someProp!: number;

    @prop({
      required(this: DocumentType<RequiredFunction>) {
        return this.someProp > 0;
      },
    })
    public someRequired?: string;
  }

  const model = getModelForClass(RequiredFunction);

  // this should work because the length is not higher than 0
  await model.create({ someProp: 0 } as RequiredFunction);

  try {
    // this should not work because someProp is higher than 0
    await model.create({ someProp: 3 } as RequiredFunction);
    fail('Expected to throw an "ValidationError"');
  } catch (err) {
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  }
});

it('should use type "Buffer" [typegoose#88]', async () => {
  class TestBuffer {
    @prop({ required: true })
    public propy!: Buffer;
  }

  const model = getModelForClass(TestBuffer);

  expect(model.schema.path('propy')).toBeInstanceOf(mongoose.Schema.Types.Buffer);

  const { _id: id } = await model.create({ propy: Buffer.from('Hello') } as TestBuffer);

  const found = await model.findById(id).orFail().exec();
  expect(found).not.toBeUndefined();
  expect(found.propy).toBeInstanceOf(Buffer);
  expect(found.propy.toString()).toEqual('Hello');
});

it('should use "type" as a last resort', async () => {
  class TestPropOptionType {
    @prop({ type: mongoose.Schema.Types.Number })
    public propy: string;
  }

  const model = getModelForClass(TestPropOptionType);

  expect(model.schema.path('propy')).toBeInstanceOf(mongoose.Schema.Types.Number);

  const doc = new model({ propy: 100 });

  expect(doc).not.toBeUndefined();
  expect(doc.propy).toEqual(100);
});

it('should run with Custom Types', async () => {
  // this test is a modified version of https://mongoosejs.com/docs/customschematypes.html
  class CustomInt extends mongoose.SchemaType {
    constructor(key: string, options: any) {
      super(key, options, 'CustomInt');
    }

    public cast(val) {
      return Number(val);
    }
  }

  (mongoose.Schema.Types as any).CustomInt = CustomInt;

  class CustomIntClass {
    @prop({ required: true, type: CustomInt })
    public num: number;
  }

  const model = getModelForClass(CustomIntClass);

  const doc = new model({ num: 1 } as CustomIntClass);

  await doc.validate();

  expect(doc).not.toBeUndefined();
  const path = doc.schema.path('num');
  expect(path).not.toBeUndefined();
  expect(path).not.toBeInstanceOf(mongoose.Schema.Types.Mixed);
  expect(path).toBeInstanceOf(CustomInt);
});

it('should return the correct model "getModelWithString"', () => {
  class GetModelWithStringClass {
    @prop()
    public hi: string;
  }

  const model = getModelForClass(GetModelWithStringClass);
  const gotModel = getModelWithString<typeof GetModelWithStringClass>(model.modelName);

  expect(model).not.toBeUndefined();
  expect(gotModel).not.toBeUndefined();
  expect(gotModel).toEqual(model);
});

it('should return undefined if model does not exists (getModelWithString)', () => {
  const type = getModelWithString('someTestyString');

  expect(type).toBeUndefined();
});

it('should also allow "mongoose.Types.Array<string>" as possible type', () => {
  class TypesArray {
    @prop({ type: String })
    public someString: mongoose.Types.Array<string>;
  }

  const schema = buildSchema(TypesArray);

  expect(schema.path('someString')).toBeInstanceOf(mongoose.Schema.Types.Array);
  expect((schema.path('someString') as any).embeddedSchemaType).toBeInstanceOf(mongoose.Schema.Types.String);
});

it('should give a warning when type is "any" [typegoose/typegoose#152]', () => {
  const spyWarn = jest.spyOn(logger, 'warn').mockImplementationOnce(() => void 0);

  class TestANY {
    @prop()
    public someANY: any;
  }

  const schema = buildSchema(TestANY);
  expect(schema.path('someANY')).toBeInstanceOf(mongoose.Schema.Types.Mixed);
  expect(spyWarn).toHaveBeenCalledTimes(1);
  expect(spyWarn.mock.calls).toMatchSnapshot();
});

it('should create 1D Array (createArrayFromDimensions)', () => {
  const should = [{ someThing: true }];
  expect(createArrayFromDimensions({}, { someThing: true }, '', '')).toEqual(should);
});

it('should create 5D Array (createArrayFromDimensions)', () => {
  const should = [[[[[{ someThing: true }]]]]];
  expect(createArrayFromDimensions({ dim: 5 }, { someThing: true }, '', '')).toEqual(should);
});

it('should not add another array if "extra" is already an array (createArrayFromDimensions)', () => {
  const should = [{ someThing: true }];
  expect(createArrayFromDimensions({}, [{ someThing: true }], '', '')).toEqual(should);
});

it('should add "null" to the enum (addNullToEnum)', async () => {
  enum SomeNumberEnum {
    one = 1,
    two = 2,
    three = 3,
  }

  class AddNullToEnum {
    @prop({ enum: SomeNumberEnum, addNullToEnum: true, type: Number })
    public value?: SomeNumberEnum | null;
  }

  const AddNullToEnumModel = getModelForClass(AddNullToEnum);

  const doc = new AddNullToEnumModel({ value: null } as AddNullToEnum);
  await doc.validate();

  const path: any = AddNullToEnumModel.schema.path('value');
  expect(path).toBeInstanceOf(mongoose.Schema.Types.Number);
  expect(path.options.enum).toEqual([1, 2, 3, null]);
});

it('should allow usage of enum with 0 or 1 dimensions', async () => {
  enum SomeNumberEnum {
    one = 1,
    two = 2,
  }

  class TestEnumDimensions0or1 {
    // 0 dimensions
    @prop({ enum: SomeNumberEnum, type: Number })
    public value1?: SomeNumberEnum;

    // 1 dimensions
    @prop({ enum: ['test1', 'test2'], type: String })
    public value2?: string;
  }

  const TestEnumDimensions0or1Model = getModelForClass(TestEnumDimensions0or1);

  const doc = new TestEnumDimensions0or1Model({ value1: SomeNumberEnum.one, value2: 'test1' } as TestEnumDimensions0or1);
  await doc.validate();

  const value1Path: any = TestEnumDimensions0or1Model.schema.path('value1');
  expect(value1Path).toBeInstanceOf(mongoose.Schema.Types.Number);
  expect(value1Path.options.enum).toEqual([1, 2]);

  const value2Path: any = TestEnumDimensions0or1Model.schema.path('value2');
  expect(value2Path).toBeInstanceOf(mongoose.Schema.Types.String);
  expect(value2Path.options.enum).toEqual(['test1', 'test2']);
});

it('should allow usage of deferred function enum', async () => {
  enum SomeNumberEnum {
    one = 1,
    two = 2,
  }

  class TestEnumDeferredFunc {
    // 0 dimensions
    @prop({ enum: () => SomeNumberEnum, type: Number })
    public value1?: SomeNumberEnum;

    // 1 dimensions
    @prop({ enum: () => ['test1', 'test2'], type: String })
    public value2?: string;
  }

  const TestEnumDeferredFuncModel = getModelForClass(TestEnumDeferredFunc);

  const doc = new TestEnumDeferredFuncModel({ value1: SomeNumberEnum.one, value2: 'test1' } as TestEnumDeferredFunc);
  await doc.validate();

  const value1Path: any = TestEnumDeferredFuncModel.schema.path('value1');
  expect(value1Path).toBeInstanceOf(mongoose.Schema.Types.Number);
  expect(value1Path.options.enum).toEqual([1, 2]);

  const value2Path: any = TestEnumDeferredFuncModel.schema.path('value2');
  expect(value2Path).toBeInstanceOf(mongoose.Schema.Types.String);
  expect(value2Path.options.enum).toEqual(['test1', 'test2']);
});

it('should allow usage of { values } for enum, with all typegoose options', async () => {
  enum SomeNumberEnum {
    one = 1,
    two = 2,
  }

  class TestEnumValues {
    // test deferred function typescript enum
    @prop({ enum: { values: () => SomeNumberEnum }, type: Number })
    public value1?: SomeNumberEnum;

    // test deferred function normal array
    @prop({ enum: { values: () => ['test1', 'test2'] }, type: String })
    public value2?: string;

    // test typescript enum
    @prop({ enum: { values: SomeNumberEnum }, type: Number })
    public value3?: SomeNumberEnum;

    // test normal array
    @prop({ enum: { values: ['test1', 'test2'] }, type: String })
    public value4?: string;
  }

  const TestEnumValuesModel = getModelForClass(TestEnumValues);

  const doc = new TestEnumValuesModel({ value1: SomeNumberEnum.one, value2: 'test1' } as TestEnumValues);
  await doc.validate();

  const value1Path: any = TestEnumValuesModel.schema.path('value1');
  expect(value1Path).toBeInstanceOf(mongoose.Schema.Types.Number);
  expect(value1Path.options.enum).toEqual({ values: [1, 2] });

  const value2Path: any = TestEnumValuesModel.schema.path('value2');
  expect(value2Path).toBeInstanceOf(mongoose.Schema.Types.String);
  expect(value2Path.options.enum).toEqual({ values: ['test1', 'test2'] });

  const value3Path: any = TestEnumValuesModel.schema.path('value3');
  expect(value3Path).toBeInstanceOf(mongoose.Schema.Types.Number);
  expect(value3Path.options.enum).toEqual({ values: [1, 2] });

  const value4Path: any = TestEnumValuesModel.schema.path('value4');
  expect(value4Path).toBeInstanceOf(mongoose.Schema.Types.String);
  expect(value4Path.options.enum).toEqual({ values: ['test1', 'test2'] });
});

it('should add query Methods', async () => {
  interface FindHelpers {
    findByName: AsQueryMethod<typeof findByName>;
    findByLastname: AsQueryMethod<typeof findByLastname>;
  }

  function findByName(this: QueryHelperThis<typeof QueryMethodsClass, FindHelpers>, name: string) {
    return this.find({ name });
  }

  function findByLastname(this: QueryHelperThis<typeof QueryMethodsClass, FindHelpers>, lastname: string) {
    return this.find({ lastname });
  }

  @queryMethod(findByName)
  @queryMethod(findByLastname)
  class QueryMethodsClass {
    @prop({ required: true })
    public name: string;

    @prop({ required: true })
    public lastname: string;
  }

  const QueryMethodsModel = getModelForClass<typeof QueryMethodsClass, FindHelpers>(QueryMethodsClass);

  const metadata: QueryMethodMap = Reflect.getMetadata(DecoratorKeys.QueryMethod, QueryMethodsClass);
  expect(metadata).toBeDefined();
  expect(metadata.size).toStrictEqual(2);
  expect(metadata).toStrictEqual(
    new Map([
      [findByName.name, findByName],
      [findByLastname.name, findByLastname],
    ])
  );

  const doc = await QueryMethodsModel.create({ name: 'hello', lastname: 'world' });

  const found = await QueryMethodsModel.find().findByName('hello').findByLastname('world').orFail().exec();
  assertion(isDocumentArray(found), new Error('Found is not an document array'));
  expect(found[0].toObject()).toEqual(doc.toObject());
  expect(found[0].name).toStrictEqual('hello');
});

it('should add query Methods with inheritance', async () => {
  interface FindHelpersBase {
    findByName: AsQueryMethod<typeof findByName>;
    findByLastname: AsQueryMethod<typeof findByLastname>;
  }

  function findByName(this: ReturnModelType<typeof QueryMethodsClassBase, FindHelpersBase>, name: string) {
    return this.find({ name });
  }

  function findByLastname(this: ReturnModelType<typeof QueryMethodsClassBase, FindHelpersBase>, lastname: string) {
    return this.find({ lastname });
  }

  @queryMethod(findByName)
  @queryMethod(findByLastname)
  class QueryMethodsClassBase {
    @prop({ required: true })
    public name: string;

    @prop({ required: true })
    public lastname: string;
  }

  interface FindHelpersExtended extends FindHelpersBase {
    findByAge: AsQueryMethod<typeof findByAge>;
  }

  function findByAge(this: ReturnModelType<typeof QueryMethodsClassExtended, FindHelpersExtended>, age: number) {
    return this.find({ age });
  }

  @queryMethod(findByAge)
  class QueryMethodsClassExtended extends QueryMethodsClassBase {
    @prop({ required: true })
    public age: number;
  }

  const QueryMethodsExtendedModel = getModelForClass<typeof QueryMethodsClassExtended, FindHelpersExtended>(QueryMethodsClassExtended);

  const metadata: QueryMethodMap = Reflect.getMetadata(DecoratorKeys.QueryMethod, QueryMethodsClassExtended);
  expect(metadata).toBeDefined();
  expect(metadata.size).toStrictEqual(3);
  expect(metadata).toStrictEqual(
    new Map<string, Func>([
      [findByName.name, findByName],
      [findByLastname.name, findByLastname],
      [findByAge.name, findByAge],
    ])
  );

  const doc = await QueryMethodsExtendedModel.create({ name: 'hello', lastname: 'world', age: 10 });

  const found = await QueryMethodsExtendedModel.find()
    .findByName('hello')
    .findByLastname('world')
    // @ts-expect-error I (hasezoey) could not get all functions to work with each other type-wise (typegoose 9.0, mongoose 6.0, typescript 4.4)
    .findByAge(10)
    .orFail()
    .exec();
  assertion(isDocumentArray(found), new Error('Found is not an document array'));
  expect(found[0].toObject()).toEqual(doc.toObject());
});

it('should output correct defaults with multiple inheritance [typegoose/typegoose#292]', () => {
  class Parent {
    // put default as a function if it needs to be dynamic
    @prop({ default: () => 'base' })
    public UID?: string;
  }

  class Child extends Parent {
    @prop({ default: () => 'overwritten' })
    declare public UID?: string;
  }

  class GrandChild extends Child {
    @prop()
    public something?: string;
  }

  const BaseModel = getModelForClass(Parent);
  const ChildModel = getModelForClass(Child);
  const GrandChildModel = getModelForClass(GrandChild);

  const baseDoc = new BaseModel();
  const childDoc = new ChildModel();
  const grandChildDoc = new GrandChildModel();

  expect(baseDoc.UID).toEqual('base');
  expect(childDoc.UID).toEqual('overwritten');
  expect(grandChildDoc.UID).toEqual('overwritten');
});

describe('get/set options', () => {
  it('should map PropType (none/array/map) correctly when using get/set options [typegoose#422]', async () => {
    class TestGetSetOptions {
      @prop({ get: () => 0, set: () => 1 })
      public normal?: number;

      @prop({ type: Number, get: () => [0], set: () => [1] })
      public array?: number[];

      @prop({ type: Number, get: () => new Map([['0', 0]]), set: () => new Map([['1', 1]]) })
      public map?: Map<string, number>;
    }

    const schema = buildSchema(TestGetSetOptions);
    expect(schema.path('normal')).toBeInstanceOf(mongoose.Schema.Types.Number);
    expect(schema.path('normal')).not.toHaveProperty('caster');
    expect(schema.path('array')).toBeInstanceOf(mongoose.Schema.Types.Array);
    expect((schema.path('array') as any).embeddedSchemaType).toBeInstanceOf(mongoose.Schema.Types.Number);
    expect(schema.path('map')).toBeInstanceOf(mongoose.Schema.Types.Map);
    expect((schema.path('map') as any).$__schemaType).toBeInstanceOf(mongoose.Schema.Types.Number);
    expect(schema.path('map')).not.toHaveProperty('caster');
  });

  it('should not Error if get/set options are used and type is an class and is an array [typegoose#478]', async () => {
    const origValue = 'hello';
    const changedValue = 'helloThere';

    class SubGetSetClassArray {
      @prop()
      public dummy?: string;
    }

    class ParentGetSetClassArray {
      @prop({
        get: (v) => v,
        set: (v: any[]) =>
          v.map((v) => {
            return { ...v, dummy: changedValue };
          }),
        type: () => [SubGetSetClassArray],
      })
      public nested?: SubGetSetClassArray[];
    }

    const ParentGetSetClassArrayModel = getModelForClass(ParentGetSetClassArray);

    const doc = new ParentGetSetClassArrayModel({ nested: [{ dummy: origValue }] });
    await doc.validate();
    expect(doc.nested?.[0].dummy).toStrictEqual(changedValue);
  });

  it('should allow being used with just one of the options (either set or get)', async () => {
    const setString = 'SetApplied';
    const getString = 'GetApplied';
    const origValue = 'someValue';

    // Test Set with no Get
    {
      class TestWithSetNoGet {
        @prop({ set: (v) => `${setString} ${v}` })
        public setted?: string;
      }

      const TestWithSetNoGetModel = getModelForClass(TestWithSetNoGet);

      const setNoGetDoc = new TestWithSetNoGetModel({ setted: origValue });
      expect(setNoGetDoc.setted).toStrictEqual(`${setString} ${origValue}`);
    }

    // Test Get with no Set
    {
      class TestWithGetNoSet {
        @prop({ get: (v) => `${getString} ${v}` })
        public getted?: string;
      }

      const TestWithGetNoSetModel = getModelForClass(TestWithGetNoSet);

      const getNoSetDoc = new TestWithGetNoSetModel({ getted: origValue });
      expect(getNoSetDoc.getted).toStrictEqual(`${getString} ${origValue}`);
    }
  });
});

describe('test the Passthrough class (non "direct")', () => {
  it('should make use of the "Passthrough" class (PropType.NONE)', async () => {
    const mongooseSchema = new mongoose.Schema({
      something: { type: { somePath: String } },
      somethingExtra: { type: { someExtraPath: [String] } },
    });

    class PassthroughPropTypeNONE {
      @prop({ type: () => new Passthrough({ somePath: String }) })
      public something?: { somePath: string };

      @prop({ type: new Passthrough({ someExtraPath: [String] }) })
      public somethingExtra?: { someExtraPath: string[] };
    }

    const typegooseSchema = buildSchema(PassthroughPropTypeNONE);
    const typegooseSomethingPath = typegooseSchema.path('something');
    const typegooseSomethingExtraPath = typegooseSchema.path('somethingExtra');
    const mongooseSomethingPath = mongooseSchema.path('something');
    const mongooseSomethingExtraPath = mongooseSchema.path('somethingExtra');

    // Since mongoose 6.0, this results in an actual Schema, see https://github.com/Automattic/mongoose/issues/7181
    expect(typegooseSomethingPath).toBeInstanceOf(mongoose.Schema.Types.Subdocument);
    expect(typegooseSomethingExtraPath).toBeInstanceOf(mongoose.Schema.Types.Subdocument);

    expect(mongooseSomethingPath).toBeInstanceOf(mongoose.Schema.Types.Subdocument);
    expect(mongooseSomethingExtraPath).toBeInstanceOf(mongoose.Schema.Types.Subdocument);

    /** Type to shorten using another type */
    type SubDocumentAlias = mongoose.Schema.Types.Subdocument;

    expect((typegooseSomethingPath as SubDocumentAlias).schema.path('somePath')).toMatchObject(
      expect.objectContaining({ path: 'somePath', schemaName: 'String' })
      // disable as jest 30 does not like to match this
      // (mongooseSomethingPath as SubDocumentAlias).schema.path('somePath').
    );

    expect((typegooseSomethingExtraPath as SubDocumentAlias).schema.path('someExtraPath')).toBeInstanceOf(mongoose.Schema.Types.Array);
    expect((mongooseSomethingExtraPath as SubDocumentAlias).schema.path('someExtraPath')).toBeInstanceOf(mongoose.Schema.Types.Array);

    /** Type to shorten using another type and to add "caster", because it does not exist on the type */
    type ArrayWithCaster = mongoose.Schema.Types.Array & { caster: any };
    expect(
      (typegooseSomethingExtraPath as SubDocumentAlias).schema.path<ArrayWithCaster>('someExtraPath').embeddedSchemaType
    ).toBeInstanceOf(mongoose.Schema.Types.String);
    expect(
      (mongooseSomethingExtraPath as SubDocumentAlias).schema.path<ArrayWithCaster>('someExtraPath').embeddedSchemaType
    ).toBeInstanceOf(mongoose.Schema.Types.String);

    // This is somehow not working, because somehow these 2 variables are not equal (maybe because of Symbols?)
    // expect((somethingExtraPath as SubDocumentAlias).schema.path('someExtraPath')).toMatchObject(
    //   (alsoSomethingExtraPath as SubDocumentAlias).schema.path('someExtraPath')
    // );
  });

  // currently does not work, see https://github.com/Automattic/mongoose/issues/10750
  it('should make use of the "Passthrough" class (PropType.ARRAY)', () => {
    const spyWarn = jest.spyOn(logger, 'warn').mockImplementation(() => void 0);
    const mongooseSchema = new mongoose.Schema({
      something: [{ type: { somePath: String } }],
    });

    class PassthroughPropTypeARRAY {
      @prop({ type: () => new Passthrough({ somePath: String }) })
      public something?: [{ somePath: string }];
    }

    const typegooseSchema = buildSchema(PassthroughPropTypeARRAY);
    const typegooseSomethingPath = typegooseSchema.path('something');
    const mongooseSomethingPath = mongooseSchema.path('something');

    expect(typegooseSomethingPath).toBeInstanceOf(mongoose.Schema.Types.DocumentArray);
    expect(mongooseSomethingPath).toBeInstanceOf(mongoose.Schema.Types.DocumentArray);

    expect((typegooseSomethingPath as any).embeddedSchemaType.schema).toBeInstanceOf(mongoose.Schema);
    expect((mongooseSomethingPath as any).embeddedSchemaType.schema).toBeInstanceOf(mongoose.Schema);

    expect((typegooseSomethingPath as any).embeddedSchemaType.schema.path('somePath')).toBeInstanceOf(mongoose.Schema.Types.String);
    expect((mongooseSomethingPath as any).embeddedSchemaType.schema.path('somePath')).toBeInstanceOf(mongoose.Schema.Types.String);

    expect(spyWarn).toHaveBeenCalledTimes(1);
    expect(spyWarn.mock.calls).toMatchSnapshot();
  });

  it('should make use of the "Passthrough" class (PropType.MAP)', () => {
    const spyWarn = jest.spyOn(logger, 'warn').mockImplementation(() => void 0);
    const mongooseSchema = new mongoose.Schema({
      something: {
        type: Map,
        of: { type: { somePath: String } },
      },
    });

    class PassthroughPropTypeMAP {
      @prop({ type: () => new Passthrough({ somePath: String }) })
      public something?: Map<string, { somePath: string }>;
    }

    const typegooseSchema = buildSchema(PassthroughPropTypeMAP);
    const typegooseSomethingPath = typegooseSchema.path('something');
    const mongooseSomethingPath = mongooseSchema.path('something');

    expect(typegooseSomethingPath).toBeInstanceOf(mongoose.Schema.Types.Map);
    expect(mongooseSomethingPath).toBeInstanceOf(mongoose.Schema.Types.Map);
    expect(spyWarn).toHaveBeenCalledTimes(1);
    expect(spyWarn.mock.calls).toMatchSnapshot();
  });
});

describe('test the Passthrough class with "direct"', () => {
  it('should make use of the "Passthrough" class with "direct" (PropType.NONE)', () => {
    const mongooseSchema = new mongoose.Schema({
      child: { somePath: String },
    });

    class TestPassthroughPropTypeNONEDirect {
      @prop({ type: () => new Passthrough({ somePath: String }, true) })
      public child?: { somePath: string };
    }

    const typegooseSchema = buildSchema(TestPassthroughPropTypeNONEDirect);

    expect(mongooseSchema.path('child')).toBeUndefined();
    expect(typegooseSchema.path('child')).toBeUndefined();

    expect(mongooseSchema.path('child.somePath')).toBeInstanceOf(mongoose.Schema.Types.String);
    expect(typegooseSchema.path('child.somePath')).toBeInstanceOf(mongoose.Schema.Types.String);
  });

  it('should make use of the "Passthrough" class with "direct" (PropType.ARRAY)', () => {
    const mongooseSchema = new mongoose.Schema({
      child: [{ somePath: String }],
    });

    class TestPassthroughPropTypeARRAYDirect {
      @prop({ type: () => new Passthrough([{ somePath: String }], true) })
      public child?: [{ somePath: string }];
    }

    const typegooseSchema = buildSchema(TestPassthroughPropTypeARRAYDirect);

    const mongooseChildPath = mongooseSchema.path('child');
    const typegooseChildPath = typegooseSchema.path('child');

    expect(mongooseChildPath).toBeInstanceOf(mongoose.Schema.Types.DocumentArray);
    expect(typegooseChildPath).toBeInstanceOf(mongoose.Schema.Types.DocumentArray);

    expect((mongooseChildPath as any).embeddedSchemaType.schema).toBeInstanceOf(mongoose.Schema);
    expect((typegooseChildPath as any).embeddedSchemaType.schema).toBeInstanceOf(mongoose.Schema);

    expect((mongooseChildPath as any).embeddedSchemaType.schema.path('somePath')).toBeInstanceOf(mongoose.Schema.Types.String);
    expect((typegooseChildPath as any).embeddedSchemaType.schema.path('somePath')).toBeInstanceOf(mongoose.Schema.Types.String);
  });

  it('should make use of the "Passthrough" class with "direct" (PropType.MAP)', () => {
    const mongooseSchema = new mongoose.Schema({
      child: {
        type: Map,
        of: { somePath: String },
      },
    });

    class TestPassthroughPropTypeMAPDirect {
      @prop({ type: () => new Passthrough({ type: Map, of: { somePath: String } }, true) })
      public child?: Map<string, { somePath: string }>;
    }

    const typegooseSchema = buildSchema(TestPassthroughPropTypeMAPDirect);

    const mongooseChildPath = mongooseSchema.path('child');
    const typegooseChildPath = typegooseSchema.path('child');

    expect(mongooseChildPath).toBeInstanceOf(mongoose.Schema.Types.Map);
    expect(typegooseChildPath).toBeInstanceOf(mongoose.Schema.Types.Map);

    const mongooseChildMapType = mongooseChildPath['$__schemaType'];
    const typegooseChildMapType = typegooseChildPath['$__schemaType'];

    expect(mongooseChildMapType).toBeInstanceOf(mongoose.Schema.Types.Subdocument);
    expect(typegooseChildMapType).toBeInstanceOf(mongoose.Schema.Types.Subdocument);

    expect(mongooseChildMapType.schema).toBeInstanceOf(mongoose.Schema);
    expect(typegooseChildMapType.schema).toBeInstanceOf(mongoose.Schema);

    expect(mongooseChildMapType.schema.path('somePath')).toBeInstanceOf(mongoose.Schema.Types.String);
    expect(typegooseChildMapType.schema.path('somePath')).toBeInstanceOf(mongoose.Schema.Types.String);
  });
});

it('should allow Maps with SubDocument "Map<string SubDocument>"', async () => {
  class NestedMapSubDocument {
    @prop()
    public dummy?: string;
  }

  class TestMapSubDocument {
    @prop({ type: () => NestedMapSubDocument, _id: false })
    public nesting?: Map<string, NestedMapSubDocument>;
  }

  const schema = buildSchema(TestMapSubDocument);
  const nestingPath = schema.path('nesting');
  // "$__schemaType" is an mongoose internal property (does not have types) which holds the type of a "Map"
  const casterNestingPath = nestingPath['$__schemaType'];

  expect(nestingPath).toBeInstanceOf(mongoose.Schema.Types.Map);
  expect(casterNestingPath).toBeInstanceOf(mongoose.Schema.Types.Subdocument);
  expect(casterNestingPath.schema.path('dummy')).toBeInstanceOf(mongoose.Schema.Types.String);
  expect(casterNestingPath.schema.paths).not.toHaveProperty('_id');
});

it('should allow Maps with SubDocument Array "Map<string SubDocument[]>"', async () => {
  class NestedMapSubDocumentArray {
    @prop()
    public dummy?: string;
  }

  class TestMapSubDocumentArray {
    @prop({ type: () => [NestedMapSubDocumentArray], _id: false })
    public nesting?: Map<string, NestedMapSubDocumentArray[]>;
  }

  const schema = buildSchema(TestMapSubDocumentArray);
  const nestingPath = schema.path('nesting');
  // "$__schemaType" is an mongoose internal property (does not have types) which holds the type of a "Map"
  const casterNestingPath = nestingPath['$__schemaType'];

  expect(nestingPath).toBeInstanceOf(mongoose.Schema.Types.Map);
  expect(casterNestingPath).toBeInstanceOf(mongoose.Schema.Types.DocumentArray);
  // this somehow does not work
  // expect(casterNestingPath.embeddedSchemaType).toEqual(mongoose.Schema.Types.Embedded);
  expect(casterNestingPath.schema.path('dummy')).toBeInstanceOf(mongoose.Schema.Types.String);
  expect(casterNestingPath.schema.paths).not.toHaveProperty('_id');
});

it('should not modify an immutable', async () => {
  class TestImmutable {
    @prop({ type: String, required: true, immutable: true })
    public someprop: Readonly<string>;
  }

  const TIModel = getModelForClass(TestImmutable);
  const doc = await TIModel.create({ someprop: 'Hello' });
  expect(doc).not.toBeUndefined();
  doc.someprop = 'Hello2';
  await doc.save();
  expect(doc.someprop).toEqual('Hello');
});

it('should allow creating a property named "id" [typegoose#476]', async () => {
  const shouldCreate = { normalProp: 'hello', id: 10 };
  @modelOptions({ schemaOptions: { id: false } }) // Disable the internal "id" virtual
  class ClassWithIDProperty {
    @prop()
    public normalProp?: string;

    @prop()
    public id?: number;
  }

  const model = getModelForClass(ClassWithIDProperty);

  const doc = await model.create(shouldCreate);

  // Add many options, to ensure that the "id" virtual does actually not exist
  expect(doc.toObject({ virtuals: true, getters: true, aliases: true })).toMatchSnapshot({ _id: expect.any(mongoose.Types.ObjectId) });
});

describe('tests for "mapValueToSeverity"', () => {
  it('should map string to enum (mapValueToSeverity)', () => {
    expect(mapValueToSeverity(0)).toStrictEqual(Severity.ALLOW);
    expect(mapValueToSeverity(1)).toStrictEqual(Severity.WARN);
    expect(mapValueToSeverity(2)).toStrictEqual(Severity.ERROR);
  });

  it('should map number to enum (mapValueToSeverity)', () => {
    expect(mapValueToSeverity('ALLOW')).toStrictEqual(Severity.ALLOW);
    expect(mapValueToSeverity('WARN')).toStrictEqual(Severity.WARN);
    expect(mapValueToSeverity('ERROR')).toStrictEqual(Severity.ERROR);
  });
});

it('utils.toStringNoFail should work correctly', () => {
  expect(toStringNoFail(undefined)).toStrictEqual('undefined');
  expect(toStringNoFail(null)).toStrictEqual('null');
  expect(toStringNoFail(0)).toStrictEqual('0');
  expect(toStringNoFail({})).toStrictEqual('[object Object]');
  expect(toStringNoFail(function t() {})).toStrictEqual('function t() { }');

  class TestToStringRedefine {
    public value: { inner: string };
    toString() {
      return this.value.inner; // ERROR: "value" is undefined and so cannot access "inner"
    }
  }

  expect(toStringNoFail(new TestToStringRedefine())).toStrictEqual('(Error: Converting value to String failed)');
});

it('utils.assertion should make use of arg1 being a function', () => {
  class CustomError extends Error {
    constructor() {
      super('CustomError');
    }
  }

  expect(assertion.bind(undefined, false, () => new CustomError())).toThrow(CustomError);
});

it('should correctly map a Map<string, string[]> [typegoose/typegoose#682]', () => {
  class MapStringArray {
    @prop({ required: true, type: () => [String] }, PropType.MAP)
    public mapArr!: Map<string, string[]>;
  }

  const schema = buildSchema(MapStringArray);

  const path = schema.path('mapArr');

  assertion(!isNullOrUndefined(path), new Error('"path" should not be undefined/null!'));

  expect(path).toBeInstanceOf(mongoose.Schema.Types.Map);
  expect(path['$__schemaType']).toBeInstanceOf(mongoose.Schema.Types.Array);
  expect(path['$__schemaType'].embeddedSchemaType).toBeInstanceOf(mongoose.Schema.Types.String);
});

it('should properly get if the type is meant to be a array', () => {
  expect(isTypeMeantToBeArray(undefined)).toBeFalsy();
  expect(isTypeMeantToBeArray({})).toBeFalsy();
  expect(isTypeMeantToBeArray({ dim: undefined })).toBeFalsy();
  expect(isTypeMeantToBeArray({ dim: 0 })).toBeFalsy();
  expect(isTypeMeantToBeArray({ dim: 1 })).toBeTruthy();
});

describe('warnMixed as property option', () => {
  beforeEach(() => {
    // set options so that they don't interferee with the tests
    globalOptions['options'] = globalOptions['options'] ?? {};
    globalOptions['options']['allowMixed'] = Severity.WARN;
  });

  it('should allow setting "allowMixed" as property option [typegoose/typegoose#620]', () => {
    class TestPropertyAllowMixed {
      @prop({ type: () => mongoose.Schema.Types.Mixed, allowMixed: Severity.ERROR })
      public someMixed?: any;
    }

    try {
      getModelForClass(TestPropertyAllowMixed);
      fail('Expected getModelForClass to fail');
    } catch (err) {
      expect(err).toBeInstanceOf(TypeError);
      assertion(err instanceof TypeError); // typescript check
      expect(err.message).toMatchSnapshot();
    }
  });
});

it('type "SubDocumentType" should work', () => {
  class SubDocumentTypeNest {
    @prop()
    public someprop?: string;
  }

  class SubDocumentTypeParent {
    @prop({ required: true, type: () => SubDocumentTypeNest })
    public sub!: SubDocumentType<SubDocumentTypeNest>;
  }

  const SubDocumentTypeParentModel = getModelForClass(SubDocumentTypeParent);

  const origDoc = new SubDocumentTypeParentModel({ sub: { someprop: 'hello' } });

  expect(origDoc.sub).not.toBeUndefined();
  expect(origDoc).toStrictEqual(origDoc.sub.parent());
  expect(origDoc.sub.$isSingleNested).toEqual(true);
});

it('type "ArraySubDocumentType" should work', () => {
  class ArraySubDocumentTypeNest {
    @prop()
    public someprop?: string;
  }

  class ArraySubDocumentTypeParent {
    @prop({ required: true, type: () => ArraySubDocumentTypeNest })
    public sub!: ArraySubDocumentType<ArraySubDocumentTypeNest>[];
  }

  const ArraySubDocumentTypeParentModel = getModelForClass(ArraySubDocumentTypeParent);

  const origDoc = new ArraySubDocumentTypeParentModel({ sub: [{ someprop: 'hello' }] });

  expect(origDoc.sub[0]).not.toBeUndefined();
  expect(origDoc.sub).toStrictEqual(origDoc.sub[0].parentArray());
});

it('should store nested address', async () => {
  const person = await PersonNestedModel.create({
    name: 'Person, Some',
    address: new AddressNestedModel({ street: 'A Street 1' } as AddressNested),
    moreAddresses: [
      new AddressNestedModel({ street: 'A Street 2' } as AddressNested),
      new AddressNestedModel({ street: 'A Street 3' } as AddressNested),
    ],
  } as PersonNested);

  expect(person).not.toBeUndefined();
  expect(person.name).toEqual('Person, Some');
  expect(person.address).not.toBeUndefined();
  expect(person.address!.street).toEqual('A Street 1');
  expect(person.moreAddresses).not.toBeUndefined();
  expect(person.moreAddresses!.length).toEqual(2);
  expect(person.moreAddresses![0].street).toEqual('A Street 2');
  expect(person.moreAddresses![1].street).toEqual('A Street 3');
});

it('should properly set Decimal128, ObjectId types to field', () => {
  expect((CarModel.schema as any).paths.price.instance).toEqual('Decimal128');
  expect((CarModel.schema as any).paths.someId.instance).toEqual('ObjectId');
});

// failed validation will need to be checked
it('should validate Decimal128', async () => {
  expect.assertions(3);
  try {
    await CarModel.create({
      carModel: 'Tesla',
      price: 'NO DECIMAL' as any,
    });
    fail('Validation must fail.');
  } catch (e) {
    expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
  }
  const car = await CarModel.create({
    carModel: 'Tesla',
    price: mongoose.Types.Decimal128.fromString('123.45'),
  });
  const foundCar = await CarModel.findById(car._id).orFail().exec();
  expect(foundCar.price).toBeInstanceOf(mongoose.Types.Decimal128);
  expect(foundCar.price.toString()).toEqual('123.45');
});

it('should validate email', async () => {
  try {
    await PersonModel.create({
      email: 'email',
    });
    fail('Validation must fail.');
  } catch (e) {
    expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(e.message).toEqual(
      // test it specifically, to know that it is not another error
      'Person validation failed: email: Validator failed for path `email` with value `email`'
    );
  }
});

it(`should Validate Map`, async () => {
  try {
    await InternetUserModel.create({
      projects: {
        p1: 'project' as any,
      },
    });
    fail('Validation should Fail');
  } catch (e) {
    expect(e).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(e.message).toEqual(
      // test it specifically, to know that it is not another error
      'InternetUser validation failed: projects.p1: `project` is not a valid enum value for path `projects.p1`.'
    );
  }
});

it('should not merge together symbols', () => {
  class Test {}

  const res = mergeMetadata(DecoratorKeys.ModelOptions, { [AlreadyMerged]: true, anotherValue: true }, Test);

  expect(res).toStrictEqual({ anotherValue: true });
  expect(res[AlreadyMerged]).toBeUndefined();
});

it('should resolve non-arrow function types correctly (#873)', () => {
  class Testy {
    @prop({
      type: function () {
        return String;
      },
    })
    public test?: any;
  }

  const schema = buildSchema(Testy);
  // expect(schema.path('test')).toBeInstanceOf(mongoose.Schema.Types.String); // expected
  expect(schema.path('test')).toBeInstanceOf(mongoose.Schema.Types.Subdocument); // current
});

describe('ref', () => {
  it('should allow deferred functions', () => {
    class Lower {
      @prop()
      public something?: string;
    }

    class RefDeferred {
      @prop({ ref: () => Lower })
      public ref?: Ref<Lower>;
    }

    const schema = buildSchema(RefDeferred);

    expect((schema.path('ref') as any).instance).toEqual('ObjectId');
    expect((schema.path('ref') as any).options.ref).toEqual('Lower');
  });

  it('should allow ref & type deferred functions', () => {
    class Lower {
      @prop()
      public something?: string;
    }

    class RefDeferred {
      @prop({ ref: () => Lower, type: () => String })
      public ref?: Ref<Lower, string>;
    }

    const schema = buildSchema(RefDeferred);

    expect((schema.path('ref') as any).instance).toEqual('String');
    expect((schema.path('ref') as any).options.ref).toEqual('Lower');
  });

  it('should allow array dimensions', () => {
    class Lower {
      @prop()
      public something?: string;
    }

    class RefDeferred {
      @prop({ ref: () => Lower, dim: 3 })
      public ref?: Ref<Lower>[][][];
    }

    const schema = buildSchema(RefDeferred);

    const schemaPath = schema.path('ref') as any;
    expect(schemaPath).toBeInstanceOf(mongoose.Schema.Types.Array);
    expect(schemaPath.instance).toEqual('Array');

    const path2 = schemaPath.embeddedSchemaType;
    expect(path2).toBeInstanceOf(mongoose.Schema.Types.Array);
    expect(path2.instance).toEqual('Array');

    const path3 = path2.embeddedSchemaType;
    expect(path3).toBeInstanceOf(mongoose.Schema.Types.Array);
    expect(path3.instance).toEqual('Array');

    const lowest = path3.embeddedSchemaType;
    expect(lowest.options.ref).toEqual('Lower');
  });

  it('should allow array dimensions, via "type" inference', () => {
    class Lower {
      @prop()
      public something?: string;
    }

    class RefDeferred {
      @prop({ ref: () => Lower, type: () => [[[mongoose.Types.ObjectId]]] })
      public ref?: Ref<Lower>[][][];
    }

    const schema = buildSchema(RefDeferred);

    const schemaPath = schema.path('ref') as any;
    expect(schemaPath).toBeInstanceOf(mongoose.Schema.Types.Array);
    expect(schemaPath.instance).toEqual('Array');

    const path2 = schemaPath.embeddedSchemaType;
    expect(path2).toBeInstanceOf(mongoose.Schema.Types.Array);
    expect(path2.instance).toEqual('Array');

    const path3 = path2.embeddedSchemaType;
    expect(path3).toBeInstanceOf(mongoose.Schema.Types.Array);
    expect(path3.instance).toEqual('Array');

    const lowest = path3.embeddedSchemaType;
    expect(lowest.options.ref).toEqual('Lower');
  });
});

it('should set PropType.ARRAY if dim is above 1 and Type is PropType.NONE and not manually set', () => {
  class ArrayTypeInferred {
    // inferred via reflection
    @prop()
    public normalInferred?: string;

    // explicitly set via "type" option
    @prop({ type: String })
    public normalExplicit?: Omit<string, ''>;

    // inferred via reflection
    @prop({ type: [String] })
    public arrayInferred?: string[];

    // overwriting PropType with dim > 0, without reflection
    @prop({ type: [String] })
    public arrayExplicit?: Omit<string[], ''>;

    // overwriting PropType manually
    @prop({ type: [String] }, PropType.NONE)
    public proptypeExplicit?: Omit<string[], ''>;
  }

  const schema = buildSchema(ArrayTypeInferred);

  const path1 = schema.path('normalInferred') as any;
  expect(path1).toBeInstanceOf(mongoose.Schema.Types.String);
  expect(path1.instance).toEqual('String');

  const path2 = schema.path('normalExplicit') as any;
  expect(path2).toBeInstanceOf(mongoose.Schema.Types.String);
  expect(path2.instance).toEqual('String');

  const path3 = schema.path('arrayInferred') as any;
  expect(path3).toBeInstanceOf(mongoose.Schema.Types.Array);
  expect(path3.instance).toEqual('Array');
  expect(path3.embeddedSchemaType).toBeInstanceOf(mongoose.Schema.Types.String);

  const path4 = schema.path('arrayExplicit') as any;
  expect(path4).toBeInstanceOf(mongoose.Schema.Types.Array);
  expect(path4.instance).toEqual('Array');
  expect(path4.embeddedSchemaType).toBeInstanceOf(mongoose.Schema.Types.String);

  const path5 = schema.path('proptypeExplicit') as any;
  expect(path5).toBeInstanceOf(mongoose.Schema.Types.String);
  expect(path5.instance).toEqual('String');
});
