import { logger } from '../../src/logSettings';
import { arrayProp, buildSchema, mapProp, prop, setGlobalOptions, Severity } from '../../src/typegoose';

beforeEach(() => {
  logger.warn = jest.fn();
  expect.assertions(1);
});

describe('prop.ts', () => {
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
    });

    it('should warn if option "of" is used in an @prop without map', () => {
      class TestOfOnPropWithoutMap {
        @prop({ of: String })
        public test: any;
      }
      buildSchema(TestOfOnPropWithoutMap);
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
});
