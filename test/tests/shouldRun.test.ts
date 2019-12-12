import { assert, expect } from 'chai';
import { omit } from 'lodash';
import * as mongoose from 'mongoose';

import { DecoratorKeys } from '../../src/internal/constants';
import { globalOptions } from '../../src/internal/data';
import { assignMetadata, mergeMetadata, mergeSchemaOptions } from '../../src/internal/utils';
import {
  addModelToTypegoose,
  buildSchema,
  DocumentType,
  getModelForClass,
  getModelWithString,
  mapProp,
  modelOptions,
  prop
} from '../../src/typegoose';
import { IModelOptions } from '../../src/types';

// Note: this file is meant for github issue verification & test adding for these
// -> and when not an outsourced class(/model) is needed

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 */
export function suite() {
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
    expect(getModelForClass(TESTexistingMongoose)).to.not.be.an('undefined');
  });

  it('should use existingConnection', async () => {
    @modelOptions({ existingConnection: mongoose.connection })
    class TESTexistingConnection { }
    expect(getModelForClass(TESTexistingConnection)).to.not.be.an('undefined');
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

    expect(doc).to.not.be.an('undefined');
    expect(doc.somevalue).to.equal('hello from SV');
    expect(doc.somesecondvalue).to.equal('hello from SSV');
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
    expect(found).to.not.be.an('undefined');
    expect(found.someother).to.be.equal('hi');
    expect(found.test).to.be.an('map');
    expect(found.test).to.be.deep.equal(new Map([['hello', 'hello']]));
  });

  it('should work with Objects in Class [szokodiakos#54]', async () => {
    class TESTObject {
      @prop()
      public test: {
        anotherTest: string;
      };
    }

    const model = getModelForClass(TESTObject);
    const doc = await model.create({ test: { anotherTest: 'hello' } } as TESTObject);

    expect(doc).to.not.be.an('undefined');
    expect(doc.test).to.be.an('object');
    expect(doc.test.anotherTest).to.be.equal('hello');
  });

  it('simple test for assignMetadata', () => {
    class TestAssignMetadata { }

    assignMetadata(DecoratorKeys.ModelOptions, { testOption: 'hello' }, TestAssignMetadata);

    const reflected = Reflect.getMetadata(DecoratorKeys.ModelOptions, TestAssignMetadata);

    expect(reflected).to.not.be.an('undefined');
    expect(reflected).to.have.property('testOption', 'hello');
  });

  it('should just run with an non existing value in "assignMetadata"', () => {
    class Dummy { }
    assignMetadata(DecoratorKeys.ModelOptions, { test: 'hello' }, Dummy);
    assignMetadata(DecoratorKeys.ModelOptions, undefined, Dummy);
    expect(Reflect.getMetadata(DecoratorKeys.ModelOptions, Dummy)).to.deep.equal({ test: 'hello' });
  });

  it('should just run with an non existing value in "mergeMetadata"', () => {
    class Dummy { }
    assignMetadata(DecoratorKeys.ModelOptions, { schemaOptions: { _id: false } }, Dummy);
    expect(mergeMetadata(DecoratorKeys.ModelOptions, undefined, Dummy))
      .to.deep.equal({ schemaOptions: { _id: false } });
  });
  it('should not modify current metadata object in "mergeMetadata"', () => {
    class Dummy { }
    const someData = { property: 'value' };
    Reflect.defineMetadata(DecoratorKeys.ModelOptions, someData, Dummy);
    mergeMetadata(DecoratorKeys.ModelOptions, { schemaOptions: { _id: false } }, Dummy);
    expect(someData).to.deep.equal({ property: 'value' });
  });

  it('should just run with an non existing value in "mergeSchemaOptions"', () => {
    class Dummy { }
    assignMetadata(DecoratorKeys.ModelOptions, { schemaOptions: { _id: false } }, Dummy);
    expect(mergeSchemaOptions(undefined, Dummy)).to.deep.equal({ _id: false });
  });

  it('merge options with assignMetadata', () => {
    @modelOptions({ schemaOptions: { timestamps: true, _id: false } })
    class TestAssignMetadata { }

    const model = getModelForClass(TestAssignMetadata, {
      schemaOptions: {
        _id: true,
        // @ts-ignore because it is only there for tests and dosnt exists on type "SchemaOptions" (from mongoose)
        testOption: 'hello'
      }
    });

    expect(model.schema.options).to.have.property('testOption', 'hello');
    expect(model.schema.options).to.have.property('timestamps', true);
    expect(model.schema.options).to.have.property('_id', true);
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

    expect(doc).to.not.be.an('undefined');
    expect(doc.someprop).to.have.property('hi', 10);
    expect(doc.someprop).to.not.have.property('_id');
  });

  // it('should run with a self-containing-class [hasezoey#42]', () => {
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
      assert.fail('Expected to throw an "ValidationError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(mongoose.Error.ValidationError);
    }
  });

  it('should use type "Buffer" [typegoose#88]', async () => {
    class TestBuffer {
      @prop({ required: true })
      public propy!: Buffer;
    }

    const model = getModelForClass(TestBuffer);

    expect(model.schema.path('propy')).to.be.an.instanceOf(mongoose.Schema.Types.Buffer);

    const { _id: id } = await model.create({ propy: Buffer.from('Hello') } as TestBuffer);

    const found = await model.findById(id).exec();
    expect(found).to.not.be.an('undefined');
    expect(found.propy).to.be.an.instanceOf(Buffer);
    expect(found.propy.toString()).to.be.equal('Hello');
  });

  it('should use "type" as a last resort', async () => {
    class TestPropOptionType {
      @prop({ type: mongoose.Schema.Types.Number })
      public propy: string;
    }

    const model = getModelForClass(TestPropOptionType);

    expect(model.schema.path('propy')).to.be.an.instanceOf(mongoose.Schema.Types.Number);

    const doc = new model({ propy: 100 });

    expect(doc).to.not.be.an('undefined');
    expect(doc.propy).to.be.equal(100);
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

    expect(doc).to.not.equal(undefined);
    const path = doc.schema.path('num');
    expect(path).to.not.equal(undefined);
    expect(path).to.not.be.an.instanceOf(mongoose.Schema.Types.Mixed);
    expect(path).to.be.an.instanceOf(CustomInt);
  });

  it('should not have the same options (modelOptions deep copy) [typegoose/typegoose#100]', () => {
    @modelOptions({ schemaOptions: { collection: '1' } })
    class SOBase { }

    @modelOptions({ schemaOptions: { collection: '2' } })
    class SOInheritedBase extends SOBase { }

    const refSOBase: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, SOBase);
    const refSOInheritedBase: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, SOInheritedBase);

    expect(refSOBase.schemaOptions.collection).to.not.equal(refSOInheritedBase.schemaOptions.collection);
    expect(refSOBase).to.not.deep.equal(refSOInheritedBase);
  });

  it('should return the correct model "getModelWithString"', () => {
    class GetModelWithStringClass {
      @prop()
      public hi: string;
    }

    const model = getModelForClass(GetModelWithStringClass);
    const gotModel = getModelWithString<typeof GetModelWithStringClass>(model.modelName);

    expect(model).to.not.be.equal(undefined);
    expect(gotModel).to.not.be.equal(undefined);
    expect(gotModel).to.deep.equal(model);
  });

  it('should return undefined if model does not exists (getModelWithString)', () => {
    const type = getModelWithString('someTestyString');

    expect(type).to.equal(undefined);
  });

  it('should merge existingConnection correctly (overwrite)', () => {
    // @ts-ignore ignore that "existingConnection" is not of type connection
    @modelOptions({ existingConnection: { hello: 1 } })
    class Dummy { }

    const out = mergeMetadata(DecoratorKeys.ModelOptions, { existingConnection: { hi: 1 } }, Dummy);

    expect(out).to.deep.equal(Object.assign({}, omit(globalOptions, 'globalOptions'), { existingConnection: { hi: 1 } }));
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

    expect(doc).to.not.equal(undefined);
    expect(doc.key).to.not.equal(undefined);
    expect(doc.key).to.not.have.property('_id');
  });
}
