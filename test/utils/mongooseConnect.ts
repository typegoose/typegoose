import * as mongoose from 'mongoose';
import { config } from './config';

let isFirst = true;
/**
 * Make a Connection to MongoDB
 */
export async function connect(): Promise<void> {
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

  if (isFirst) {
    return await firstConnect();
  }
  return;
}

/**
 * Disconnect from MongoDB
 */
export async function disconnect(): Promise<void> {
  return mongoose.disconnect();
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
