import { config as configDotenv } from 'dotenv';
configDotenv();

import * as mongoose from 'mongoose';

const MONGO_PORT = process.env.MONGO_PORT || 27017;
const connect = () =>
  new Promise((resolve, reject) =>
    mongoose.connect(`mongodb://localhost:${MONGO_PORT}/typegoosetest`, {},
      (err) => (err ? reject(err) : resolve())),
  );

export const initDatabase = () =>
  connect().then(() => mongoose.connection.db.dropDatabase());
