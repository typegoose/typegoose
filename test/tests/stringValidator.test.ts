import * as mongoose from 'mongoose';

import { StringValidatorEnum, StringValidatorsModel } from '../models/stringValidators';

// Please try to keep this file in sync with ./arrayValidator.test.ts

it('should respect maxlength', async () => {
  expect.assertions(1);
  await expect(
    StringValidatorsModel.create({
      maxLength: 'this is too long'
    })
  ).rejects.toBeInstanceOf(mongoose.Error.ValidationError);
});

it('should respect minlength', async () => {
  expect.assertions(1);
  await expect(
    StringValidatorsModel.create({
      minLength: 'too short'
    })
  ).rejects.toBeInstanceOf(mongoose.Error.ValidationError);
});

it('should trim', async () => {
  const trimmed = await StringValidatorsModel.create({
    trimmed: 'trim my end    '
  });
  expect(trimmed.trimmed).toEqual('trim my end');
});

it('should uppercase', async () => {
  const uppercased = await StringValidatorsModel.create({
    uppercased: 'make me uppercase'
  });
  expect(uppercased.uppercased).toEqual('MAKE ME UPPERCASE');
});

it('should lowercase', async () => {
  const lowercased = await StringValidatorsModel.create({
    lowercased: 'MAKE ME LOWERCASE'
  });
  expect(lowercased.lowercased).toEqual('make me lowercase');
});

it('should respect enum', async () => {
  try {
    await StringValidatorsModel.create({
      // @ts-expect-error
      enumed: 'not in the enum' // string not in the enum
    });

    fail('Expected to throw ValidationError!');
  } catch (err) {
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  }

  const doc = await StringValidatorsModel.create({
    enumed: StringValidatorEnum.OPT2
  });

  expect(doc).not.toBeUndefined();
  expect(doc.enumed).toEqual(StringValidatorEnum.OPT2);

  const found = await StringValidatorsModel.findById(doc._id).orFail().exec();

  expect(found).not.toBeUndefined();
  expect(found.enumed).toEqual(StringValidatorEnum.OPT2);
});
