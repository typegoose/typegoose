import * as mongoose from 'mongoose';
import { DecoratorKeys } from '../../src/internal/constants';
import { assertion, assignMetadata, createArrayFromDimensions, getName, mergeMetadata, mergeSchemaOptions } from '../../src/internal/utils';
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
import type { AsQueryMethod, Func, QueryMethodMap, Ref, ReturnModelType } from '../../src/types';

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

  const doc1 = await SelfReferenceModel.create();
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
  expect((schema.path('someString') as any).caster).toBeInstanceOf(mongoose.Schema.Types.String);
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

it('should add query Methods', async () => {
  interface FindHelpers {
    findByName: AsQueryMethod<typeof findByName>;
    findByLastname: AsQueryMethod<typeof findByLastname>;
  }

  function findByName(this: ReturnModelType<typeof QueryMethodsClass, FindHelpers>, name: string) {
    return this.find({ name });
  }

  function findByLastname(this: ReturnModelType<typeof QueryMethodsClass, FindHelpers>, lastname: string) {
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
    public UID?: string;
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
  it('should map WhatIsIt (none/array/map) correctly when using get/set options [typegoose#422]', async () => {
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
    expect((schema.path('array') as any).caster).toBeInstanceOf(mongoose.Schema.Types.Number);
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

it('should make use of the "Passthrough" class', async () => {
  const alsoSchema = new mongoose.Schema({
    something: { type: { somePath: String } },
    somethingExtra: { type: { someExtraPath: [String] } },
  });

  class SomeTestClass {
    @prop({ type: () => new Passthrough({ somePath: String }) })
    public something?: { somePath: string };

    @prop({ type: new Passthrough({ someExtraPath: [String] }) })
    public somethingExtra?: { someExtraPath: string[] };
  }

  const typegooseSchema = buildSchema(SomeTestClass);
  const somethingPath = typegooseSchema.path('something');
  const somethingExtraPath = typegooseSchema.path('somethingExtra');
  const alsoSomethingPath = alsoSchema.path('something');
  const alsoSomethingExtraPath = alsoSchema.path('somethingExtra');

  // Since mongoose 6.0, this results in an actual Schema, see https://github.com/Automattic/mongoose/issues/7181
  expect(somethingPath).toBeInstanceOf(mongoose.Schema.Types.Subdocument);
  expect(somethingExtraPath).toBeInstanceOf(mongoose.Schema.Types.Subdocument);

  /** Type to shorten using another type */
  type SubDocumentAlias = mongoose.Schema.Types.Subdocument;

  expect((somethingPath as SubDocumentAlias).schema.path('somePath')).toMatchObject(
    (alsoSomethingPath as SubDocumentAlias).schema.path('somePath')
  );

  expect((somethingExtraPath as SubDocumentAlias).schema.path('someExtraPath')).toBeInstanceOf(mongoose.Schema.Types.Array);
  expect((alsoSomethingExtraPath as SubDocumentAlias).schema.path('someExtraPath')).toBeInstanceOf(mongoose.Schema.Types.Array);

  /** Type to shorten using another type and to add "caster", because it does not exist on the type */
  type ArrayWithCaster = mongoose.Schema.Types.Array & { caster: any };
  expect((somethingExtraPath as SubDocumentAlias).schema.path<ArrayWithCaster>('someExtraPath').caster).toBeInstanceOf(
    mongoose.Schema.Types.String
  );
  expect((alsoSomethingExtraPath as SubDocumentAlias).schema.path<ArrayWithCaster>('someExtraPath').caster).toBeInstanceOf(
    mongoose.Schema.Types.String
  );

  // This is somehow not working, because somehow these 2 variables are not equal (maybe because of Symbols?)
  // expect((somethingExtraPath as SubDocumentAlias).schema.path('someExtraPath')).toMatchObject(
  //   (alsoSomethingExtraPath as SubDocumentAlias).schema.path('someExtraPath')
  // );
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
  // expect(casterNestingPath.caster).toEqual(mongoose.Schema.Types.Embedded);
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
