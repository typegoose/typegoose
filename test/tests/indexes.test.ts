import { index } from '../../src/indexes';
import { AlreadyMerged, Severity } from '../../src/internal/constants';
import { getMergedModelOptions } from '../../src/internal/utils';
import { prop } from '../../src/prop';
import { buildSchema, modelOptions } from '../../src/typegoose';
import { IndexWeightsModel } from '../models/indexweights';
import { RatingCarModel, RatingModel, RatingUserModel } from '../models/rating';
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
  await IndexWeightsModel.ensureIndexes();

  const docMongoDB = await IndexWeightsModel.create({
    about: 'NodeJS module for MongoDB',
    content: 'MongoDB-native is the default driver for MongoDB in NodeJS',
    keywords: ['mongodb', 'js', 'nodejs'],
  });
  const docMongoose = await IndexWeightsModel.create({
    about: 'NodeJS module for MongoDB',
    content: 'Mongoose is a Module for NodeJS that interfaces with MongoDB',
    keywords: ['mongoose', 'js', 'nodejs'],
  });
  const docTypegoose = await IndexWeightsModel.create({
    about: 'TypeScript Module for Mongoose',
    content: 'Typegoose is a Module for NodeJS that makes Mongoose more compatible with Typescript',
    keywords: ['typegoose', 'ts', 'nodejs', 'mongoose'],
  });

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
  const user = await RatingUserModel.create({ name: 'hi' });
  const car = await RatingCarModel.create({ carModel: 'some' });

  await RatingModel.create({ user, car, stars: 4 });

  // should fail, because user and car should be unique
  try {
    await RatingModel.create({ user, car, stars: 5 });

    fail('Expected .create to fail with code 11000');
  } catch (err) {
    expect(err).toHaveProperty('code', 11000);
  }
});

describe('index order', () => {
  it('should be able to inherit indexes while defining own indexes', () => {
    @index({ dummy1: 1 })
    class IndexInherit1 {
      @prop()
      public dummy1?: string;
    }

    @index({ dummy2: 1 })
    class IndexInherit2 extends IndexInherit1 {
      @prop()
      public dummy2?: string;
    }

    const sch = buildSchema(IndexInherit2);

    const indexes = sch.indexes();
    expect(indexes.length).toStrictEqual(2);
    expect(indexes).toStrictEqual([
      [{ dummy1: 1 }, { background: true }],
      [{ dummy2: 1 }, { background: true }],
    ]);
  });

  it('should be able to inherit indexes without defining own indexes', () => {
    @index({ dummy1: 1 })
    class IndexInherit3 {
      @prop()
      public dummy1?: string;
    }

    class IndexInherit4 extends IndexInherit3 {
      @prop()
      public dummy2?: string;
    }

    const sch = buildSchema(IndexInherit4);

    const indexes = sch.indexes();
    expect(indexes.length).toStrictEqual(1);
    expect(indexes).toStrictEqual([[{ dummy1: 1 }, { background: true }]]);
  });

  it('should not inherit indexes beyond "disableLowerIndexes: false", but still include self (mid level)', () => {
    @index({ dummy1: 1 })
    class IndexInheritLowest {
      @prop()
      public dummy1?: string;
    }

    @index({ dummy2: 1 })
    @modelOptions({ options: { disableLowerIndexes: true } })
    class IndexInheritMid1 extends IndexInheritLowest {
      @prop()
      public dummy2?: string;
    }

    @index({ dummy3: 1 })
    class IndexInheritMid2 extends IndexInheritMid1 {
      @prop()
      public dummy3?: string;
    }

    @index({ dummy4: 1 })
    class IndexInheritTop extends IndexInheritMid2 {
      @prop()
      public dummy4?: string;
    }

    const sch = buildSchema(IndexInheritTop);

    const indexes = sch.indexes();
    expect(indexes.length).toStrictEqual(3);
    expect(indexes).toStrictEqual([
      [{ dummy2: 1 }, { background: true }],
      [{ dummy3: 1 }, { background: true }],
      [{ dummy4: 1 }, { background: true }],
    ]);

    // the following checks are just to actually make sure the options are correctly set and inherited
    expect(getMergedModelOptions(undefined, IndexInheritMid2)).toStrictEqual({
      options: { allowMixed: Severity.WARN },
      [AlreadyMerged]: true,
    });
    expect(getMergedModelOptions(undefined, IndexInheritTop)).toStrictEqual({
      options: { allowMixed: Severity.WARN },
      [AlreadyMerged]: true,
    });
  });

  it('should not inherit indexes beyond "disableLowerIndexes: false", but still include self (self option set) [typegoose/typegoose#890]', () => {
    @index({ dummy1: 1 })
    class IndexInheritLowest {
      @prop()
      public dummy1?: string;
    }

    @index({ dummy2: 1 })
    @modelOptions({ options: { disableLowerIndexes: true } })
    class IndexInheritTop extends IndexInheritLowest {
      @prop()
      public dummy2?: string;
    }

    const sch = buildSchema(IndexInheritTop);

    const indexes = sch.indexes();
    expect(indexes.length).toStrictEqual(1);
    expect(indexes).toStrictEqual([[{ dummy2: 1 }, { background: true }]]);
  });
});
