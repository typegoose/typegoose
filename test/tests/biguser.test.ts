import mongoose from 'mongoose';
import { assertion, isNullOrUndefined } from '../../src/internal/utils';
import { CarModel } from '../models/car';
import { Genders, Role, User, UserModel } from '../models/user';

it(
  'should create a User with connections',
  async () => {
    const [tesla, trabant, zastava] = await CarModel.create([
      {
        carModel: 'Tesla',
        version: 'ModelS',
        price: mongoose.Types.Decimal128.fromString('50123.25'),
      },
      {
        carModel: 'Trabant',
        price: mongoose.Types.Decimal128.fromString('28189.25'),
      },
      {
        carModel: 'Zastava',
        price: mongoose.Types.Decimal128.fromString('1234.25'),
      },
    ]);

    const user = await UserModel.create({
      // this is explicitly called to test if manually defining is possible (also types)
      _id: new mongoose.Types.ObjectId(),
      firstName: 'John',
      lastName: 'Doe',
      age: 20,
      uniqueId: 'john-doe-20',
      gender: Genders.MALE,
      role: Role.User,
      job: {
        title: 'Developer',
        position: 'Lead',
        jobType: {
          salary: 5000,
          field: 'IT',
        },
      },
      car: tesla,
      languages: ['english', 'typescript'],
      previousJobs: [
        {
          title: 'Janitor',
        },
        {
          title: 'Manager',
        },
      ],
      previousCars: [trabant, zastava],
    });

    {
      const foundUser = await UserModel.findById(user.id).populate('car previousCars').orFail().exec();

      assertion(!isNullOrUndefined(foundUser.job), new Error('Expected "job" to not be undefined/null'));
      assertion(!isNullOrUndefined(foundUser.previousJobs), new Error('Expected "previousJobs" to not be undefined/null'));
      assertion(!isNullOrUndefined(foundUser.previousCars), new Error('Expected "previousCars" to not be undefined/null'));

      // the following requires a custom type, because property (virtual) "id" does not get added to the type by default
      expect<User & { _id: mongoose.Types.ObjectId; id: string }>(
        foundUser.toObject<User & { _id: mongoose.Types.ObjectId; id: string }>({ virtuals: true, getters: true })
      ).toMatchSnapshot({
        _id: expect.any(mongoose.Types.ObjectId),
        id: expect.any(String),
        job: {
          startedAt: expect.any(Date),
        },
        car: {
          _id: expect.any(mongoose.Types.ObjectId),
          id: expect.any(String),
        },
        previousJobs: expect.any(Array),
        previousCars: expect.any(Array),
      });

      expect(foundUser.job.titleInUppercase()).toEqual('Developer'.toUpperCase());

      {
        expect(foundUser).toHaveProperty('previousJobs');
        expect(foundUser.previousJobs).toHaveLength(2);

        const [janitor, manager] = foundUser.previousJobs;
        expect(janitor).toHaveProperty('title', 'Janitor');
        expect(manager).toHaveProperty('title', 'Manager');
      }

      {
        expect(foundUser).toHaveProperty('previousCars');
        expect(foundUser.previousCars).toHaveLength(2);

        const [foundTrabant, foundZastava] = foundUser.previousCars;
        expect(foundTrabant).toHaveProperty('carModel', 'Trabant');
        expect(foundTrabant).toHaveProperty('isSedan', true);
        expect(foundZastava).toHaveProperty('carModel', 'Zastava');
        expect(foundZastava).toHaveProperty('isSedan', undefined);
      }

      foundUser.fullName = 'Sherlock Holmes';
      expect(foundUser).toHaveProperty('firstName', 'Sherlock');
      expect(foundUser).toHaveProperty('lastName', 'Holmes');

      await foundUser.incrementAge();
      expect(foundUser).toHaveProperty('age', 21);
    }

    {
      const foundUser = await UserModel.findByAge(21);
      expect(foundUser).toHaveProperty('firstName', 'Sherlock');
      expect(foundUser).toHaveProperty('lastName', 'Holmes');
    }
  },
  10 * 1000
);
