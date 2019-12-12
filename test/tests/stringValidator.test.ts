import { assert, expect } from 'chai';
import * as mongoose from 'mongoose';

import { StringValidatorEnum, StringValidatorsModel } from '../models/stringValidators';

// Please try to keep this file in sync with ./arrayValidator.test.ts

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 */
export function suite() {
  it('should respect maxlength', (done) => {
    expect(StringValidatorsModel.create({
      maxLength: 'this is too long'
    })).to.eventually.rejectedWith(mongoose.Error.ValidationError).and.notify(done);
  });

  it('should respect minlength', (done) => {
    expect(StringValidatorsModel.create({
      minLength: 'too short'
    })).to.eventually.rejectedWith(mongoose.Error.ValidationError).and.notify(done);
  });

  it('should trim', async () => {
    const trimmed = await StringValidatorsModel.create({
      trimmed: 'trim my end    '
    });
    expect(trimmed.trimmed).equals('trim my end');
  });

  it('should uppercase', async () => {
    const uppercased = await StringValidatorsModel.create({
      uppercased: 'make me uppercase'
    });
    expect(uppercased.uppercased).equals('MAKE ME UPPERCASE');
  });

  it('should lowercase', async () => {
    const lowercased = await StringValidatorsModel.create({
      lowercased: 'MAKE ME LOWERCASE'
    });
    expect(lowercased.lowercased).equals('make me lowercase');
  });

  it('should respect enum', async () => {
    try {
      await StringValidatorsModel.create({
        enumed: 'not in the enum' // string not in the enum
      });

      assert.fail('Expected to throw ValidationError!');
    } catch (err) {
      expect(err).to.be.an.instanceOf(mongoose.Error.ValidationError);
    }

    const doc = await StringValidatorsModel.create({
      enumed: StringValidatorEnum.OPT2
    });

    expect(doc).to.not.equal(undefined);
    expect(doc.enumed).to.equal(StringValidatorEnum.OPT2);

    const found = await StringValidatorsModel.findById(doc._id).exec();

    expect(found).to.not.equal(undefined);
    expect(found.enumed).to.equal(StringValidatorEnum.OPT2);
  });
}
