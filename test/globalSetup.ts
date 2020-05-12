import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { logger } from '../src/logSettings';
import { config } from './utils/config';

export = async function globalSetup() {
  logger.setLevel('DEBUG');
  if (config.Memory) {
    /** it's needed in global space, because we don't want to create a new instance every time */
    const instance = new MongoMemoryServer();
    const uri = await instance.getUri();
    (global as any).__MONGOINSTANCE = instance;
    process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));
  } else {
    process.env.MONGO_URI = `mongodb://${config.IP}:${config.Port}`;
  }

  await mongoose.connect(`${process.env.MONGO_URI}/${config.DataBase}`, { useNewUrlParser: true, useUnifiedTopology: true });
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
};
