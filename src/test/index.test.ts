import { config as configDotenv } from 'dotenv';
configDotenv();

import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import { expect } from 'chai';

import { model as User } from './models/user';
import { model as Car, Car as CarType } from './models/car';
import { Genders } from './enums/genders';

(mongoose as any).Promise = Promise;

const MONGO_PORT = process.env.MONGO_PORT || 27017;

const connect = () =>
  new Promise((resolve, reject) =>
    mongoose.connect(`mongodb://localhost:${MONGO_PORT}/typegoosetest`, (err) => err ? reject(err) : resolve()));

const initDatabase = () =>
  connect().then(() => mongoose.connection.db.dropDatabase());

describe('Typegoose', () => {
  before(() => initDatabase());

  it('should create a User with connections', async () => {
    const car = await Car.create({
      model: 'Tesla',
    });

    const [trabant, zastava] = await Car.create([{
      model: 'Trabant',
    }, {
      model: 'Zastava',
    }]);

    const user = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      age: 20,
      gender: Genders.MALE,
      job: {
        title: 'Developer',
        position: 'Lead',
      },
      car: car.id,
      languages: ['english', 'typescript'],
      previousJobs: [{
        title: 'Janitor',
      }, {
        title: 'Manager',
      }],
      previousCars: [trabant.id, zastava.id],
    });

    {
      const foundUser = await User
        .findById(user.id)
        .populate('car previousCars')
        .exec();

      expect(foundUser).to.have.property('nick', 'Nothing');
      expect(foundUser).to.have.property('firstName', 'John');
      expect(foundUser).to.have.property('lastName', 'Doe');
      expect(foundUser).to.have.property('age', 20);
      expect(foundUser).to.have.property('gender', Genders.MALE);
      expect(foundUser).to.have.property('job');
      expect(foundUser).to.have.property('car');
      expect(foundUser).to.have.property('languages').to.have.length(2).to.include('english').to.include('typescript');
      expect(foundUser.job).to.have.property('title', 'Developer');
      expect(foundUser.job).to.have.property('position', 'Lead');
      expect(foundUser.job).to.have.property('startedAt').to.be.instanceof(Date);
      expect(foundUser.car).to.have.property('model', 'Tesla');
      expect(foundUser).to.have.property('previousJobs').to.have.length(2);

      expect(foundUser).to.have.property('fullName', 'John Doe');

      const [janitor, manager] = _.sortBy(foundUser.previousJobs, ((job) => job.title));
      expect(janitor).to.have.property('title', 'Janitor');
      expect(manager).to.have.property('title', 'Manager');

      expect(foundUser).to.have.property('previousCars').to.have.length(2);
      const [foundTrabant, foundZastava] =
        _.sortBy(foundUser.previousCars, (previousCar) => (previousCar as CarType).model);
      expect(foundTrabant).to.have.property('model', 'Trabant');
      expect(foundTrabant).to.have.property('isSedan', true);
      expect(foundZastava).to.have.property('model', 'Zastava');
      expect(foundZastava).to.have.property('isSedan', undefined);

      foundUser.fullName = 'Sherlock Holmes';
      expect(foundUser).to.have.property('firstName', 'Sherlock');
      expect(foundUser).to.have.property('lastName', 'Holmes');

      await foundUser.incrementAge();
      expect(foundUser).to.have.property('age', 21);
    }

    {
      const foundUser = await User.findByAge(21);
      expect(foundUser).to.have.property('firstName', 'Sherlock');
      expect(foundUser).to.have.property('lastName', 'Holmes');
    }
  });
});
