import { assert, expect } from 'chai';
import * as mongoose from 'mongoose';

import { NumberValidatorEnum, NumberValidatorsModel } from '../models/numberValidators';

// Please try to keep this file in sync with ./arrayValidator.test.ts

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 */
export function suite() {
  it('should respect max', (done) => {
    expect(NumberValidatorsModel.create({
      max: 4 // over 3
    })).to.eventually.rejectedWith(mongoose.Error.ValidationError).and.notify(done);
  });

  it('should respect min', (done) => {
    expect(NumberValidatorsModel.create({
      min: 9 // under 10
    })).to.eventually.rejectedWith(mongoose.Error.ValidationError).and.notify(done);
  });

  it('should respect enum', async () => {
    try {
      await NumberValidatorsModel.create({
        enumed: 5 // number not in the enum
      });

      assert.fail('Expected to throw ValidationError!');
    } catch (err) {
      expect(err).to.be.an.instanceOf(mongoose.Error.ValidationError);
    }

    const doc = await NumberValidatorsModel.create({
      enumed: NumberValidatorEnum.OPT2
    });

    expect(doc).to.not.equal(undefined);
    expect(doc.enumed).to.equal(NumberValidatorEnum.OPT2);

    const found = await NumberValidatorsModel.findById(doc._id).exec();

    expect(found).to.not.equal(undefined);
    expect(found.enumed).to.equal(NumberValidatorEnum.OPT2);
  });
}
