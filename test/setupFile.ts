import { connect, disconnect } from './utils/connect';
import 'reflect-metadata';

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnect();
});
