import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { isNullOrUndefined } from '../../src/internal/utils';
import { config } from './config';

/** it's needed in global space, because we don't want to create a new instance every time */
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

// to not duplicate code
const staticOptions = {
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  autoIndex: true
} as mongoose.ConnectionOptions;

/**
 * Make a Connection to MongoDB
 */
export async function connect(extraConfig: ExtraConnectionConfig = {}): Promise<mongoose.Connection> {
  let connection: mongoose.Connection;

  if (config.Memory) {
    // use in-memory-engine
    if (extraConfig.createNewConnection) {
      connection = mongoose.createConnection(await instance.getUri(extraConfig.dbName), staticOptions);
    } else {
      await mongoose.connect(await instance.getUri(extraConfig?.dbName), staticOptions);
    }
  } else {
    // use external already running database
    const options = Object.assign({}, staticOptions);
    if (config?.Auth?.User?.length > 0) {
      Object.assign(options, {
        user: config.Auth.User,
        pass: config.Auth.Passwd,
        authSource: config.Auth.DB
      });
    }

    // to not duplicate code
    const connectionString = `mongodb://${config.IP}:${config.Port}/${extraConfig.dbName ?? config.DataBase}`;

    if (extraConfig.createNewConnection) {
      connection = mongoose.createConnection(connectionString, options);
    } else {
      await mongoose.connect(connectionString, options);
    }
  }

  if (isFirst && !extraConfig.createNewConnection) {
    await firstConnect();
  }

  return connection ?? mongoose.connection;
}

/**
 * Disconnect from MongoDB
 * @returns when it is disconnected
 */
export async function disconnect(): Promise<void> {
  await mongoose.disconnect();
  if (config.Memory || !isNullOrUndefined(instance)) {
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
