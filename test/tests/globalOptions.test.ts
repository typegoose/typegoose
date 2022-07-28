import { DecoratorKeys } from '../../src/internal/constants';
import { globalOptions } from '../../src/internal/data';
import { buildSchema, prop, setGlobalOptions, Severity } from '../../src/typegoose';
import type { IModelOptions } from '../../src/types';

it('should set the global Options right', () => {
  setGlobalOptions({ options: { allowMixed: Severity.WARN } });

  expect(globalOptions).toHaveProperty('options');
  expect(globalOptions.options).toHaveProperty('allowMixed', Severity.WARN);
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
