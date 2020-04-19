import { logger } from '../../src/logSettings';
import { arrayProp, buildSchema, mapProp, prop } from '../../src/typegoose';

beforeEach(() => {
  logger.warn = jest.fn();
  expect.assertions(1);
});

// expect((logger.warn as any).mock.calls.length).toEqual(1);

describe('prop.ts', () => {
  describe('@prop', () => {
    it('should warn if option "items" is used in an @prop', () => {
      class TestPropOptionItems {
        @prop({ items: String })
        public test: any[];
      }
      buildSchema(TestPropOptionItems);
      expect((logger.warn as any).mock.calls.length).toEqual(1);
    });

    it('should warn if option "of" is used in an @prop', () => {
      class TestPropOptionOf {
        @prop({ of: String })
        public test: any[];
      }
      buildSchema(TestPropOptionOf);
      expect((logger.warn as any).mock.calls.length).toEqual(1);
    });
  });

  describe('@mapProp', () => {
    it('should warn if option "items" is used in an @mapProp', () => {
      class TestMapPropOptionItems {
        @mapProp({ items: String, of: String })
        public test: any[];
      }
      buildSchema(TestMapPropOptionItems);
      expect((logger.warn as any).mock.calls.length).toEqual(1);
    });
  });

  describe('@arrayProp', () => {
    it('should warn if option "of" is used in an @arrayProp', () => {
      class TestArrayPropOptionOf {
        @arrayProp({ of: String, items: String })
        public test: any[];
      }
      buildSchema(TestArrayPropOptionOf);
      expect((logger.warn as any).mock.calls.length).toEqual(1);
    });
  });

  describe('prop function', () => {
    it('warnMixed if not in schemas and not primitve', () => {
      class TestPropFunctionWarnMixed {
        @prop()
        public test: any;
      }
      buildSchema(TestPropFunctionWarnMixed);
      expect((logger.warn as any).mock.calls.length).toEqual(1);
    });
  });
});
