import { omit } from 'lodash';
import { DecoratorKeys, Severity } from '../../src/internal/constants.js';
import { globalOptions } from '../../src/internal/data.js';
import { getName, mergeMetadata } from '../../src/internal/utils.js';
import { addModelToTypegoose, buildSchema, getModelForClass, modelOptions, mongoose, prop } from '../../src/typegoose.js';
import { IModelOptions } from '../../src/types.js';
import { connect } from '../utils/connect.js';

describe('typegoose-specific-options', () => {
  it('should set Severity right', () => {
    @modelOptions({ options: { allowMixed: Severity.ERROR } })
    class TestSeverityOption {
      @prop()
      public hello: string;

      @prop()
      public error: any;
    }

    try {
      buildSchema(TestSeverityOption);
      fail('Expected to throw TypeError');
    } catch (err) {
      expect(err).toBeInstanceOf(TypeError);
      expect(err.message).toMatchSnapshot();
    }

    const options: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, TestSeverityOption);

    expect(typeof options).not.toBeUndefined();
    expect(options.options!.allowMixed).toEqual(Severity.ERROR);
  });
});

describe('existingMongoose & existingConnection', () => {
  it('should use default-existingMongoose', () => {
    @modelOptions({ existingMongoose: mongoose })
    class TESTexistingMongoose {}
    expect(getModelForClass(TESTexistingMongoose)).not.toBeUndefined();
  });

  it('should use default-existingConnection', () => {
    @modelOptions({ existingConnection: mongoose.connection })
    class TESTexistingConnection {}
    expect(getModelForClass(TESTexistingConnection)).not.toBeUndefined();
  });

  it('should merge existingConnection correctly (overwrite)', () => {
    // @ts-expect-error because "hello" dosnt exist in "existingConnection"
    @modelOptions({ existingConnection: { hello: 1 } })
    class Dummy {}

    const out = mergeMetadata(DecoratorKeys.ModelOptions, { existingConnection: { hi: 1 } }, Dummy);

    expect(out).toEqual(Object.assign({}, omit(globalOptions, 'globalOptions'), { existingConnection: { hi: 1 } }));
  });

  it('should use correct Mongoose', async () => {
    const defaultMongoose = mongoose;
    const newMongoose = new mongoose.Mongoose();
    await connect({ createNewConnection: true, differentMongoose: newMongoose });

    expect(defaultMongoose.connection).not.toEqual(newMongoose.connection);
    expect(defaultMongoose).not.toEqual(newMongoose);

    @modelOptions({ existingMongoose: newMongoose })
    class ExistingMongoose {
      @prop()
      public someprop?: string;
    }

    const ExistingMongooseModel = getModelForClass(ExistingMongoose);

    expect(newMongoose.modelNames()).toEqual([getName(ExistingMongoose)]);
    expect(defaultMongoose.modelNames().includes(getName(ExistingMongoose))).toBe(false);

    expect(ExistingMongooseModel.db.db).toEqual(newMongoose.connection.db);

    await newMongoose.disconnect();
  });

  it('should use add correct connection for assertion', async () => {
    const defaultConnection = mongoose.connection;
    const newConnection = await connect({ createNewConnection: true });

    expect(defaultConnection).not.toEqual(newConnection);

    class AnotherExistingConnection {
      @prop()
      public hello: string;
    }

    const model = newConnection.model.bind(newConnection);
    const compiledModel = model('AnotherExistingConnection', buildSchema(AnotherExistingConnection, {}));
    addModelToTypegoose(compiledModel, AnotherExistingConnection, { existingConnection: newConnection });

    expect(newConnection.modelNames()).toEqual([getName(AnotherExistingConnection)]);
    expect(defaultConnection.modelNames().includes(getName(AnotherExistingConnection))).toBe(false);

    await newConnection.close();
  });

  it('should use add correct mongoose for assertion', async () => {
    const defaultMongoose = mongoose;
    const newMongoose = new mongoose.Mongoose();
    await connect({ createNewConnection: true, differentMongoose: newMongoose });

    expect(defaultMongoose.connection).not.toEqual(newMongoose.connection);
    expect(defaultMongoose).not.toEqual(newMongoose);

    class AnotherExistingMongoose {
      @prop()
      public hello: string;
    }

    const model = newMongoose.model.bind(newMongoose);
    const compiledModel = model('AnotherExistingMongoose', buildSchema(AnotherExistingMongoose, {}));
    addModelToTypegoose(compiledModel, AnotherExistingMongoose, { existingMongoose: newMongoose });

    expect(newMongoose.modelNames()).toEqual([getName(AnotherExistingMongoose)]);
    expect(defaultMongoose.modelNames().includes(getName(AnotherExistingMongoose))).toBe(false);

    await newMongoose.disconnect();
  });

  it('should use correct Connection', async () => {
    const defaultConnection = mongoose.connection;
    const newConnection = await connect({ createNewConnection: true });

    expect(defaultConnection).not.toEqual(newConnection);

    @modelOptions({ existingConnection: newConnection })
    class ExistingConnection {
      @prop()
      public someprop?: string;
    }

    const ExistingMongooseModel = getModelForClass(ExistingConnection);

    expect(newConnection.modelNames()).toEqual([getName(ExistingConnection)]);
    expect(defaultConnection.modelNames().includes(getName(ExistingConnection))).toBe(false);

    expect(ExistingMongooseModel.db.db).toEqual(newConnection.db);

    await newConnection.close();
  });
});

describe('misc', () => {
  it('should not have the same options (modelOptions deep copy) [typegoose/typegoose#100]', () => {
    @modelOptions({ schemaOptions: { collection: '1' } })
    class SOBase {}

    @modelOptions({ schemaOptions: { collection: '2' } })
    class SOInheritedBase extends SOBase {}

    const refSOBase: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, SOBase);
    const refSOInheritedBase: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, SOInheritedBase);

    expect(refSOBase.schemaOptions!.collection).not.toEqual(refSOInheritedBase.schemaOptions!.collection);
    expect(refSOBase).not.toEqual(refSOInheritedBase);
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

    expect(doc).not.toBeUndefined();
    expect(doc.key).not.toBeUndefined();
    expect(doc.key).not.toHaveProperty('_id');
  });
});
