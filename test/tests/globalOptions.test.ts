import { expect } from 'chai';

import { DecoratorKeys } from '../../src/internal/constants';
import { globalOptions } from '../../src/internal/data';
import { buildSchema, prop, setGlobalOptions } from '../../src/typegoose';
import { IModelOptions, Severity } from '../../src/types';

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 */
export function suite() {
  it('should set the global Options right', () => {
    setGlobalOptions({ options: { allowMixed: Severity.WARN } });

    expect(globalOptions).to.have.property('options');
    expect(globalOptions.options).to.have.property('allowMixed', Severity.WARN);
  });

  it('should have global options, without using @modelOptions', () => {
    class TestGlobalOptions {
      @prop()
      public hello: string;
    }

    buildSchema(TestGlobalOptions);

    const options: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, TestGlobalOptions);

    expect(options).to.not.equal(undefined);
    expect(options.options.allowMixed).to.equal(Severity.WARN);
  });
}
