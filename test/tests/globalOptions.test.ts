import { DecoratorKeys } from '../../src/internal/constants';
import { globalOptions } from '../../src/internal/data';
import { buildSchema, prop, setGlobalOptions, Severity } from '../../src/typegoose';
import type { IModelOptions } from '../../src/types';

describe('globalOptions', () => {
  const originalOptions = { ...globalOptions };
  beforeEach(() => {
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

    const options: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, TestGlobalOptions);

    expect(typeof options).not.toBeUndefined();
    expect(options.options!.allowMixed).toEqual(Severity.WARN);
  });
});
