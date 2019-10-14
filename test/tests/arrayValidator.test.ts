import { expect } from 'chai';
import * as mongoose from 'mongoose';

import { model as ArrayValidators } from '../models/arrayValidators';

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 * @example
 * ```
 * import { suite as StringValidatorTests } from './stringValidator.test'
 * ...
 * describe('String Validators', StringValidatorTests.bind(this));
 * ...
 * ```
 */
export function suite() {
  it('should respect maxlength', (done) => {
    expect(ArrayValidators.create({
      maxLength: ['this is too long']
    })).to.eventually.rejectedWith(mongoose.Error.ValidationError).and.notify(done);
  });

  it('should respect minlength', (done) => {
    expect(ArrayValidators.create({
      minLength: ['too short']
    })).to.eventually.rejectedWith(mongoose.Error.ValidationError).and.notify(done);
  });

  it('should trim', async () => {
    const trimmed = await ArrayValidators.create({
      trimmed: ['trim my end    ']
    });
    expect(trimmed.trimmed[0]).equals('trim my end');
  });

  it('should uppercase', async () => {
    const uppercased = await ArrayValidators.create({
      uppercased: ['make me uppercase']
    });
    expect(uppercased.uppercased[0]).equals('MAKE ME UPPERCASE');
  });

  it('should lowercase', async () => {
    const lowercased = await ArrayValidators.create({
      lowercased: ['MAKE ME LOWERCASE']
    });
    expect(lowercased.lowercased[0]).equals('make me lowercase');
  });

  it('should respect enum', (done) => {
    expect(ArrayValidators.create({
      enumed: ['not in the enum']
    })).to.eventually.rejectedWith(mongoose.Error).and.notify(done);
  });

  it('should lowercase & have a default', async () => {
    const defaulted = await ArrayValidators.create({});
    expect(defaulted.defaulted[0]).equals('hello');
  });
}
