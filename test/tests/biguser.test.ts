import { expect } from 'chai';
import * as mongoose from 'mongoose';

import { Genders } from '../enums/genders';
import { Role } from '../enums/role';
import { model as Car } from '../models/car';
import { model as User } from '../models/user';

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 * @example
 * ```
 * import { suite as BigUserTest } from './biguser.test'
 * ...
 * describe('BigUser', BigUserTest.bind(this));
 * ...
 * ```
 */
export function suite() {
  it('should create a User with connections', async () => {
    const [tesla, trabant, zastava] = await Car.create([{
      model: 'Tesla',
      version: 'ModelS',
      price: mongoose.Types.Decimal128.fromString('50123.25')
    }, {
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
          field: 'IT'
        }
      },
      car: tesla.id,
      languages: ['english', 'typescript'],
      previousJobs: [{
        title: 'Janitor'
      }, {
        title: 'Manager'
      }],
      previousCars: [trabant.id, zastava.id]
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
      expect(foundUser.job.titleInUppercase()).to.equal('Developer'.toUpperCase());
      expect(foundUser.job.jobType).to.not.have.property('_id');
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
  });

  it('should create a user with [Plugin].findOrCreate', async () => {
    const createdUser = await User.findOrCreate({
      firstName: 'Jane',
      lastName: 'Doe',
      gender: Genders.FEMALE
    });

    expect(createdUser).to.not.be.an('undefined');
    expect(createdUser).to.have.property('created');
    expect(createdUser.created).to.be.equals(true);
    expect(createdUser).to.have.property('doc');
    expect(createdUser.doc).to.have.property('firstName', 'Jane');

    const foundUser = await User.findOrCreate({
      firstName: 'Jane',
      lastName: 'Doe'
    });

    expect(foundUser).to.not.be.an('undefined');
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
        uniqueId: 'john-doe-20'
      });
    } catch (err) {
      expect(err).to.have.property('code', 11000);
    }
  });
}
