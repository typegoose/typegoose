import * as mongoose from 'mongoose';

import { NumberValidatorEnum, NumberValidatorsModel } from '../models/numberValidators';

// Please try to keep this file in sync with ./arrayValidator.test.ts

it('should respect max', async () => {
  await expect(
    NumberValidatorsModel.create({
      max: 4 // over 3
    })
  ).rejects.toBeInstanceOf(mongoose.Error.ValidationError);
});

it('should respect min', async () => {
  await expect(
    NumberValidatorsModel.create({
      min: 9 // under 10
    })
  ).rejects.toBeInstanceOf(mongoose.Error.ValidationError);
});

it('should respect enum', async () => {
  try {
    await NumberValidatorsModel.create({
      enumed: 5 // number not in the enum
    });

    fail('Expected to throw ValidationError!');
  } catch (err) {
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  }

  const doc = await NumberValidatorsModel.create({
    enumed: NumberValidatorEnum.OPT2
  });

  expect(doc).not.toBeUndefined();
  expect(doc.enumed).toEqual(NumberValidatorEnum.OPT2);

  const found = await NumberValidatorsModel.findById(doc._id).orFail().exec();

  expect(found).not.toBeUndefined();
  expect(found.enumed).toEqual(NumberValidatorEnum.OPT2);
});
