import mongoose from 'mongoose';
import { prop } from '../../src/prop';
import { buildSchema, getName, PropType, Ref } from '../../src/typegoose';
import { logger } from '../../src/logSettings';

describe('utils: mapOptions', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should add options to ref [szokodiakos#379]', () => {
    class Child {}

    class TestRef {
      @prop({ ref: Child, customoption: 'custom' })
      public someprop: Ref<Child>;
    }

    const schema = buildSchema(TestRef);
    const someprop = schema.path('someprop');
    const opt: mongoose.SchemaTypeOptions<any> = someprop.options;

    expect(typeof opt.type).toEqual('function');
    expect(opt.ref).toEqual('Child');
    expect(opt).toHaveProperty('customoption', 'custom');
  });

  it('should add options to refPath [szokodiakos#379]', () => {
    class Child {}

    class TestRefPath {
      @prop({ default: 'Child' })
      public something: string;

      @prop({ refPath: 'something', customoption: 'custom' })
      public someprop: Ref<Child>;
    }

    const schema = buildSchema(TestRefPath);
    const someprop = schema.path('someprop');
    const opt: mongoose.SchemaTypeOptions<any> = someprop.options;

    expect(typeof opt.type).toEqual('function');
    expect(opt.refPath).toEqual('something');
    expect(opt).toHaveProperty('customoption', 'custom');
  });

  it('should add options to array-ref [szokodiakos#379]', () => {
    class TestArrayRefNested {}

    class TestArrayRef {
      @prop({ ref: () => TestArrayRefNested, customoption1: 'custom1', innerOptions: { customoption2: 'custom2' } })
      public someprop: Ref<TestArrayRefNested>[];
    }

    const schema = buildSchema(TestArrayRef);
    const someprop = schema.path('someprop');
    const preopts: mongoose.SchemaTypeOptions<any> = someprop.options;

    expect(preopts).toHaveProperty('customoption1', 'custom1');
    const opt: mongoose.SchemaTypeOptions<any> = preopts.type![0];
    expect(typeof opt.type).toEqual('function');
    expect(opt.ref).toEqual(getName(TestArrayRefNested));
    expect(opt).toHaveProperty('customoption2', 'custom2');
  });

  it('should add options to array-refPath [szokodiakos#379]', () => {
    class EmptyClass {}

    class TestArrayRefPath {
      @prop({ default: getName(EmptyClass) })
      public something: string;

      @prop({ refPath: 'something', customoption1: 'custom1', innerOptions: { customoption2: 'custom2' } })
      public someprop: Ref<EmptyClass>[];
    }

    const schema = buildSchema(TestArrayRefPath);
    const someprop = schema.path('someprop');
    expect(someprop).toBeInstanceOf(mongoose.Schema.Types.Array);
    const preopts: mongoose.SchemaTypeOptions<any> = someprop.options;
    expect(preopts).toHaveProperty('customoption1', 'custom1');
    const opt: mongoose.SchemaTypeOptions<any> = preopts.type![0];
    expect(typeof opt.type).toEqual('function');
    expect(opt.refPath).toEqual('something');
    expect(opt).toHaveProperty('customoption2', 'custom2');
  });

  it('should set innerOptions correctly', () => {
    class InnerOptions {
      @prop({ type: String, innerOptions: { hello: true } })
      public someArray: string[];
    }

    const schema = buildSchema(InnerOptions);
    const path: any = schema.path('someArray');

    expect(path).toBeInstanceOf(mongoose.Schema.Types.Array);
    expect(path.embeddedSchemaType).toBeInstanceOf(mongoose.Schema.Types.String);
    expect(path.embeddedSchemaType.options).toHaveProperty('hello', true);
    expect(path.options).not.toHaveProperty('hello', true);
  });

  it('should set outerOptions correctly', () => {
    class OuterOptions {
      @prop({ type: String, outerOptions: { hello: true } })
      public someArray: string[];
    }

    const schema = buildSchema(OuterOptions);
    const path: any = schema.path('someArray');

    expect(path).toBeInstanceOf(mongoose.Schema.Types.Array);
    expect(path.embeddedSchemaType).toBeInstanceOf(mongoose.Schema.Types.String);
    expect(path.embeddedSchemaType.options).not.toHaveProperty('hello', true);
    expect(path.options).toHaveProperty('hello', true);
  });

  describe('PropType.MAP', () => {
    it('should support mapping MIXED options on Maps', () => {
      const spyWarn = jest.spyOn(logger, 'warn').mockImplementation(() => void 0);

      class TestMixedOnMaps {
        @prop({ type: mongoose.Schema.Types.Mixed, validate: () => true, sparse: true }, PropType.MAP)
        public test?: unknown;
      }

      const schema = buildSchema(TestMixedOnMaps);
      const testPath = schema.path('test');
      expect(testPath).toBeInstanceOf(mongoose.Schema.Types.Map);
      expect(testPath.options).toHaveProperty('validate');
      expect(testPath.options['sparse']).toBeUndefined();

      expect(testPath['$__schemaType']).toBeInstanceOf(mongoose.Schema.Types.Mixed);
      expect(testPath['$__schemaType'].options).toHaveProperty('sparse', true);

      expect(spyWarn).toHaveBeenCalledTimes(1);
      expect(spyWarn.mock.calls).toMatchSnapshot();
    });

    it('should support mapping custom options on MIXED with Maps', () => {
      const spyWarn = jest.spyOn(logger, 'warn').mockImplementation(() => void 0);

      class TestMixedMapsCustomOptions {
        @prop({ type: mongoose.Schema.Types.Mixed, outerOptions: { testOuter: true }, innerOptions: { testInner: true } }, PropType.MAP)
        public test?: unknown;
      }

      const schema = buildSchema(TestMixedMapsCustomOptions);
      const testPath = schema.path('test');
      expect(testPath).toBeInstanceOf(mongoose.Schema.Types.Map);
      expect(testPath.options).toHaveProperty('validate');
      expect(testPath.options).toHaveProperty('testOuter', true);
      expect(testPath.options).not.toHaveProperty('testInner');

      expect(testPath['$__schemaType']).toBeInstanceOf(mongoose.Schema.Types.Mixed);
      expect(testPath['$__schemaType'].options).toHaveProperty('testInner', true);
      expect(testPath['$__schemaType'].options).not.toHaveProperty('testOuter');

      expect(spyWarn).toHaveBeenCalledTimes(1);
      expect(spyWarn.mock.calls).toMatchSnapshot();
    });

    it('should support manually overwriting inner `type` in Maps', () => {
      const spyWarn = jest.spyOn(logger, 'warn').mockImplementation(() => void 0);

      class TestMapsWithManualTypeOverwrite {
        @prop({ type: mongoose.Schema.Types.Mixed, innerOptions: { type: String } }, PropType.MAP)
        public test?: unknown;
      }

      const schema = buildSchema(TestMapsWithManualTypeOverwrite);
      const testPath = schema.path('test');
      expect(testPath).toBeInstanceOf(mongoose.Schema.Types.Map);
      expect(testPath.options).toHaveProperty('validate');

      expect(testPath['$__schemaType']).toBeInstanceOf(mongoose.Schema.Types.String);

      expect(spyWarn).toHaveBeenCalledTimes(1);
      expect(spyWarn.mock.calls).toMatchSnapshot();
    });

    it('should map options to the outer Type first, if possible', () => {
      function mapDefault() {
        return new Map();
      }

      class TestMapMapping {
        @prop({ type: String, default: mapDefault, required: true })
        public test!: Map<string, string>;
      }

      const schema = buildSchema(TestMapMapping);
      const testPath = schema.path('test');

      expect(testPath).toBeInstanceOf(mongoose.Schema.Types.Map);
      expect(testPath.options).toHaveProperty('required', true);
      expect(testPath.options).toHaveProperty('default', mapDefault);

      const innerType = testPath['$__schemaType'];

      expect(innerType).toBeInstanceOf(mongoose.Schema.Types.String);
      expect(innerType.options).toHaveProperty('required', undefined);
      expect(innerType.options).toHaveProperty('default', undefined);
    });

    it('should map options to the outer Type first, if possible; special case: ref', () => {
      class Child {
        @prop({})
        public dummy?: string;
      }

      class TestMapMapping {
        @prop({ ref: () => Child })
        public test!: Map<string, Ref<Child>>;
      }

      const childModelName = getName(Child);
      const schema = buildSchema(TestMapMapping);
      const testPath = schema.path('test');

      // mongoose does the mapping from the outer "ref" to the inner "ref"
      expect(testPath).toBeInstanceOf(mongoose.Schema.Types.Map);
      expect(testPath.options).toHaveProperty('ref', undefined);

      const innerType = testPath['$__schemaType'];

      expect(innerType).toBeInstanceOf(mongoose.Schema.Types.ObjectId);
      expect(innerType.options).toHaveProperty('ref', childModelName);
    });
  });

  describe('PropType.ARRAY', () => {
    it('should map options to the outer Type first, if possible', () => {
      function arrayDefault() {
        return [];
      }

      class TestArrayMapping {
        @prop({ default: arrayDefault, required: true, type: String })
        public test!: string[];
      }

      const schema = buildSchema(TestArrayMapping);
      const testPath = schema.path('test');

      expect(testPath).toBeInstanceOf(mongoose.Schema.Types.Array);
      expect(testPath.options).toHaveProperty('required', true);
      expect(testPath.options).toHaveProperty('default', arrayDefault);

      const innerType = testPath['embeddedSchemaType'];

      expect(innerType).toBeInstanceOf(mongoose.Schema.Types.String);
      expect(innerType.options).toHaveProperty('required', undefined);
      expect(innerType.options).toHaveProperty('default', undefined);
    });

    it('should map options to the outer Type first, if possible; special case: ref', () => {
      class Child {
        @prop({})
        public dummy?: string;
      }

      class TestArrayMapping {
        @prop({ ref: () => Child })
        public test!: Ref<Child>[];
      }

      const childModelName = getName(Child);
      const schema = buildSchema(TestArrayMapping);
      const testPath = schema.path('test');

      // mongoose does the mapping from the outer "ref" to the inner "ref"
      expect(testPath).toBeInstanceOf(mongoose.Schema.Types.Array);
      expect(testPath.options).toHaveProperty('ref', undefined);

      const innerType = testPath['embeddedSchemaType'];

      expect(innerType).toBeInstanceOf(mongoose.Schema.Types.ObjectId);
      expect(innerType.options).toHaveProperty('ref', childModelName);
    });
  });
});
