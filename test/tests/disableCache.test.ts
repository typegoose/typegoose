import * as mongoose from 'mongoose';
import { constructors, globalOptions, models } from '../../src/internal/data';
import { prop } from '../../src/prop';
import { buildSchema, getDiscriminatorModelForClass, getModelForClass, getName, modelOptions } from '../../src/typegoose';
import { AnyParamConstructor } from '../../src/types';

beforeEach(() => {
  jest.restoreAllMocks();
});

describe('global', () => {
  beforeAll(() => {
    globalOptions['globalOptions'] = globalOptions['globalOptions'] ?? {};
    globalOptions['globalOptions'].disableGlobalCaching = true;
  });

  afterAll(() => {
    delete globalOptions['globalOptions']!.disableGlobalCaching;

    mongoose.deleteModel(/.*/); // typegoose does not cache the model, but mongoose still does per connection / mongoose instance
  });

  it('"buildSchema" should not add to cache if cache is disabled"', () => {
    class CacheDisabledBuildSchema {
      @prop()
      public dummy?: string;
    }

    buildSchema(CacheDisabledBuildSchema);

    expect(constructors.get(getName(CacheDisabledBuildSchema))).toBeUndefined();
  });

  it('"getModelForClass" (&"addModelToTypegoose") should not add to cache if cache is disabled"', () => {
    class CacheDisabledAddModelToTypegoose {
      @prop()
      public dummy?: string;
    }

    getModelForClass(CacheDisabledAddModelToTypegoose);

    expect(constructors.get(getName(CacheDisabledAddModelToTypegoose))).toBeUndefined();
    expect(models.get(getName(CacheDisabledAddModelToTypegoose))).toBeUndefined();
  });

  it('"getModelForClass" should not try to use cache', () => {
    // separate definitions of classes by scope
    let def1: mongoose.Model<any>;
    let def2: mongoose.Model<any>;
    {
      class CacheDisabledGetModelForClass {
        @prop()
        public dummy1?: string;
      }

      def1 = getModelForClass(CacheDisabledGetModelForClass);
    }
    {
      class CacheDisabledGetModelForClass {
        @prop()
        public dummy2?: string;
      }

      def2 = getModelForClass(CacheDisabledGetModelForClass, { existingConnection: mongoose.createConnection() });
    }

    expect(def1).not.toStrictEqual(def2);

    expect(def1.schema.path('dummy1')).toBeTruthy();
    expect(def1.schema.path('dummy2')).toBeFalsy();

    expect(def2.schema.path('dummy1')).toBeFalsy();
    expect(def2.schema.path('dummy2')).toBeTruthy();
  });

  it('"getDiscriminatorForClass" should not try to use cache', () => {
    // separate definitions of classes by scope
    let def1Base: mongoose.Model<any>;
    let def1Dis: mongoose.Model<any>;
    let def2Base: mongoose.Model<any>;
    let def2Dis: mongoose.Model<any>;

    {
      class CacheDisabledBase {
        @prop()
        public baseDummy1?: string;
      }

      class CacheDisabledDis extends CacheDisabledBase {
        @prop()
        public dis1?: string;
      }

      const BaseModel = getModelForClass(CacheDisabledBase);
      const DisModel = getDiscriminatorModelForClass(BaseModel, CacheDisabledDis);
      def1Base = BaseModel;
      def1Dis = DisModel;
    }

    {
      @modelOptions({ existingConnection: mongoose.createConnection() })
      class CacheDisabledBase {
        @prop()
        public baseDummy2?: string;
      }

      class CacheDisabledDis extends CacheDisabledBase {
        @prop()
        public dis2?: string;
      }

      const BaseModel = getModelForClass(CacheDisabledBase);
      const DisModel = getDiscriminatorModelForClass(BaseModel, CacheDisabledDis);
      def2Base = BaseModel;
      def2Dis = DisModel;
    }

    expect(def1Base).not.toStrictEqual(def2Base);
    expect(def1Dis).not.toStrictEqual(def2Dis);

    expect(def1Base.schema.path('baseDummy1')).toBeTruthy();
    expect(def1Base.schema.path('baseDummy2')).toBeFalsy();
    expect(def1Dis.schema.path('dis1')).toBeTruthy();
    expect(def1Dis.schema.path('dis2')).toBeFalsy();

    expect(def2Base.schema.path('baseDummy1')).toBeFalsy();
    expect(def2Base.schema.path('baseDummy2')).toBeTruthy();
    expect(def2Dis.schema.path('dis1')).toBeFalsy();
    expect(def2Dis.schema.path('dis2')).toBeTruthy();
  });
});

describe('local', () => {
  afterAll(() => {
    mongoose.deleteModel(/.*/); // typegoose does not cache the model, but mongoose still does per connection / mongoose instance
  });

  it('"buildSchema" should not add to cache if cache is disabled"', () => {
    // test via modelOptions
    {
      @modelOptions({ options: { disableCaching: true } })
      class CacheDisabledBuildSchema {
        @prop()
        public dummy?: string;
      }

      buildSchema(CacheDisabledBuildSchema);

      expect(constructors.get(getName(CacheDisabledBuildSchema))).toBeUndefined();
    }
    // test via parameter
    {
      class CacheDisabledBuildSchema {
        @prop()
        public dummy?: string;
      }

      buildSchema(CacheDisabledBuildSchema, { options: { disableCaching: true } });

      expect(constructors.get(getName(CacheDisabledBuildSchema))).toBeUndefined();
    }
  });

  it('"getModelForClass" (&"addModelToTypegoose") should not add to cache if cache is disabled"', () => {
    class CacheDisabledAddModelToTypegoose {
      @prop()
      public dummy?: string;
    }

    getModelForClass(CacheDisabledAddModelToTypegoose, { options: { disableCaching: true } });

    expect(constructors.get(getName(CacheDisabledAddModelToTypegoose))).toBeUndefined();
    expect(models.get(getName(CacheDisabledAddModelToTypegoose))).toBeUndefined();
  });

  it('"getModelForClass" should not try to use cache when locally disabled', () => {
    // separate definitions of classes by scope
    let def1: mongoose.Model<any>;
    let def2: mongoose.Model<any>;
    {
      class CacheDisabledGetModelForClass {
        @prop()
        public dummy1?: string;
      }

      def1 = getModelForClass(CacheDisabledGetModelForClass, { options: { disableCaching: true } });
    }
    {
      class CacheDisabledGetModelForClass {
        @prop()
        public dummy2?: string;
      }

      def2 = getModelForClass(CacheDisabledGetModelForClass, {
        existingConnection: mongoose.createConnection(),
        options: { disableCaching: true },
      });
    }

    expect(def1).not.toStrictEqual(def2);

    expect(def1.schema.path('dummy1')).toBeTruthy();
    expect(def1.schema.path('dummy2')).toBeFalsy();

    expect(def2.schema.path('dummy1')).toBeFalsy();
    expect(def2.schema.path('dummy2')).toBeTruthy();
  });

  it('"getDiscriminatorForClass" should not try to use cache', () => {
    // separate definitions of classes by scope
    let def1Base: mongoose.Model<any>;
    let def1Dis: mongoose.Model<any>;
    let def2Base: mongoose.Model<any>;
    let def2Dis: mongoose.Model<any>;

    {
      class CacheDisabledBase {
        @prop()
        public baseDummy1?: string;
      }

      class CacheDisabledDis extends CacheDisabledBase {
        @prop()
        public dis1?: string;
      }

      const BaseModel = getModelForClass(CacheDisabledBase, { options: { disableCaching: true } });
      const DisModel = getDiscriminatorModelForClass(BaseModel, CacheDisabledDis, { options: { disableCaching: true } });
      def1Base = BaseModel;
      def1Dis = DisModel;
    }

    {
      @modelOptions({ existingConnection: mongoose.createConnection() })
      class CacheDisabledBase {
        @prop()
        public baseDummy2?: string;
      }

      class CacheDisabledDis extends CacheDisabledBase {
        @prop()
        public dis2?: string;
      }

      const BaseModel = getModelForClass(CacheDisabledBase, { options: { disableCaching: true } });
      const DisModel = getDiscriminatorModelForClass(BaseModel, CacheDisabledDis, { options: { disableCaching: true } });
      def2Base = BaseModel;
      def2Dis = DisModel;
    }

    expect(def1Base).not.toStrictEqual(def2Base);
    expect(def1Dis).not.toStrictEqual(def2Dis);

    expect(def1Base.schema.path('baseDummy1')).toBeTruthy();
    expect(def1Base.schema.path('baseDummy2')).toBeFalsy();
    expect(def1Dis.schema.path('dis1')).toBeTruthy();
    expect(def1Dis.schema.path('dis2')).toBeFalsy();

    expect(def2Base.schema.path('baseDummy1')).toBeFalsy();
    expect(def2Base.schema.path('baseDummy2')).toBeTruthy();
    expect(def2Dis.schema.path('dis1')).toBeFalsy();
    expect(def2Dis.schema.path('dis2')).toBeTruthy();
  });

  it('"getModelForClass" should allow running when cache is disabled locally, but still allow setting if not', () => {
    // separate definitions of classes by scope
    let def1: mongoose.Model<any>;
    let def2: mongoose.Model<any>;
    let class1: AnyParamConstructor<any>;
    let class2: AnyParamConstructor<any>;
    {
      class CacheDisabledGetModelForClassLocal {
        @prop()
        public dummy1?: string;
      }

      def1 = getModelForClass(CacheDisabledGetModelForClassLocal, { options: { disableCaching: true } });
      class1 = CacheDisabledGetModelForClassLocal;
    }
    expect(constructors.get(getName(class1))).toBeUndefined();
    expect(models.get(getName(class1))).toBeUndefined();
    {
      class CacheDisabledGetModelForClassLocal {
        @prop()
        public dummy2?: string;
      }

      def2 = getModelForClass(CacheDisabledGetModelForClassLocal, {
        existingConnection: mongoose.createConnection(),
      });
      class2 = CacheDisabledGetModelForClassLocal;
    }
    expect(constructors.get(getName(class2))).toBeTruthy();
    expect(models.get(getName(class2))).toBeTruthy();

    // the following should actually return the model of "class2", because of how caching works
    const def3 = getModelForClass(class1);

    expect(def1).not.toStrictEqual(def2);

    expect(def1.schema.path('dummy1')).toBeTruthy();
    expect(def1.schema.path('dummy2')).toBeFalsy();

    expect(def2.schema.path('dummy1')).toBeFalsy();
    expect(def2.schema.path('dummy2')).toBeTruthy();

    expect(def3).toStrictEqual(def2);

    expect(def3.schema.path('dummy1')).toBeFalsy();
    expect(def3.schema.path('dummy2')).toBeTruthy();
  });
});
