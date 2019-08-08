import { expect } from 'chai';
import * as mongoose from 'mongoose';
import { buildSchema, getModelForClass, modelOptions } from '../../src/typegoose';

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 * @example
 * ```
 * import { suite as ShouldRunTests } from './shouldRun.test'
 * ...
 * describe('Should just Run', ShouldRunTests.bind(this));
 * ...
 * ```
 */
export function suite() {
  it('should not error when trying to get model multiple times', () => {
    class TEST { }
    getModelForClass(TEST);
    getModelForClass(TEST);
  });

  it('should return cache for buildSchema', () => {
    class TEST { }
    buildSchema(TEST);
    buildSchema(TEST);
  });

  it('should use existingMongoose', async () => {
    @modelOptions({ existingMongoose: mongoose })
    class TESTexistingMongoose { }
    expect(getModelForClass(TESTexistingMongoose)).to.not.be.an('undefined');
  });

  it('should use existingConnection', async () => {
    @modelOptions({ existingConnection: mongoose.connection })
    class TESTexistingConnection { }
    expect(getModelForClass(TESTexistingConnection)).to.not.be.an('undefined');
  });
}
