import { expect } from 'chai';
import * as mongoose from 'mongoose';

import { Ref } from '../../src/typegoose';
import { Genders } from '../enums/genders';
import { model as Car } from '../models/car';
import { model as InternetUser } from '../models/internet-user';
import { BeverageModel as Beverage, InventoryModel as Inventory, ScooterModel as Scooter } from '../models/inventory';
import { model as Rating } from '../models/rating';
import { model as User } from '../models/user';
import { Virtual, VirtualSub } from '../models/virtualprop';

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 * @example
 * ```
 * import { suite as ShouldAddTest } from './shouldAdd.test'
 * ...
 * describe('Should add', ShouldAddTest.bind(this));
 * ...
 * ```
 */
export function suite() {
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
    try {
      await Rating.create({ user, car, stars: 5 });
    } catch (err) {
      expect(err).to.have.property('code', 11000);
    }
    // await expect(Rating.create({ user, car, stars: 5 })).to.be.rejected.and.have.property('code', 11000);
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

  it(`should add dynamic fields using map`, async () => {
    const user = await InternetUser.create({
      socialNetworks: {
        'twitter': 'twitter account',
        'facebook': 'facebook account',
      },
      sideNotes: {
        'day1': {
          content: 'day1',
          link: 'url'
        },
        'day2': {
          content: 'day2',
          link: 'url//2'
        },
      },
      projects: {},
    });
    expect(user).to.not.be.an('undefined');
    expect(user).to.have.property('socialNetworks').to.be.instanceOf(Map);
    expect(user.socialNetworks.get('twitter')).to.be.eq('twitter account');
    expect(user.socialNetworks.get('facebook')).to.be.eq('facebook account');
    expect(user).to.have.property('sideNotes').to.be.instanceOf(Map);
    expect(user.sideNotes.get('day1')).to.have.property('content', 'day1');
    expect(user.sideNotes.get('day1')).to.have.property('link', 'url');
    expect(user.sideNotes.has('day2')).to.be.equal(true);
  });

  it('Should support dynamic references via refPath', async () => {
    const sprite = new Beverage({
      isDecaf: true,
      isSugarFree: false
    });
    await sprite.save();

    await new Beverage({
      isDecaf: false,
      isSugarFree: true
    }).save();

    const vespa = new Scooter({
      makeAndModel: 'Vespa'
    });
    await vespa.save();

    await new Inventory({
      refItemPathName: 'Beverage',
      kind: sprite,
      count: 10,
      value: 1.99
    }).save();

    await new Inventory({
      refItemPathName: 'Scooter',
      kind: vespa,
      count: 1,
      value: 1099.98
    }).save();

    // I should now have two "inventory" items, with different embedded reference documents.
    const items = await Inventory.find({}).populate('kind');
    expect((items[0].kind as typeof Beverage).isDecaf).to.be.equals(true);

    // wrong type to make typescript happy
    expect((items[1].kind as typeof Beverage).isDecaf).to.be.an('undefined');
  });
}
