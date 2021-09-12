import { logger } from '../../src/logSettings';
import { buildSchema, prop } from '../../src/typegoose';

let spyWarn: jest.SpyInstance;
// "deprecate" is commented out, because there is currently nothing to test for deprecation
// let spyDeprecate: jest.SpyInstance;

beforeEach(() => {
  jest.restoreAllMocks();
  spyWarn = jest.spyOn(logger, 'warn').mockImplementation(() => void 0);
  // spyDeprecate = jest.spyOn(utils, 'deprecate').mockImplementation((v) => v);
});

describe('Options not for current Type', () => {
  it('should warn if type is not string and a string-transform is supplied', () => {
    class TestNSTETransform {
      @prop({ lowercase: true })
      public test: number;
    }

    buildSchema(TestNSTETransform);
    expect(spyWarn).toHaveBeenCalledTimes(1);
    expect(spyWarn.mock.calls).toMatchSnapshot();
  });

  it('should warn if type is not string and a string-validate is supplied', () => {
    class TestNSTEValidate {
      @prop({ maxlength: 10 })
      public test: number;
    }

    buildSchema(TestNSTEValidate);
    expect(spyWarn).toHaveBeenCalledTimes(1);
    expect(spyWarn.mock.calls).toMatchSnapshot();
  });

  it('should error if type is not number and a number-validate is supplied', () => {
    class TestNNTEValidate {
      @prop({ max: 10 })
      public test: string;
    }

    buildSchema(TestNNTEValidate);
    expect(spyWarn).toHaveBeenCalledTimes(1);
    expect(spyWarn.mock.calls).toMatchSnapshot();
  });
});
