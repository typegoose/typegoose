import { expect } from 'chai';

import { model as Select, SelectStrings } from '../models/select';

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 * @example
 * ```
 * import { suite as SelectTests } from './select.test'
 * ...
 * describe('Select', SelectTests.bind(this));
 * ...
 * ```
 */
export function suite() {
  before(async () => {
    const selecttest = new Select();
    await selecttest.save();
  });

  it('should only return default selected properties', async () => {
    /** variable name long: foundSelectDefault */
    const fSDefault = (await Select.findOne({}).exec()).toObject();

    expect(fSDefault).to.not.have.property('test1');
    expect(fSDefault).to.have.property('test2', SelectStrings.test2);
    expect(fSDefault).to.not.have.property('test3');
  });

  it('should only return specificly selected properties', async () => {
    /** variable name long: foundSelectExtra */
    const fSExtra = (await Select.findOne({}).select(['+test1', '+test3', '-test2']).exec()).toObject();

    expect(fSExtra).to.have.property('test1', SelectStrings.test1);
    expect(fSExtra).to.not.have.property('test2');
    expect(fSExtra).to.have.property('test3', SelectStrings.test3);
  });
}
