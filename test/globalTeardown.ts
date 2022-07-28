import { MongoMemoryServer } from 'mongodb-memory-server';
import { config } from './utils/config.js';

export = async function globalTeardown() {
  if (config.Memory) {
    const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;
    await instance.stop();
  }
};
