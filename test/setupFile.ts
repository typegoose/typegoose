import { connect, disconnect } from './utils/connect.js';

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnect();
});
