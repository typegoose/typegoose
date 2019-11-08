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

interface ExtraConnectionConfig {
  dbName?: string;
  createNewConnection?: boolean;
}

/**
 * Make a Connection to MongoDB
 */
export async function connect(extraConfig: ExtraConnectionConfig = {}): Promise<mongoose.Connection> {
  let connection;

  if (config.Memory) {
    if (extraConfig.createNewConnection) {
      connection = mongoose.createConnection(await instance.getConnectionString(extraConfig.dbName), {
        useNewUrlParser: true,
        useFindAndModify: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        autoIndex: true
      });
    }

    await mongoose.connect(await instance.getConnectionString(extraConfig.dbName), {
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      autoIndex: true
    });
  } else {
    const options = {
      useNewUrlParser: true,
      useFindAndModify: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      dbName: config.DataBase,
      autoIndex: true
    } as mongoose.ConnectionOptions;
    if (config?.Auth?.User?.length > 0) {
      Object.assign(options, {
        user: config.Auth.User,
        pass: config.Auth.Passwd,
        authSource: config.Auth.DB
      });
    }

    if (extraConfig.createNewConnection) {
      connection = mongoose.createConnection(`mongodb://${config.IP}:${config.Port}/${extraConfig.dbName || ''}`, options);
    } else {
      await mongoose.connect(`mongodb://${config.IP}:${config.Port}/${extraConfig.dbName || ''}`, options);
    }
  }

  if (isFirst) {
    await firstConnect();
  }

  return connection || mongoose.connection;
}

/**
 * Disconnect from MongoDB
 * @returns when it is disconnected
 */
export async function disconnect(): Promise<void> {
  await mongoose.disconnect();
  if (config.Memory) {
    await instance.stop();
  }

  return;
}

/**
 * Only execute this function when the tests were not started
 */
async function firstConnect() {
  isFirst = false;
  await mongoose.connection.db.dropDatabase(); // to always have a clean database

  await Promise.all( // recreate the indexes that were dropped
    Object.keys(mongoose.models).map(async (modelName) => {
      await mongoose.models[modelName].ensureIndexes();
    })
  );
}
