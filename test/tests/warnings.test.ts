import { logger } from '../../src/logSettings';
import { buildSchema, mongoose, prop, setGlobalOptions, Severity } from '../../src/typegoose';

// Note: TDEP0003 is expected in here

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

  describe('WhatIsIt.MAP', () => {
    it('should warn if option "items" is used in an WhatIsIt.MAP', () => {
      expect.assertions(2);
      class TestMapPropOptionItems {
        @prop({ items: String, of: String })
        public test: Map<any, any>;
      }
      const schema = buildSchema(TestMapPropOptionItems);
      expect((logger.warn as any).mock.calls.length).toEqual(1);
      expect(schema.path('test')).toBeInstanceOf(mongoose.Schema.Types.Map);
    });
  });

  describe('WhatIsIt.ARRAY', () => {
    it('should warn if option "of" is used in an WhatIsIt.ARRAY', () => {
      expect.assertions(2);
      class TestArrayPropOptionOf {
        @prop({ of: String, items: String })
        public test: any[];
      }
      const schema = buildSchema(TestArrayPropOptionOf);
      expect((logger.warn as any).mock.calls.length).toEqual(1);
      expect(schema.path('test')).toBeInstanceOf(mongoose.Schema.Types.Array);
    });
  });
});
