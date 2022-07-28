import { MongoMemoryServer } from 'mongodb-memory-server';
import { logger } from '../src/logSettings.js';
import { config } from './utils/config.js';
import { connect } from './utils/connect.js';

export = async function globalSetup() {
  logger.setLevel('DEBUG');

  if (config.Memory) {
    /** it's needed in global space, because we don't want to create a new instance every time */
    const instance = await MongoMemoryServer.create();
    const uri = instance.getUri();
    (global as any).__MONGOINSTANCE = instance;
    process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));
  } else {
    process.env.MONGO_URI = `mongodb://${config.IP}:${config.Port}`;
  }

  const connection = await connect({ dbName: config.DataBase });
  await connection.db.dropDatabase();
  await connection.close();
};
