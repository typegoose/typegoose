import { expect } from 'chai';
import * as mongoose from 'mongoose';

import { fail } from 'assert';
import { getClassForDocument } from '../../src/utils';
import { Genders } from '../enums/genders';
import { Car as CarType, model as Car } from '../models/car';
import { model as InternetUser } from '../models/internetUser';
import { AddressNested, PersonNested, PersonNestedModel } from '../models/nestedObject';
import { model as Person } from '../models/person';
import { model as User, User as UserType } from '../models/user';

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 * @example
 * ```
 * import { suite as GCFDTest } from './getClassForDocument.test'
 * ...
 * describe('getClassForDocument()', GCFDTest.bind(this));
 * ...
 * ```
 */
export function suite() {
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
    let user = await Person.create({ email: 'my@email.com' });

    const car = await Car.create({
      model: 'Tesla',
      price: mongoose.Types.Decimal128.fromString('50123.25')
    });
    await user.addCar(car);

    user = await Person.findById(user.id).populate('cars').exec();

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
      new AddressNested('A Street 3')
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
        price: 'NO DECIMAL'
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
        email: 'email'
      });
      fail('Validation must fail.');
    } catch (e) {
      expect(e).to.be.a.instanceof(mongoose.Error.ValidationError);
      expect(e.message).to.be.equal( // test it specificly, to know that it is not another error
        'Person validation failed: email: Validator failed for path `email` with value `email`'
      );
    }
  });

  it(`Should Validate Map`, async () => {
    try {
      await InternetUser.create({
        projects: {
          p1: 'project'
        }
      });
      fail('Validation Should Fail');
    } catch (e) {
      expect(e).to.be.a.instanceof(mongoose.Error.ValidationError);
      expect(e.message).to.be.equal( // test it specificly, to know that it is not another error
        'InternetUser validation failed: projects.p1: `project` is not a valid enum value for path `projects.p1`.'
      );
    }
  });
}
