import { MongoMemoryServer } from 'mongodb-memory-server-global';
import * as mongoose from 'mongoose';

const mongod = new MongoMemoryServer();
let isFirst = true;
/**
 * Make a Connection to MongoDB
 */
export async function connect(): Promise<void> {
  const uri = await mongod.getConnectionString();

  const options = {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    autoIndex: true
  };
  await mongoose.connect(uri, options);

  if (isFirst) {
    return await firstConnect();
  }
  return;
}

/**
 * Disconnect from MongoDB
 */
export async function disconnect(): Promise<any> {
  await mongoose.disconnect();
  return mongod.stop();
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
