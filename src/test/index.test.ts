import * as mongoose from 'mongoose';

import { model as User } from './models/user';

(<any>mongoose).Promise = Promise;

function initDatabase() {
  mongoose.connect('mongodb://localhost:11010/test');
}

describe('Typegoose', () => {
  before(() => initDatabase());

  it.only('should create a User with connections', async function() {
    const u = await User.create({});
  });
});
