import * as utils from '../../src/internal/utils';
import { logger } from '../../src/logSettings';
import { buildSchema, prop } from '../../src/typegoose';

// Note: TDEP0003 is expected in here

const origWarn = logger.warn;
const origDeprecate = utils.deprecate;

beforeEach(() => {
  logger.warn = jest.fn();
  (utils as any).deprecate = jest.fn((v) => v);
});

afterAll(() => {
  // somehow test files are not isolated
  expect.assertions(1);
  (logger as any).warn = origWarn;
  (utils as any).deprecate = origDeprecate;
});

describe('Options not for current Type', () => {
  beforeEach(() => {
    expect.assertions(1);
  });

  it('should warn if type is not string and a string-transform is supplied', () => {
    class TestNSTETransform {
      @prop({ lowercase: true })
      public test: number;
    }

    buildSchema(TestNSTETransform);
    expect((logger.warn as any).mock.calls.length).toEqual(1);
  });

  it('should warn if type is not string and a string-validate is supplied', () => {
    class TestNSTEValidate {
      @prop({ maxlength: 10 })
      public test: number;
    }

    buildSchema(TestNSTEValidate);
    expect((logger.warn as any).mock.calls.length).toEqual(1);
  });

  it('should error if type is not number and a number-validate is supplied', () => {
    class TestNNTEValidate {
      @prop({ max: 10 })
      public test: string;
    }

    buildSchema(TestNNTEValidate);
    expect((logger.warn as any).mock.calls.length).toEqual(1);
  });
});
