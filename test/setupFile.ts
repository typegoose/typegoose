import { connect, disconnect } from './utils/connect';

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnect();
});
