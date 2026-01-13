import { AlreadyMerged, DecoratorKeys } from '../../src/internal/constants';
import { globalOptions } from '../../src/internal/data';
import { assertion, getMergedModelOptions } from '../../src/internal/utils';
import { buildSchema, modelOptions, mongoose, prop, setGlobalOptions, Severity } from '../../src/typegoose';
import type { IModelOptions } from '../../src/types';

describe('globalOptions', () => {
  const originalOptions = { ...globalOptions };
  beforeEach(() => {
    // "setGlobalOptions" only sets the properties that are provided, instead of wholly overwriting the object
    // and "globalOptions" cannot be assigned to directly (`globalOptions = originalOptions`).
    for (const key of Object.keys(globalOptions)) {
      delete globalOptions[key];
    }
    setGlobalOptions(originalOptions);
  });

  it('should set the global Options right', () => {
    setGlobalOptions({ options: { allowMixed: Severity.ERROR } });

    expect(globalOptions).toHaveProperty('options');
    expect(globalOptions.options).toHaveProperty('allowMixed', Severity.ERROR);
  });

  it('should have global options, without using @modelOptions', () => {
    class TestGlobalOptions {
      @prop()
      public hello: string;
    }

    buildSchema(TestGlobalOptions);

    const options = getMergedModelOptions({}, TestGlobalOptions);

    expect(typeof options).not.toBeUndefined();
    expect(options.options!.allowMixed).toEqual(Severity.WARN);
  });

  it('should allow setting schema-options', () => {
    setGlobalOptions({ schemaOptions: { timestamps: true } });

    class TestGlobalOptions {
      @prop()
      public hello: string;
    }

    {
      const options: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, TestGlobalOptions);

      expect(typeof options).toStrictEqual('undefined');
    }

    const schema = buildSchema(TestGlobalOptions);

    expect((schema as any).options).toHaveProperty('timestamps', true);

    {
      const options: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, TestGlobalOptions);

      expect(typeof options).toStrictEqual('undefined');
    }

    const options = getMergedModelOptions({}, TestGlobalOptions);

    expect(typeof options).toStrictEqual('object');
    expect(options.schemaOptions!.timestamps).toEqual(true);
  });

  it('should not apply global options if given options are already merged', () => {
    class TestGlobalOptions {
      @prop()
      public hello: string;
    }

    const inputOptions = { schemaOptions: { _id: false }, [AlreadyMerged]: true };
    const options = getMergedModelOptions(inputOptions, TestGlobalOptions);
    expect(options).toStrictEqual({ schemaOptions: { _id: false }, [AlreadyMerged]: true });
  });

  it('should not overwrite passed options', () => {
    class TestGlobalOptions {
      @prop()
      public hello: string;
    }

    const options = getMergedModelOptions({ options: { allowMixed: Severity.ALLOW } }, TestGlobalOptions);
    expect(options).toStrictEqual({ options: { allowMixed: Severity.ALLOW }, [AlreadyMerged]: true });
  });

  it('should apply global options at buildschema time (#939)', () => {
    @modelOptions({ options: { disableCaching: true } })
    class TestLaterOptions {
      @prop()
      public hello?: string;
    }

    setGlobalOptions({ options: { allowMixed: Severity.ERROR } });

    const options = getMergedModelOptions({}, TestLaterOptions);

    expect(options).toStrictEqual({
      options: {
        disableCaching: true,
        allowMixed: Severity.ERROR,
      },
      [AlreadyMerged]: true,
    });
  });

  it('should allow setting "allowMixed" as global option [typegoose/typegoose#1024]', () => {
    class TestGlobalAllowMixed {
      @prop({ type: () => mongoose.Schema.Types.Mixed })
      public someMixed?: any;
    }

    setGlobalOptions({ options: { allowMixed: Severity.ERROR } });

    try {
      buildSchema(TestGlobalAllowMixed);
      fail('Expected getModelForClass to fail');
    } catch (err) {
      expect(err).toBeInstanceOf(TypeError);
      assertion(err instanceof TypeError); // typescript check
      expect(err.message).toMatchSnapshot();
    }
  });
});
