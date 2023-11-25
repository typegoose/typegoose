import { logger } from '../../src/logSettings';
import { buildSchema, getDiscriminatorModelForClass, getModelForClass, modelOptions, mongoose, prop, Severity } from '../../src/typegoose';
import * as utils from '../../src/internal/utils';

let spyWarn: jest.SpyInstance;
// "deprecate" is commented out, because there is currently nothing to test for deprecation
// let spyDeprecate: jest.SpyInstance;
let spyUtilsWarn: jest.SpyInstance;

beforeEach(() => {
  jest.restoreAllMocks();
  spyWarn = jest.spyOn(logger, 'warn').mockImplementation(() => void 0);
  // spyDeprecate = jest.spyOn(utils, 'deprecate').mockImplementation((v) => v);
  spyUtilsWarn = jest.spyOn(utils, 'warnMixed');
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

it('should warn if "justOne" is defined, but no Virtual Populate Options', () => {
  class TestJustOneWarning {
    @prop({ justOne: true })
    public test?: string;
  }

  buildSchema(TestJustOneWarning);
  expect(spyWarn).toHaveBeenCalledTimes(1);
  expect(spyWarn.mock.calls).toMatchSnapshot();
});

it('should warn if property is "Mixed"', () => {
  class TestMixedWarning {
    @prop({ type: () => mongoose.Schema.Types.Mixed })
    public test?: any;
  }

  buildSchema(TestMixedWarning);
  expect(spyWarn).toHaveBeenCalledTimes(1);
  expect(spyWarn.mock.calls).toMatchSnapshot();
});

it('should throw a error if property is "Mixed" and Severity.ERROR is used', () => {
  @modelOptions({ options: { allowMixed: Severity.ERROR } })
  class TestMixedError {
    @prop({ type: () => mongoose.Schema.Types.Mixed })
    public test?: any;
  }

  try {
    buildSchema(TestMixedError);
    fail('Expected to throw "TypeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
    expect(err.message).toMatchSnapshot();
  }
});

it('should allow mixed without warnings or error for "Mixed" if Severity.ALLOW is used', () => {
  @modelOptions({ options: { allowMixed: Severity.ALLOW } })
  class TestMixedWarning {
    @prop({ type: () => mongoose.Schema.Types.Mixed })
    public test?: any;
  }

  buildSchema(TestMixedWarning);
  expect(spyWarn).toHaveBeenCalledTimes(0);
  expect(spyUtilsWarn).toHaveBeenCalledTimes(1);
});

it('should warn if property is "Mixed" and a invalid Severity is used', () => {
  @modelOptions({
    options: {
      // @ts-expect-error Using a invalid Severity to test handling of invalid number
      allowMixed: -1,
    },
  })
  class TestMixedWarning {
    @prop({ type: () => mongoose.Schema.Types.Mixed })
    public test?: any;
  }

  buildSchema(TestMixedWarning);
  expect(spyWarn).toHaveBeenCalledTimes(1);
  expect(spyWarn.mock.calls).toMatchSnapshot();
});

it('should warn if "existingMongoose" is defined differently on base and discriminator', () => {
  // test setting via decorator
  {
    @modelOptions({ existingMongoose: mongoose })
    class DisBaseDecoratorEM {
      @prop()
      public baseDummy?: string;
    }

    @modelOptions({ existingMongoose: new mongoose.Mongoose() })
    class DisDecoratorEM extends DisBaseDecoratorEM {
      @prop()
      public disDummy?: string;
    }

    const DisBaseModel = getModelForClass(DisBaseDecoratorEM);
    getDiscriminatorModelForClass(DisBaseModel, DisDecoratorEM);

    expect(spyWarn).toHaveBeenCalledTimes(1);
    expect(spyWarn).toMatchSnapshot();
  }

  spyWarn.mockClear();

  // test setting via options
  {
    class DisBaseParameterEM {
      @prop()
      public baseDummy?: string;
    }

    class DisParameterEM extends DisBaseParameterEM {
      @prop()
      public disDummy?: string;
    }

    const DisBaseModel = getModelForClass(DisBaseParameterEM, { existingMongoose: mongoose });
    getDiscriminatorModelForClass(DisBaseModel, DisParameterEM, { existingMongoose: new mongoose.Mongoose() });

    expect(spyWarn).toHaveBeenCalledTimes(1);
    expect(spyWarn).toMatchSnapshot();
  }
});

it('should warn if "existingConnection" is defined differently on base and discriminator', () => {
  // test setting via decorator
  {
    @modelOptions({ existingConnection: mongoose.connection })
    class DisBaseDecoratorEC {
      @prop()
      public baseDummy?: string;
    }

    @modelOptions({ existingConnection: mongoose.createConnection() })
    class DisDecoratorEC extends DisBaseDecoratorEC {
      @prop()
      public disDummy?: string;
    }

    const DisBaseModel = getModelForClass(DisBaseDecoratorEC);
    getDiscriminatorModelForClass(DisBaseModel, DisDecoratorEC);

    expect(spyWarn).toHaveBeenCalledTimes(1);
    expect(spyWarn).toMatchSnapshot();
  }

  spyWarn.mockClear();

  // test setting via options
  {
    class DisBaseParameterEC {
      @prop()
      public baseDummy?: string;
    }

    class DisParameterEC extends DisBaseParameterEC {
      @prop()
      public disDummy?: string;
    }

    const DisBaseModel = getModelForClass(DisBaseParameterEC, { existingConnection: mongoose.connection });
    getDiscriminatorModelForClass(DisBaseModel, DisParameterEC, { existingConnection: mongoose.createConnection() });

    expect(spyWarn).toHaveBeenCalledTimes(1);
    expect(spyWarn).toMatchSnapshot();
  }
});
