import { logger } from '../../src/logSettings';
import { arrayProp, buildSchema, mapProp } from '../../src/typegoose';

beforeEach(() => {
  logger.warn = jest.fn();
  expect.assertions(1);
});

describe('prop.ts', () => {
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
