import { expect } from 'chai';
import * as mongoose from 'mongoose';

import { model as StringValidators } from '../models/stringValidators';

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
    expect(StringValidators.create({
      maxLength: 'this is too long',
    })).to.eventually.rejectedWith(mongoose.Error.ValidationError).and.notify(done);
  });

  it('should respect minlength', (done) => {
    expect(StringValidators.create({
      minLength: 'too short',
    })).to.eventually.rejectedWith(mongoose.Error.ValidationError).and.notify(done);
  });

  it('should trim', async () => {
    const trimmed = await StringValidators.create({
      trimmed: 'trim my end    ',
    });
    expect(trimmed.trimmed).equals('trim my end');
  });

  it('should uppercase', async () => {
    const uppercased = await StringValidators.create({
      uppercased: 'make me uppercase',
    });
    expect(uppercased.uppercased).equals('MAKE ME UPPERCASE');
  });

  it('should lowercase', async () => {
    const lowercased = await StringValidators.create({
      lowercased: 'MAKE ME LOWERCASE',
    });
    expect(lowercased.lowercased).equals('make me lowercase');
  });

  it('should respect enum', (done) => {
    expect(StringValidators.create({
      enumed: 'not in the enum',
    })).to.eventually.rejectedWith(mongoose.Error).and.notify(done);
  });
}
