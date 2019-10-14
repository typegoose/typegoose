import { assert, expect } from 'chai';
import * as mongoose from 'mongoose';
import { DecoratorKeys } from '../../src/internal/constants';
import { assignMetadata, mergeMetadata, mergeSchemaOptions } from '../../src/internal/utils';
import {
  addModelToTypegoose,
  arrayProp,
  buildSchema,
  DocumentType,
  getModelForClass,
  mapProp,
  modelOptions,
  prop
} from '../../src/typegoose';
import { DisAbove, DisAboveModel, DisMain, DisMainModel } from '../models/discriminators';

// Note: this file is meant for github issue verification & test adding for these
// -> and when not an outsourced class(/model) is needed

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 * @example
 * ```
 * import { suite as ShouldRunTests } from './shouldRun.test'
 * ...
 * describe('Should just Run', ShouldRunTests.bind(this));
 * ...
 * ```
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

  it('should make use of discriminators', async () => {
    const disMainDoc = await DisMainModel.create({ main1: 'hello DMM' } as DisMain);
    const disAboveDoc = await DisAboveModel.create({ main1: 'hello DAM', above1: 'hello DAM' } as DisAbove);
    expect(disMainDoc).to.not.be.an('undefined');
    expect(disMainDoc.main1).to.equals('hello DMM');
    expect(disMainDoc).to.not.have.property('above1');
    expect(disMainDoc.__t).to.be.an('undefined');

    expect(disAboveDoc).to.not.be.an('undefined');
    expect(disAboveDoc.main1).to.equals('hello DAM');
    expect(disAboveDoc.above1).to.equals('hello DAM');
    expect(disAboveDoc.__t).to.equals('DisAbove');
  });

  it('should make use of addModelToTypegoose', async () => {
    // addModelToTypegoose
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

  it('should make array of enum [szokodiakos#380]', async () => {
    enum TestEnum {
      HELLO1 = 'Hello 1',
      HELLO2 = 'Hello 2'
    }
    class TestEnumArray {
      @arrayProp({ items: String, enum: TestEnum })
      public somevalue: TestEnum[];
    }

    const model = getModelForClass(TestEnumArray);
    const { _id: id } = await model.create({ somevalue: [TestEnum.HELLO1, TestEnum.HELLO2] } as TestEnumArray);
    const found = await model.findById(id).exec();

    expect(found).to.not.be.an('undefined');
    expect(found.somevalue).to.deep.equal(['Hello 1', 'Hello 2']);
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
}
