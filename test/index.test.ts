import { expect, use } from 'chai';
import * as cap from 'chai-as-promised';
import * as mongoose from 'mongoose';

import { IndexWeights, model as IndexWeightsModel } from './models/indexweigths';
import { suite as BigUserTest } from './tests/biguser.test';
import { suite as GCFDTest } from './tests/getClassForDocument.test';
import { suite as HookTest } from './tests/hooks.test';
import { suite as SelectTests } from './tests/select.test';
import { suite as ShouldAddTest } from './tests/shouldAdd.test';
import { suite as StringValidatorTests } from './tests/stringValidator.test';
import { connect, disconnect } from './utils/mongooseConnect';

use(cap);

describe('Typegoose', () => {
  before(() => connect());
  after(() => disconnect());

  describe('BigUser', BigUserTest.bind(this));

  describe('Hooks', HookTest.bind(this));

  describe('Should add', ShouldAddTest.bind(this));

  describe('Property Option {select}', SelectTests.bind(this));

  describe('String Validators', StringValidatorTests.bind(this));

  describe('getClassForDocument()', GCFDTest.bind(this));

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
});
