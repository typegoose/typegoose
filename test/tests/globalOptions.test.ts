import { expect } from 'chai';

import { globalOptions } from '../../src/internal/data';
import { setGlobalOptions } from '../../src/typegoose';
import { Severity } from '../../src/types';

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
}
