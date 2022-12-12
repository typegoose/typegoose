import * as mongoose from 'mongoose';
import { config } from './config';

interface ExtraConnectionConfig {
  dbName?: string;
  createNewConnection?: boolean;
  differentMongoose?: mongoose.Mongoose;
}

// to not duplicate code
const staticOptions: mongoose.ConnectOptions = {
  autoIndex: true,
};

/**
 * Make a Connection to MongoDB
 */
export async function connect(extraConfig: ExtraConnectionConfig = {}): Promise<mongoose.Connection> {
  const mongooseInstance: mongoose.Mongoose = extraConfig.differentMongoose ?? mongoose;
  let connection: mongoose.Connection;

  const options = Object.assign({}, staticOptions);

  if (config.Memory) {
    if (config?.Auth?.User?.length > 0) {
      Object.assign(options, {
        user: config.Auth.User,
        pass: config.Auth.Passwd,
        authSource: config.Auth.DB,
      });
    }
  }

  // to not duplicate code
  const connectionString = `${process.env.MONGO_URI}/${extraConfig.dbName ?? config.DataBase}`;

  mongoose.set('strictQuery', false); // TODO: remove in mongoose 7, disabled deprecation warning

  if (extraConfig.createNewConnection) {
    connection = await mongooseInstance.createConnection(connectionString, options).asPromise();
  } else {
    await mongoose.connect(connectionString, options);
    connection = mongooseInstance.connection;
  }

  return connection;
}

/**
 * Disconnect from MongoDB
 * @returns when it is disconnected
 */
export async function disconnect(): Promise<void> {
  await mongoose.disconnect();

  return;
}
