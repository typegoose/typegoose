import * as mongoose from 'mongoose';
import * as _ from 'lodash';
import { expect } from 'chai';

import { model as User } from './models/user';
import { model as Car } from './models/car';
import { Genders } from './enums/genders';

(<any>mongoose).Promise = Promise;

function initDatabase() {
  mongoose.connect('mongodb://localhost:11010/test');
}

describe('Typegoose', () => {
  before(() => initDatabase());

  it('should create a User with connections', async () => {
    const car = await Car.create({
      model: 'Tesla',
    });

    const user = await User.create({
      name: 'John Doe',
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
    });

    const foundUser = await User.findById(user.id).populate('car').exec();
    expect(foundUser).to.be.ok;
    expect(foundUser).to.have.property('name', 'John Doe');
    expect(foundUser).to.have.property('age', 20);
    expect(foundUser).to.have.property('gender', Genders.MALE);
    expect(foundUser).to.have.property('job');
    expect(foundUser).to.have.property('car');
    expect(foundUser).to.have.property('languages').to.have.length(2).to.include('english').to.include('typescript');
    expect(foundUser.job).to.have.property('title', 'Developer');
    expect(foundUser.job).to.have.property('position', 'Lead');
    expect(foundUser.car).to.have.property('model', 'Tesla');
    expect(foundUser).to.have.property('previousJobs').to.have.length(2);
    const sortedPreviousJobs = _.sortBy(foundUser.previousJobs, (job => job.title));
    const [janitor, manager] = sortedPreviousJobs;
    expect(janitor).to.have.property('title', 'Janitor');
    expect(manager).to.have.property('title', 'Manager');

    await foundUser.incrementAge();
    expect(foundUser).to.have.property('age', 21);

    const foundUserByAge = await User.findByAge(21);
    expect(foundUser).to.be.ok;
    expect(foundUser).to.have.property('name', 'John Doe');
  });

  it('should test the required decorator', async () => {
    let err;
    try {
      await User.create({
        age: 20,
      });
    } catch (e) {
      err = e;
    }
    expect(err).to.be.ok;
    expect(err).to.have.property('name', 'ValidationError');
    expect(err)
      .to.have.property('errors')
        .to.have.property('name')
          .to.have.property('message', 'Path `name` is required.');
  });
});
