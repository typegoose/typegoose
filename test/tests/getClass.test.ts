import mongoose from 'mongoose';
import { getClass, isDocument } from '../../src/typegoose';
import { Car, CarModel } from '../models/car';
import { PersonModel } from '../models/person';
import { Genders, User, UserModel } from '../models/user';

it('should return correct class type for document', async () => {
  const car = await CarModel.create({
    carModel: 'Tesla',
    price: mongoose.Types.Decimal128.fromString('50123.25'),
  });
  const carReflectedType = getClass(car);
  expect(carReflectedType).toEqual(Car);

  const user = await UserModel.create({
    firstName: 'John2',
    lastName: 'Doe2',
    gender: Genders.MALE,
    languages: ['english2', 'typescript2'],
    uniqueId: 'not-needed',
  });
  const userReflectedType = getClass(user);
  expect(userReflectedType).toEqual(User);

  // assert negative to be sure (false positive)
  expect(carReflectedType).not.toEqual(User);
  expect(userReflectedType).not.toEqual(Car);
});

it('should use inherited schema', async () => {
  let user = await PersonModel.create({ email: 'my@email.com' });

  const car = await CarModel.create({
    carModel: 'Tesla',
    price: mongoose.Types.Decimal128.fromString('50123.25'),
  });
  await user.addCar(car);

  user = await PersonModel.findById(user.id).populate('cars').orFail().exec();

  // verify properties
  expect(user).toHaveProperty('createdAt');
  expect(user).toHaveProperty('email', 'my@email.com');

  expect(user.cars!.length > 0).toBe(true);
  user.cars!.forEach((currentCar) => {
    if (isDocument(currentCar)) {
      expect(typeof currentCar.carModel).toBe('string');
    } else {
      fail('Expected "currentCar" to be populated!');
    }
  });

  // verify methods
  expect(user.getClassName()).toEqual('Person');
  expect(PersonModel.getStaticName()).toEqual('Person');
});
