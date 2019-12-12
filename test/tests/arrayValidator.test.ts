import { assert, expect } from 'chai';
import * as mongoose from 'mongoose';

import { ArrayValidatorEnumNumber, ArrayValidatorEnumString, ArrayValidatorsModel } from '../models/arrayValidators';

// Please try to keep this file in sync with ./stringValidator.test.ts

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 */
export function suite() {
  it('should respect maxlength [String]', (done) => {
    expect(ArrayValidatorsModel.create({
      maxLength: ['this is too long']
    })).to.eventually.rejectedWith(mongoose.Error.ValidationError).and.notify(done);
  });

  it('should respect minlength [String]', (done) => {
    expect(ArrayValidatorsModel.create({
      minLength: ['too short']
    })).to.eventually.rejectedWith(mongoose.Error.ValidationError).and.notify(done);
  });

  it('should trim [String]', async () => {
    const trimmed = await ArrayValidatorsModel.create({
      trimmed: ['trim my end    ']
    });
    expect(trimmed.trimmed[0]).equals('trim my end');
  });

  it('should uppercase [String]', async () => {
    const uppercased = await ArrayValidatorsModel.create({
      uppercased: ['make me uppercase']
    });
    expect(uppercased.uppercased[0]).equals('MAKE ME UPPERCASE');
  });

  it('should lowercase [String]', async () => {
    const lowercased = await ArrayValidatorsModel.create({
      lowercased: ['MAKE ME LOWERCASE']
    });
    expect(lowercased.lowercased[0]).equals('make me lowercase');
  });

  it('should lowercase & have a default [String]', async () => {
    const defaulted = await ArrayValidatorsModel.create({});
    expect(defaulted.defaulted[0]).equals('hello');
  });

  it('should respect max [Number]', (done) => {
    expect(ArrayValidatorsModel.create({
      max: [4] // over 3
    })).to.eventually.rejectedWith(mongoose.Error.ValidationError).and.notify(done);
  });

  it('should respect min [Number]', (done) => {
    expect(ArrayValidatorsModel.create({
      min: [9] // under 10
    })).to.eventually.rejectedWith(mongoose.Error.ValidationError).and.notify(done);
  });

  it('should respect enum [String]', async () => {
    try {
      await ArrayValidatorsModel.create({
        enumedString: 'not in the enum' // string not in the enum
      });

      assert.fail('Expected to throw ValidationError!');
    } catch (err) {
      expect(err).to.be.an.instanceOf(mongoose.Error.ValidationError);
    }

    const doc = await ArrayValidatorsModel.create({
      enumedString: [ArrayValidatorEnumString.OPT1, ArrayValidatorEnumString.OPT2]
    });

    expect(doc).to.not.equal(undefined);
    expect(doc.enumedString).to.deep.equal([ArrayValidatorEnumString.OPT1, ArrayValidatorEnumString.OPT2]);

    const found = await ArrayValidatorsModel.findById(doc._id).exec();

    expect(found).to.not.equal(undefined);
    expect(found.enumedString).to.deep.equal([ArrayValidatorEnumString.OPT1, ArrayValidatorEnumString.OPT2]);
  });

  it.skip('should respect enum [Number]', async () => {
    try {
      await ArrayValidatorsModel.create({
        enumedNumber: 5 // number not in the enum
      });

      assert.fail('Expected to throw ValidationError!');
    } catch (err) {
      expect(err).to.be.an.instanceOf(mongoose.Error.ValidationError);
    }

    const doc = await ArrayValidatorsModel.create({
      enumedNumber: [ArrayValidatorEnumNumber.OPT1, ArrayValidatorEnumNumber.OPT2]
    });

    expect(doc).to.not.equal(undefined);
    expect(doc.enumedNumber).to.deep.equal([ArrayValidatorEnumNumber.OPT1, ArrayValidatorEnumNumber.OPT2]);

    const found = await ArrayValidatorsModel.findById(doc._id).exec();

    expect(found).to.not.equal(undefined);
    expect(found.enumedNumber).to.deep.equal([ArrayValidatorEnumNumber.OPT1, ArrayValidatorEnumNumber.OPT2]);
  });
}
