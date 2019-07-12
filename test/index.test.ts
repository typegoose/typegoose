import { expect, use } from 'chai';
import * as mongoose from 'mongoose';

import { fail } from 'assert';
import * as cap from 'chai-as-promised';
import { Ref } from '../src/prop';
import { getClassForDocument } from '../src/utils';
import { Genders } from './enums/genders';
import { Role } from './enums/role';
import { Car as CarType, model as Car } from './models/car';
import { BeverageModel as Beverage, InventoryModel as Inventory, ScooterModel as Scooter } from './models/inventory';
import { AddressNested, PersonNested, PersonNestedModel } from './models/nested-object';
import { model as Person } from './models/person';
import { model as Rating } from './models/rating';
import { model as Select } from './models/select';
import { model as StringValidators } from './models/stringValidators';
import { model as User, User as UserType } from './models/user';
import { Virtual, VirtualSub } from './models/virtualprop';
import { connect, disconnect } from './utils/mongooseConnect';

use(cap);

describe('Typegoose', () => {
  before(() => connect());
  after(() => disconnect());

  it('should create a User with connections', async () => {
    const car = await Car.create({
      model: 'Tesla',
      version: 'ModelS',
      price: mongoose.Types.Decimal128.fromString('50123.25')
    });

    const [trabant, zastava] = await Car.create([{
      model: 'Trabant',
      price: mongoose.Types.Decimal128.fromString('28189.25')
    }, {
      model: 'Zastava',
      price: mongoose.Types.Decimal128.fromString('1234.25')
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
          field: 'IT',
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
      expect(foundUser.job.titleInUppercase()).to.eq('Developer'.toUpperCase());
      expect(foundUser.job.jobType).to.have.property('salery', 5000);
      expect(foundUser.job.jobType).to.have.property('field', 'IT');
      expect(foundUser.job.jobType).to.have.property('salery').to.be.a('number');
      expect(foundUser.car).to.have.property('model', 'Tesla');
      expect(foundUser.car).to.have.property('version', 'models');
      expect(foundUser).to.have.property('previousJobs').to.have.length(2);

      expect(foundUser).to.have.property('fullName', 'John Doe');


      const [janitor, manager] = foundUser.previousJobs;
      expect(janitor).to.have.property('title', 'Janitor');
      expect(manager).to.have.property('title', 'Manager');

      expect(foundUser).to.have.property('previousCars').to.have.length(2);

      const [foundTrabant, foundZastava] = foundUser.previousCars;
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
      expect(createdUser.created).to.be.equals(true);
      expect(createdUser).to.have.property('doc');
      expect(createdUser.doc).to.have.property('firstName', 'Jane');

      const foundUser = await User.findOrCreate({
        firstName: 'Jane',
        lastName: 'Doe',
      });

      expect(foundUser).to.be.ok;
      expect(foundUser).to.have.property('created');
      expect(foundUser.created).to.be.equals(false);
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
    savedUser.previousJobs.map((prevJob) => {
      expect(prevJob.startedAt).to.be.a('date');
    });
  });

  it('should add compound index', async () => {
    const user = await User.findOne();
    const car = await Car.findOne();

    await Rating.create({ user, car, stars: 4 });

    // should fail, because user and car should be unique
    const created = await Rating.create({ user, car, stars: 5 })
      .then(() => true).catch(() => false);

    expect(created).to.be.equals(false);
  });

  it('should add and populate the virtual properties', async () => {
    const virtualModel = new Virtual().getModelForClass(Virtual);
    const virtualSubModel = new VirtualSub().getModelForClass(VirtualSub);

    const virtual1 = await new virtualModel({ dummyVirtual: 'dummyVirtual1' } as Virtual).save();
    const virtualsub1 = await new virtualSubModel({
      dummy: 'virtualSub1',
      virtual: virtual1._id
    } as Partial<VirtualSub>).save();
    const virtualsub2 = await new virtualSubModel({
      dummy: 'virtualSub2',
      virtual: mongoose.Types.ObjectId() as Ref<any>
    } as Partial<VirtualSub>).save();
    const virtualsub3 = await new virtualSubModel({
      dummy: 'virtualSub3',
      virtual: virtual1._id
    } as Partial<VirtualSub>).save();

    const newfound = await virtualModel.findById(virtual1._id).populate('virtualSubs').exec();

    expect(newfound.dummyVirtual).to.be.equal('dummyVirtual1');
    expect(newfound.virtualSubs).to.not.be.an('undefined');
    expect(newfound.virtualSubs[0].dummy).to.be.equal('virtualSub1');
    expect(newfound.virtualSubs[0]._id.toString()).to.be.equal(virtualsub1._id.toString());
    expect(newfound.virtualSubs[1].dummy).to.be.equal('virtualSub3');
    expect(newfound.virtualSubs[1]._id.toString()).to.be.equal(virtualsub3._id.toString());
    expect(newfound.virtualSubs).to.not.include(virtualsub2);
  });

  it('Should support dynamic references via refPath', async () => {
    const sprite = new Beverage({
      isDecaf: true,
      isSugarFree: false
    });
    await sprite.save();

    const cokeZero = new Beverage({
      isDecaf: false,
      isSugarFree: true
    });
    await cokeZero.save();

    const vespa = new Scooter({
      makeAndModel: 'Vespa'
    });
    await vespa.save();

    const in1 = new Inventory({
      refItemPathName: 'Beverage',
      kind: sprite,
      count: 10,
      value: 1.99
    });
    await in1.save();

    const in2 = new Inventory({
      refItemPathName: 'Scooter',
      kind: vespa,
      count: 1,
      value: 1099.98
    });
    await in2.save();

    // I should now have two "inventory" items, with different embedded reference documents.
    const items = await Inventory.find({}).populate('kind');
    expect((items[0].kind as typeof Beverage).isDecaf).to.be.equals(true);

    // wrong type to make typescript happy
    expect((items[1].kind as typeof Beverage).isDecaf).to.be.an('undefined');
  });
  describe('string validators', () => {
    // TODO: Specify an identifier for the error messages, e. g. as a regex to the message content.
    // Otherwise we could catch errors that have nothing to do with what is being tested.

    it('should respect maxlength', (done) => {
      expect(StringValidators.create({
        maxLength: 'this is too long',
      })).to.eventually.rejectedWith(mongoose.Error).and.notify(done);
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
        enumed: 'i am not valid',
      })).to.eventually.rejectedWith(mongoose.Error).and.notify(done);
    });
  });

  it('should only return selected types', async () => {
    const selecttest = new Select();
    await selecttest.save();

    const foundselect = (await Select.findById(selecttest.id).exec()).toObject();
    expect(foundselect).to.not.have.property('test1');
    expect(foundselect).to.have.property('test2', 'testing 2 should be included');
    expect(foundselect).to.not.have.property('test3');
  });
});

describe('getClassForDocument()', () => {
  before(() => connect());
  after(() => disconnect());

  it('should return correct class type for document', async () => {
    const car = await Car.create({
      model: 'Tesla',
      price: mongoose.Types.Decimal128.fromString('50123.25')
    });
    const carReflectedType = getClassForDocument(car);
    expect(carReflectedType).to.equals(CarType);

    const user = await User.create({
      firstName: 'John2',
      lastName: 'Doe2',
      gender: Genders.MALE,
      languages: ['english2', 'typescript2'],
      uniqueId: 'not-needed'
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
      price: mongoose.Types.Decimal128.fromString('50123.25')
    });

    await user.addCar(car);

    user = await Person.findById(user.id).populate('cars');

    // verify properties
    expect(user).to.have.property('createdAt');
    expect(user).to.have.property('email', 'my@email.com');

    expect(user.cars.length).to.be.above(0);
    user.cars.map((currentCar: CarType) => {
      expect(currentCar.model).to.be.an('string');
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

    expect(person).is.not.be.an('undefined');
    expect(person.name).equals('Person, Some');
    expect(person.address).is.not.be.an('undefined');
    expect(person.address.street).equals('A Street 1');
    expect(person.moreAddresses).is.not.be.an('undefined');
    expect(person.moreAddresses.length).equals(2);
    expect(person.moreAddresses[0].street).equals('A Street 2');
    expect(person.moreAddresses[1].street).equals('A Street 3');
  });

  it('should properly set Decimal128, ObjectID types to field', () => {
    expect((Car.schema as any).paths.price.instance).to.eq('Decimal128');
    expect((Car.schema as any).paths.someId.instance).to.eq('ObjectID');
  
  });

  // faild validation will need to be checked
  it('Should validate Decimal128', async () => {
    try {
      await Car.create({
        model: 'Tesla',
        price: 'NO DECIMAL',
      });
      // fail('Validation must fail.');

    } catch (e) {

      expect(e).to.be.a.instanceof((mongoose.Error as any).ValidationError);
    }
    const car = await Car.create({
      model: 'Tesla',
      price: mongoose.Types.Decimal128.fromString('123.45')
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
