import { expect } from 'chai';

import { model as Car } from '../models/car';
import { IndexWeights, model as IndexWeightsModel } from '../models/indexweigths';
import { model as Rating } from '../models/rating';
import { model as Select, SelectStrings } from '../models/select';
import { model as User } from '../models/user';

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 * @example
 * ```
 * import { suite as IndexTests } from './index.test'
 * ...
 * describe('Index', IndexTests.bind(this));
 * ...
 * ```
 */
export function suite() {
  describe('Property Option {select}', () => {
    before(async () => {
      const selecttest = new Select();
      await selecttest.save();
    });

    it('should only return default selected properties', async () => {
      /** variable name long: foundSelectDefault */
      const fSDefault = (await Select.findOne({}).exec()).toObject();

      expect(fSDefault).to.not.have.property('test1');
      expect(fSDefault).to.have.property('test2', SelectStrings.test2);
      expect(fSDefault).to.not.have.property('test3');
    });

    it('should only return specificly selected properties', async () => {
      /** variable name long: foundSelectExtra */
      const fSExtra = (await Select.findOne({}).select(['+test1', '+test3', '-test2']).exec()).toObject();

      expect(fSExtra).to.have.property('test1', SelectStrings.test1);
      expect(fSExtra).to.not.have.property('test2');
      expect(fSExtra).to.have.property('test3', SelectStrings.test3);
    });
  });

  it('should create and find indexes with weights', async () => {
    const docMongoDB = await IndexWeightsModel.create({
      about: 'NodeJS module for MongoDB',
      content: 'MongoDB-native is the default driver for MongoDB in NodeJS',
      keywords: ['mongodb', 'js', 'nodejs']
    } as IndexWeights);
    const docMongoose = await IndexWeightsModel.create({
      about: 'NodeJS module for MongoDB',
      content: 'Mongoose is a Module for NodeJS that interfaces with MongoDB',
      keywords: ['mongoose', 'js', 'nodejs']
    } as IndexWeights);
    const docTypegoose = await IndexWeightsModel.create({
      about: 'TypeScript Module for Mongoose',
      content: 'Typegoose is a Module for NodeJS that makes Mongoose more compatible with Typescript',
      keywords: ['typegoose', 'ts', 'nodejs', 'mongoose']
    } as IndexWeights);

    {
      const found = await IndexWeightsModel.find({ $text: { $search: 'mongodb' } }).exec();
      expect(found).to.be.length(2);
      // expect it to be sorted by textScore
      expect(found[0].id).to.be.equal(docMongoDB.id);
      expect(found[1].id).to.be.equal(docMongoose.id);
    }
    {
      const found = await IndexWeightsModel.find({ $text: { $search: 'mongoose -js' } }).exec();
      expect(found).to.be.length(1);
      expect(found[0].id).to.be.equal(docTypegoose.id);
    }
  });

  it('should add compound index', async () => {
    const user = await User.findOne().exec();
    const car = await Car.findOne().exec();

    await Rating.create({ user, car, stars: 4 });

    // should fail, because user and car should be unique
    try {
      await Rating.create({ user, car, stars: 5 });
    } catch (err) {
      expect(err).to.have.property('code', 11000);
    }
  });
}
