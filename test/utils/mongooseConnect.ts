import { MongoMemoryServer } from 'mongodb-memory-server-global';
import * as mongoose from 'mongoose';
import { config } from './config';

/** its needed in global space, because we dont want to create a new instance everytime */
let instance: MongoMemoryServer = null;

if (config.Memory) {
  // only create an instance, if it is enabled in the config, wich defaults to "true"
  instance = new MongoMemoryServer();
}

/** is it the First time connecting in this test run? */
let isFirst = true;
/**
 * Make a Connection to MongoDB
 */
export async function connect(): Promise<void> {
  if (config.Memory) {
    await mongoose.connect(await instance.getConnectionString(), {
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true,
      autoIndex: true
    });
  } else {
    const options = {
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true,
      dbName: config.DataBase,
      autoIndex: true
    };
    if (config.Auth.User.length > 0) {
      Object.assign(options, {
        user: config.Auth.User,
        pass: config.Auth.Passwd,
        authSource: config.Auth.DB
      });
    }
    await mongoose.connect(`mongodb://${config.IP}:${config.Port}/`, options);
  }

  if (isFirst) {
    return await firstConnect();
  }
  return;
}

/**
 * Disconnect from MongoDB
 * @returns when it is disconnected
 */
export async function disconnect(): Promise<any> {
  await mongoose.disconnect();
  if (config.Memory) {
    await instance.stop();
  }
  return;
}

/**
 * Only execute these when the Tests were not started
 */
async function firstConnect() {
  isFirst = false;
  await mongoose.connection.db.dropDatabase(); // to always have a clean database
  await disconnect();
  await connect();

  await Promise.all( // recreate the indexes that were dropped
    Object.keys(mongoose.models).map(async modelName => {
      await mongoose.models[modelName].ensureIndexes();
    })
  );
}
