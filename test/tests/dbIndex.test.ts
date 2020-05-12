import { IndexWeights, IndexWeightsModel } from '../models/indexweigths';
import { RatingCar, RatingCarModel, RatingModel, RatingUser, RatingUserModel } from '../models/rating';
import { SelectModel, SelectStrings } from '../models/select';

describe('Property Option {select}', () => {
  beforeEach(async () => {
    const selecttest = new SelectModel();
    await selecttest.save();
  });

  it('should only return default selected properties', async () => {
    /** variable name long: foundSelectDefault */
    const fSDefault = (await SelectModel.findOne({}).orFail().exec()).toObject();

    expect(fSDefault).not.toHaveProperty('test1');
    expect(fSDefault).toHaveProperty('test2', SelectStrings.test2);
    expect(fSDefault).not.toHaveProperty('test3');
  });

  it('should only return specifically selected properties', async () => {
    /** variable name long: foundSelectExtra */
    const fSExtra = (await SelectModel.findOne({}).select(['+test1', '+test3', '-test2']).orFail().exec()).toObject();

    expect(fSExtra).toHaveProperty('test1', SelectStrings.test1);
    expect(fSExtra).not.toHaveProperty('test2');
    expect(fSExtra).toHaveProperty('test3', SelectStrings.test3);
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
    expect(found).toHaveLength(2);
    // expect it to be sorted by textScore
    expect(found[0].id).toEqual(docMongoDB.id);
    expect(found[1].id).toEqual(docMongoose.id);
  }
  {
    const found = await IndexWeightsModel.find({ $text: { $search: 'mongoose -js' } }).exec();
    expect(found).toHaveLength(1);
    expect(found[0].id).toEqual(docTypegoose.id);
  }
});

it('should add compound index', async () => {
  expect.assertions(1);
  const user = await RatingUserModel.create({ name: 'hi' } as RatingUser);
  const car = await RatingCarModel.create({ carModel: 'some' } as RatingCar);

  await RatingModel.create({ user, car, stars: 4 });

  // should fail, because user and car should be unique
  try {
    await RatingModel.create({ user, car, stars: 5 });

    fail('Expected .create to fail with code 11000');
  } catch (err) {
    expect(err).toHaveProperty('code', 11000);
  }
});
