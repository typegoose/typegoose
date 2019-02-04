import * as _ from 'lodash';
import { expect } from 'chai';
import * as mongoose from 'mongoose';

import { model as User, User as UserType } from './models/user';
import { model as Car, Car as CarType } from './models/car';
import { model as Person, PersistentModel } from './models/person';
import { model as Rating } from './models/rating';
import { PersonNested, AddressNested, PersonNestedModel } from './models/nested-object';
import { Genders } from './enums/genders';
import { Role } from './enums/role';
import { initDatabase, closeDatabase } from './utils/mongoConnect';
import { getClassForDocument } from '../utils';
import { fail } from 'assert';

describe('Typegoose', () => {
  before(() => initDatabase());

  after(() => closeDatabase());

  it('should create a User with connections', async () => {
    const car = await Car.create({
      model: 'Tesla',
      version: 'ModelS',
      price: mongoose.Types.Decimal128.fromString('50123.25'),
    });

    const [trabant, zastava] = await Car.create([{
      model: 'Trabant',
      price: mongoose.Types.Decimal128.fromString('28189.25'),
    }, {
      model: 'Zastava',
        price: mongoose.Types.Decimal128.fromString('1234.25'),
    }]);

    const user = await User.create({
      _id: mongoose.Types.ObjectId(),
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
          salery: 5000,
          field: "IT",
        },
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
      expect(foundUser).to.have.property('uniqueId', 'john-doe-20');
      expect(foundUser).to.have.property('age', 20);
      expect(foundUser).to.have.property('gender', Genders.MALE);
      expect(foundUser).to.have.property('role', Role.User);
      expect(foundUser).to.have.property('roles').to.have.length(1).to.include(Role.Guest);
      expect(foundUser).to.have.property('job');
      expect(foundUser).to.have.property('car');
      expect(foundUser).to.have.property('languages').to.have.length(2).to.include('english').to.include('typescript');
      expect(foundUser.job).to.have.property('title', 'Developer');
      expect(foundUser.job).to.have.property('position', 'Lead');
      expect(foundUser.job).to.have.property('startedAt').to.be.instanceof(Date);
      expect(foundUser.job.jobType).to.not.have.property('_id');
      expect(foundUser.job.titleInUppercase()).to.eq("Developer".toUpperCase());
      expect(foundUser.job.jobType).to.have.property('salery', 5000);
      expect(foundUser.job.jobType).to.have.property('field', 'IT');
      expect(foundUser.job.jobType).to.have.property('salery').to.be.a('number');
      expect(foundUser.car).to.have.property('model', 'Tesla');
      expect(foundUser.car).to.have.property('version', 'models');
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

    {
      const createdUser = await User.findOrCreate({
        firstName: 'Jane',
        lastName: 'Doe',
        gender: Genders.FEMALE,
      });

      expect(createdUser).to.be.ok;
      expect(createdUser).to.have.property('created');
      expect(createdUser.created).to.be.true;
      expect(createdUser).to.have.property('doc');
      expect(createdUser.doc).to.have.property('firstName', 'Jane');

      const foundUser = await User.findOrCreate({
        firstName: 'Jane',
        lastName: 'Doe',
      });

      expect(foundUser).to.be.ok;
      expect(foundUser).to.have.property('created');
      expect(foundUser.created).to.be.false;
      expect(foundUser).to.have.property('doc');
      expect(foundUser.doc).to.have.property('firstName', 'Jane');

      try {
        await User.create({
          _id: mongoose.Types.ObjectId(),
          firstName: 'John',
          lastName: 'Doe',
          age: 20,
          gender: Genders.MALE,
          uniqueId: 'john-doe-20',
        });
      } catch (err) {
        expect(err).to.have.property('code', 11000);
      }
    }
  });

  it('should add a language and job using instance methods', async () => {
    const user = await User.create({
      firstName: 'harry',
      lastName: 'potter',
      gender: Genders.MALE,
      languages: ['english'],
      uniqueId: 'unique-id',
    });
    await user.addJob({ position: 'Dark Wizzard', title: 'Archmage' });
    await user.addJob();
    const savedUser = await user.addLanguage();

    expect(savedUser.languages).to.include('Hungarian');
    expect(savedUser.previousJobs.length).to.be.above(0);
    _.map(savedUser.previousJobs, (prevJob) => {
      expect(prevJob.startedAt).to.be.ok;
    });
  });

  it('should add compound index', async () => {
    const user = await User.findOne();
    const car = await Car.findOne();

    await Rating.create({ user: user._id, car: car._id, stars: 4 });

    // should fail, because user and car should be unique
    const created = await Rating.create({ user: user._id, car: car._id, stars: 5 })
      .then(() => true).catch(() => false);

    expect(created).to.be.false;
  });
});

describe('getClassForDocument()', () => {
  before(() => initDatabase());

  it('should return correct class type for document', async () => {
    const car = await Car.create({
      model: 'Tesla',
      price: mongoose.Types.Decimal128.fromString('50123.25'),
    });
    const carReflectedType = getClassForDocument(car);
    expect(carReflectedType).to.equals(CarType);

    const user = await User.create({
      _id: mongoose.Types.ObjectId(),
      firstName: 'John2',
      lastName: 'Doe2',
      gender: Genders.MALE,
      languages: ['english2', 'typescript2'],
    });
    const userReflectedType = getClassForDocument(user);
    expect(userReflectedType).to.equals(UserType);

    // assert negative to be sure (false positive)
    expect(carReflectedType).to.not.equals(UserType);
    expect(userReflectedType).to.not.equals(CarType);
  });

  it('should use inherited schema', async () => {
    let user = await Person.create({
      email: 'my@email.com',
    });

    const car = await Car.create({
      model: 'Tesla',
      price: mongoose.Types.Decimal128.fromString('50123.25'),
    });

    await user.addCar(car);

    user = await Person.findById(user.id).populate('cars');

    // verify properties
    expect(user).to.have.property('createdAt');
    expect(user).to.have.property('email', 'my@email.com');

    expect(user.cars.length).to.be.above(0);
    _.map(user.cars, (currentCar: CarType) => {
      expect(currentCar.model).to.be.ok;
    });

    // verify methods
    expect(user.getClassName()).to.equals('Person');
    expect(Person.getStaticName()).to.equals('Person');
  });

  it('Should store nested address', async () => {
    const personInput = new PersonNested();
    personInput.name = 'Person, Some';
    personInput.address = new AddressNested('A Street 1');
    personInput.moreAddresses = [
      new AddressNested('A Street 2'),
      new AddressNested('A Street 3'),
    ];

    const person = await PersonNestedModel.create(personInput);

    expect(person).is.not.undefined;
    expect(person.name).equals('Person, Some');
    expect(person.address).is.not.undefined;
    expect(person.address.street).equals('A Street 1');
    expect(person.moreAddresses).is.not.undefined;
    expect(person.moreAddresses.length).equals(2);
    expect(person.moreAddresses[0].street).equals('A Street 2');
    expect(person.moreAddresses[1].street).equals('A Street 3');
  });

  it('Should validate Decimal128', async () => {
    try {
      await Car.create({
        model: 'Tesla',
        price: 'NO DECIMAL',
      });
      fail('Validation must fail.');
    } catch (e) {
      expect(e).to.be.a.instanceof((mongoose.Error as any).ValidationError);
    }
    const car = await Car.create({
      model: 'Tesla',
      price: mongoose.Types.Decimal128.fromString('123.45'),
    });
    const foundCar = await Car.findById(car._id).exec();
    expect(foundCar.price).to.be.a.instanceof(mongoose.Types.Decimal128);
    expect(foundCar.price.toString()).to.eq('123.45');
  });

  it('Should validate email', async () => {
    try {
      await Person.create({
          email: 'email',
      });
      fail('Validation must fail.');
    } catch (e) {
      expect(e).to.be.a.instanceof((mongoose.Error as any).ValidationError);
    }
  });
});
