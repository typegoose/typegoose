import * as mongoose from 'mongoose';
import { constructors, globalOptions, models } from '../../src/internal/data';
import { prop } from '../../src/prop';
import { buildSchema, getDiscriminatorModelForClass, getModelForClass, getName, modelOptions } from '../../src/typegoose';

beforeAll(() => {
  globalOptions['globalOptions'] = globalOptions['globalOptions'] ?? {};
  globalOptions['globalOptions'].disableCaching = true;
});

afterAll(() => {
  delete globalOptions['globalOptions']!.disableCaching;
});

beforeEach(() => {
  jest.restoreAllMocks();
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
