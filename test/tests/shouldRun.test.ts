import { omit } from 'lodash';
import * as mongoose from 'mongoose';

import { DecoratorKeys } from '../../src/internal/constants';
import { globalOptions } from '../../src/internal/data';
import { assertion, assignMetadata, createArrayFromDimensions, mergeMetadata, mergeSchemaOptions } from '../../src/internal/utils';
import { logger } from '../../src/logSettings';
import { queryMethod } from '../../src/queryMethod';
import {
  addModelToTypegoose,
  arrayProp,
  buildSchema,
  DocumentType,
  getModelForClass,
  getModelWithString,
  isDocumentArray,
  mapProp,
  modelOptions,
  prop
} from '../../src/typegoose';
import type { IModelOptions, QueryMethodMap, ReturnModelType } from '../../src/types';

// Note: this file is meant for github issue verification & test adding for these
// -> and when not an outsourced class(/model) is needed

// tslint:disable:no-console

it('should not error when trying to get model multiple times', () => {
  class TEST { }
  getModelForClass(TEST);
  getModelForClass(TEST);
});

it('should return cache for buildSchema', () => {
  class TEST { }
  buildSchema(TEST);
  buildSchema(TEST);
});

it('should use existingMongoose', async () => {
  @modelOptions({ existingMongoose: mongoose })
  class TESTexistingMongoose { }
  expect(getModelForClass(TESTexistingMongoose)).not.toEqual(undefined);
});

it('should use existingConnection', async () => {
  @modelOptions({ existingConnection: mongoose.connection })
  class TESTexistingConnection { }
  expect(getModelForClass(TESTexistingConnection)).not.toEqual(undefined);
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

  expect(doc).not.toEqual(undefined);
  expect(doc.somevalue).toEqual('hello from SV');
  expect(doc.somesecondvalue).toEqual('hello from SSV');
});

it('should make use of Map default', async () => {
  class TestMapDefault {
    @mapProp({ of: String, default: new Map([['hello', 'hello']]) })
    public test: Map<string, string>;

    @prop()
    public someother: string;
  }

  const model = getModelForClass(TestMapDefault);
  const { _id: id } = await model.create({ someother: 'hi' });

  const found = await model.findById(id).exec();
  expect(found).not.toEqual(undefined);
  expect(found.someother).toEqual('hi');
  expect(found.test instanceof Map).toBe(true);
  expect(new Map(found.test)).toEqual(new Map([['hello', 'hello']]));
});

it('should work with Objects in Class [szokodiakos#54]', async () => {
  // TODO: refactor this test when moving to jest to use spies
  class TESTObject {
    @prop()
    public test: {
      anotherTest: string;
    };
  }

  logger.warn = jest.fn();

  const model = getModelForClass(TESTObject);
  const doc = await model.create({ test: { anotherTest: 'hello' } } as TESTObject);

  expect((logger.warn as any).mock.calls.length).toEqual(1);
  expect(doc).not.toEqual(undefined);
  expect(typeof doc.test).toBe('object');
  expect(doc.test.anotherTest).toEqual('hello');
});

it('simple test for assignMetadata', () => {
  class TestAssignMetadata { }

  assignMetadata(DecoratorKeys.ModelOptions, { testOption: 'hello' }, TestAssignMetadata);

  const reflected = Reflect.getMetadata(DecoratorKeys.ModelOptions, TestAssignMetadata);

  expect(reflected).not.toEqual(undefined);
  expect(reflected).toHaveProperty('testOption', 'hello');
});

it('should just run with an non existing value in "assignMetadata"', () => {
  class Dummy { }
  assignMetadata(DecoratorKeys.ModelOptions, { test: 'hello' }, Dummy);
  assignMetadata(DecoratorKeys.ModelOptions, undefined, Dummy);
  expect(Reflect.getMetadata(DecoratorKeys.ModelOptions, Dummy)).toEqual({ test: 'hello' });
});

it('should just run with an non existing value in "mergeMetadata"', () => {
  class Dummy { }
  assignMetadata(DecoratorKeys.ModelOptions, { schemaOptions: { _id: false } }, Dummy);
  expect(mergeMetadata(DecoratorKeys.ModelOptions, undefined, Dummy))
    .toEqual({ schemaOptions: { _id: false } });
});
it('should not modify current metadata object in "mergeMetadata"', () => {
  class Dummy { }
  const someData = { property: 'value' };
  Reflect.defineMetadata(DecoratorKeys.ModelOptions, someData, Dummy);
  mergeMetadata(DecoratorKeys.ModelOptions, { schemaOptions: { _id: false } }, Dummy);
  expect(someData).toEqual({ property: 'value' });
});

it('should just run with an non existing value in "mergeSchemaOptions"', () => {
  class Dummy { }
  assignMetadata(DecoratorKeys.ModelOptions, { schemaOptions: { _id: false } }, Dummy);
  expect(mergeSchemaOptions(undefined, Dummy)).toEqual({ _id: false });
});

it('merge options with assignMetadata', () => {
  @modelOptions({ schemaOptions: { timestamps: true, _id: false } })
  class TestAssignMetadata { }

  const model = getModelForClass(TestAssignMetadata, {
    schemaOptions: {
      _id: true,
      // @ts-ignore because it is only there for tests and doesn't exists on type "SchemaOptions" (from mongoose)
      testOption: 'hello'
    }
  });

  expect(model.schema.options).toHaveProperty('testOption', 'hello');
  expect(model.schema.options).toHaveProperty('timestamps', true);
  expect(model.schema.options).toHaveProperty('_id', true);
});

it('should make use of "@prop({ _id: false })" and have no _id', async () => {
  class TestidFalseNested {
    @prop()
    public hi: number;
  }
  class TestidFalse {
    @prop({ _id: false })
    public someprop: TestidFalseNested;
  }

  const model = getModelForClass(TestidFalse);
  const doc = await model.create({ someprop: { hi: 10 } } as TestidFalse);

  expect(doc).not.toEqual(undefined);
  expect(doc.someprop).toHaveProperty('hi', 10);
  expect(doc.someprop).not.toHaveProperty('_id');
});

// it('should run with a self-containing-class [typegoose#42]', () => {
//   class SelfContaining {
//     @prop()
//     public nest?: SelfContaining;
//   }

//   getModelForClass(SelfContaining);
// });

it('should make use of required as function [szokodiakos#247]', async () => {
  class RequiredFunction {
    @prop({ required: true })
    public someProp!: number;

    @prop({
      required(this: DocumentType<RequiredFunction>) {
        return this.someProp > 0;
      }
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

  const found = await model.findById(id).exec();
  expect(found).not.toEqual(undefined);
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

  expect(doc).not.toEqual(undefined);
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

  expect(doc).not.toEqual(undefined);
  const path = doc.schema.path('num');
  expect(path).not.toEqual(undefined);
  expect(path).not.toBeInstanceOf(mongoose.Schema.Types.Mixed);
  expect(path).toBeInstanceOf(CustomInt);
});

it('should not have the same options (modelOptions deep copy) [typegoose/typegoose#100]', () => {
  @modelOptions({ schemaOptions: { collection: '1' } })
  class SOBase { }

  @modelOptions({ schemaOptions: { collection: '2' } })
  class SOInheritedBase extends SOBase { }

  const refSOBase: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, SOBase);
  const refSOInheritedBase: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, SOInheritedBase);

  expect(refSOBase.schemaOptions.collection).not.toEqual(refSOInheritedBase.schemaOptions.collection);
  expect(refSOBase).not.toEqual(refSOInheritedBase);
});

it('should return the correct model "getModelWithString"', () => {
  class GetModelWithStringClass {
    @prop()
    public hi: string;
  }

  const model = getModelForClass(GetModelWithStringClass);
  const gotModel = getModelWithString<typeof GetModelWithStringClass>(model.modelName);

  expect(model).not.toEqual(undefined);
  expect(gotModel).not.toEqual(undefined);
  expect(gotModel).toEqual(model);
});

it('should return undefined if model does not exists (getModelWithString)', () => {
  const type = getModelWithString('someTestyString');

  expect(type).toEqual(undefined);
});

it('should merge existingConnection correctly (overwrite)', () => {
  // @ts-ignore ignore that "existingConnection" is not of type connection
  @modelOptions({ existingConnection: { hello: 1 } })
  class Dummy { }

  const out = mergeMetadata(DecoratorKeys.ModelOptions, { existingConnection: { hi: 1 } }, Dummy);

  expect(out).toEqual(Object.assign({}, omit(globalOptions, 'globalOptions'), { existingConnection: { hi: 1 } }));
});

it('should use "_id" from ModelOptions if not in @prop options [typegoose/typegoose#133]', () => {
  @modelOptions({ schemaOptions: { _id: false } })
  class SubID {
    @prop()
    public someprop: string;
  }

  class ParentID {
    @prop()
    public key: SubID;
  }

  const model = getModelForClass(ParentID);
  const doc = new model({ key: {} });

  expect(doc).not.toEqual(undefined);
  expect(doc.key).not.toEqual(undefined);
  expect(doc.key).not.toHaveProperty('_id');
});

it('should also allow "mongoose.Types.Array<string>" as possible type', () => {
  class TypesArray {
    @arrayProp({ items: String })
    public someString: mongoose.Types.Array<string>;
  }

  const schema = buildSchema(TypesArray);

  expect(schema.path('someString')).toBeInstanceOf(mongoose.Schema.Types.Array);
  expect((schema.path('someString') as any).caster).toBeInstanceOf(mongoose.Schema.Types.String);
});

// TODO: re-do this test when moving to jest
it('should give a warning [typegoose/typegoose#152]', () => {
  logger.warn = jest.fn();

  class TestANY {
    @prop()
    public someANY: any;
  }

  const schema = buildSchema(TestANY);
  expect((logger.warn as any).mock.calls.length).toEqual(1);
  expect(schema.path('someANY')).toBeInstanceOf(mongoose.Schema.Types.Mixed);
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
    three = 3
  }
  class AddNullToEnum {
    @prop({ enum: SomeNumberEnum, addNullToEnum: true })
    public value?: SomeNumberEnum;
  }
  const AddNullToEnumModel = getModelForClass(AddNullToEnum);

  const doc = new AddNullToEnumModel({ value: null } as AddNullToEnum);
  await doc.validate();

  const path: any = AddNullToEnumModel.schema.path('value');
  expect(path).toBeInstanceOf(mongoose.Schema.Types.Number);
  expect(path.options.enum).toEqual([1, 2, 3, null]);
});

it('should add query Methods', async () => {
  function findByName(this: ReturnModelType<typeof QueryMethods>, name: string) {
    return this.find({ name }); // important to not do an "await" and ".exec"
  }
  @queryMethod(findByName)
  class QueryMethods {
    @prop({ required: true })
    public name: string;
  }

  const QueryMethodsModel = getModelForClass(QueryMethods);
  const doc = await QueryMethodsModel.create({ name: 'hello' });

  const found: DocumentType<QueryMethods>[] | null = await (QueryMethodsModel.find() as any).findByName('hello').exec();
  assertion(isDocumentArray(found), new Error('Found is not an document array'));
  expect(found[0].toObject()).toEqual(doc.toObject());

  const metadata: QueryMethodMap = Reflect.getMetadata(DecoratorKeys.QueryMethod, QueryMethods);
  expect(Array.from(metadata)).toEqual([['findByName', findByName]]);
});
