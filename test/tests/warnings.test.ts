import * as utils from '../../src/internal/utils';
import { logger } from '../../src/logSettings';
import { buildSchema, mongoose, prop, Ref, setGlobalOptions, Severity } from '../../src/typegoose';

// Note: TDEP0003 is expected in here

const origWarn = logger.warn;
const origDeprecate = utils.deprecate;

beforeEach(() => {
  logger.warn = jest.fn();
  (utils as any).deprecate = jest.fn((v) => v);
});

afterAll(() => {
  // somehow test files are not isolated
  expect.assertions(1);
  (logger as any).warn = origWarn;
  (utils as any).deprecate = origDeprecate;
});

describe('prop.ts', () => {
  beforeEach(() => {
    expect.assertions(2);
  });

  describe('@prop', () => {
    beforeAll(() => {
      // to not have the warnings of "mixed"
      setGlobalOptions({ options: { allowMixed: Severity.ALLOW } });
    });

    it('should warn if option "items" is used in an @prop without array', () => {
      class TestItemsOnPropWithoutArray {
        @prop({ items: String })
        public test: any;
      }
      buildSchema(TestItemsOnPropWithoutArray);
      expect((logger.warn as any).mock.calls.length).toEqual(1);
      expect((utils.deprecate as any).mock.calls.length).toEqual(1);
    });

    it('should warn if option "of" is used in an @prop without map', () => {
      class TestOfOnPropWithoutMap {
        @prop({ of: String })
        public test: any;
      }
      buildSchema(TestOfOnPropWithoutMap);
      expect((logger.warn as any).mock.calls.length).toEqual(1);
      expect((utils.deprecate as any).mock.calls.length).toEqual(1);
    });

    it('should warn if option "refType" is used in an @prop', () => {
      expect.assertions(1);
      class SomeNest {
        @prop()
        public something?: string;
      }
      class TestRefType {
        @prop({ ref: () => SomeNest, refType: mongoose.Schema.Types.ObjectId })
        public test: Ref<SomeNest>;
      }
      buildSchema(TestRefType);
      expect((utils.deprecate as any).mock.calls.length).toEqual(1);
    });
  });

  describe('WhatIsIt.MAP', () => {
    it('should warn if option "items" is used in an WhatIsIt.MAP', () => {
      expect.assertions(3);
      class TestMapPropOptionItems {
        @prop({ items: String })
        public test: Map<any, any>;
      }
      const schema = buildSchema(TestMapPropOptionItems);
      expect((logger.warn as any).mock.calls.length).toEqual(1);
      expect((utils.deprecate as any).mock.calls.length).toEqual(1);
      expect(schema.path('test')).toBeInstanceOf(mongoose.Schema.Types.Map);
    });
  });

  describe('WhatIsIt.ARRAY', () => {
    it('should warn if option "of" is used in an WhatIsIt.ARRAY', () => {
      expect.assertions(3);
      class TestArrayPropOptionOf {
        @prop({ of: String })
        public test: any[];
      }
      const schema = buildSchema(TestArrayPropOptionOf);
      expect((logger.warn as any).mock.calls.length).toEqual(1);
      expect((utils.deprecate as any).mock.calls.length).toEqual(1);
      expect(schema.path('test')).toBeInstanceOf(mongoose.Schema.Types.Array);
    });
  });
});

describe('Options not for current Type', () => {
  beforeEach(() => {
    expect.assertions(1);
  });

  it('should warn if type is not string and a string-transform is supplied', () => {
    class TestNSTETransform {
      @prop({ lowercase: true })
      public test: number;
    }
    buildSchema(TestNSTETransform);
    expect((logger.warn as any).mock.calls.length).toEqual(1);
  });

  it('should warn if type is not string and a string-validate is supplied', () => {
    class TestNSTEValidate {
      @prop({ maxlength: 10 })
      public test: number;
    }
    buildSchema(TestNSTEValidate);
    expect((logger.warn as any).mock.calls.length).toEqual(1);
  });

  it('should error if type is not number and a number-validate is supplied', () => {
    class TestNNTEValidate {
      @prop({ max: 10 })
      public test: string;
    }
    buildSchema(TestNNTEValidate);
    expect((logger.warn as any).mock.calls.length).toEqual(1);
  });
});
