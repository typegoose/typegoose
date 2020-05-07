import * as mongoose from 'mongoose';

import { ArrayValidatorEnumNumber, ArrayValidatorEnumString, ArrayValidatorsModel } from '../models/arrayValidators';

// Please try to keep this file in sync with ./stringValidator.test.ts

it('should respect maxlength [String]', async () => {
  await expect(ArrayValidatorsModel.create({
    maxLength: ['this is too long']
  })).rejects.toBeInstanceOf(mongoose.Error.ValidationError);
});

it('should respect minlength [String]', async () => {
  await expect(ArrayValidatorsModel.create({
    minLength: ['too short']
  })).rejects.toBeInstanceOf(mongoose.Error.ValidationError);
});

it('should trim [String]', async () => {
  const trimmed = await ArrayValidatorsModel.create({
    trimmed: ['trim my end    ']
  });
  expect(trimmed.trimmed[0]).toEqual('trim my end');
});

it('should uppercase [String]', async () => {
  const uppercased = await ArrayValidatorsModel.create({
    uppercased: ['make me uppercase']
  });
  expect(uppercased.uppercased[0]).toEqual('MAKE ME UPPERCASE');
});

it('should lowercase [String]', async () => {
  const lowercased = await ArrayValidatorsModel.create({
    lowercased: ['MAKE ME LOWERCASE']
  });
  expect(lowercased.lowercased[0]).toEqual('make me lowercase');
});

it('should lowercase & have a default [String]', async () => {
  const defaulted = await ArrayValidatorsModel.create({});
  expect(defaulted.defaulted[0]).toEqual('hello');
});

it('should respect max [Number]', async () => {
  await expect(ArrayValidatorsModel.create({
    max: [4] // over 3
  })).rejects.toBeInstanceOf(mongoose.Error.ValidationError);
});

it('should respect min [Number]', async () => {
  expect(ArrayValidatorsModel.create({
    min: [9] // under 10
  })).rejects.toBeInstanceOf(mongoose.Error.ValidationError);
});

it('should respect enum [String]', async () => {
  try {
    await ArrayValidatorsModel.create({
      enumedString: ['not in the enum' as any] // string not in the enum
    });

    fail('Expected to throw ValidationError!');
  } catch (err) {
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  }

  const doc = await ArrayValidatorsModel.create({
    enumedString: [ArrayValidatorEnumString.OPT1, ArrayValidatorEnumString.OPT2]
  });

  expect(doc).not.toEqual(undefined);
  expect(Array.from(doc.enumedString)).toEqual([ArrayValidatorEnumString.OPT1, ArrayValidatorEnumString.OPT2]);

  const found = await ArrayValidatorsModel.findById(doc._id).exec();

  expect(found).not.toEqual(undefined);
  expect(Array.from(found.enumedString)).toEqual([ArrayValidatorEnumString.OPT1, ArrayValidatorEnumString.OPT2]);
});

it('should respect enum [Number]', async () => {
  try {
    await ArrayValidatorsModel.create({
      enumedNumber: [5] // number not in the enum
    });

    fail('Expected to throw ValidationError!');
  } catch (err) {
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  }

  const doc = await ArrayValidatorsModel.create({
    enumedNumber: [ArrayValidatorEnumNumber.OPT1, ArrayValidatorEnumNumber.OPT2]
  });

  expect(doc).not.toEqual(undefined);
  expect(Array.from(doc.enumedNumber)).toEqual([ArrayValidatorEnumNumber.OPT1, ArrayValidatorEnumNumber.OPT2]);

  const found = await ArrayValidatorsModel.findById(doc._id).exec();

  expect(found).not.toEqual(undefined);
  expect(Array.from(found.enumedNumber)).toEqual([ArrayValidatorEnumNumber.OPT1, ArrayValidatorEnumNumber.OPT2]);
});
