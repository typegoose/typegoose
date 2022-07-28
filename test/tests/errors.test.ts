import { model, Schema } from 'mongoose';
import {
  addModelToTypegoose,
  buildSchema,
  deleteModel,
  deleteModelWithClass,
  errors,
  getClass,
  getDiscriminatorModelForClass,
  getModelForClass,
  getModelWithString,
  getName,
  mongoose,
  Passthrough,
  pre,
  prop,
  setGlobalOptions,
  PropType,
} from '../../src/typegoose.js'; // import order is important with jest
import { DecoratorKeys } from '../../src/internal/constants.js';
import { _buildSchema } from '../../src/internal/schema.js';
import * as utils from '../../src/internal/utils.js';
import { mapValueToSeverity } from '../../src/globalOptions.js';
import { BasePropOptions } from '../../src/types.js';
import {
  ExpectedTypeError,
  InvalidEnumTypeError,
  InvalidOptionsConstructorError,
  ResolveTypegooseNameError,
} from '../../src/internal/errors.js';

beforeEach(() => {
  jest.restoreAllMocks();
});

it('should error if not all needed parameters for virtual-populate are given [NotAllVPOPElementsError] [E006]', () => {
  try {
    class TestNAEEVirtualPopulate {
      @prop({ localField: true })
      public test: string;
    }

    buildSchema(TestNAEEVirtualPopulate);
    fail('Expected to throw "NotAllVPOPElementsError"');
  } catch (err) {
    expect(err).toBeInstanceOf(errors.NotAllVPOPElementsError);
    expect(err.message).toMatchSnapshot();
  }
});

describe('tests for "NotValidModelError" [E025]', () => {
  it('should throw a Error when no valid model is passed to "addModelToTypegoose" [NotValidModelError] [E025]', () => {
    try {
      // @ts-expect-error "addModelToTypegoose" does not support a string as the first argument
      addModelToTypegoose('string', Error);

      fail('Expected to throw "NotValidModelError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.NotValidModelError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should throw a Error when no valid model is passed to "getDiscriminatorModelForClass" [NotValidModelError] [E025]', () => {
    try {
      // @ts-expect-error "getDiscriminatorModelForClass" does not support a string as the first argument
      getDiscriminatorModelForClass('string', Error);

      fail('Expected to throw "NotValidModelError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.NotValidModelError);
      expect(err.message).toMatchSnapshot();
    }
  });
});

describe('tests for "NoValidClassError" [E028]', () => {
  it('should error if no valid class is supplied to "addModelToTypegoose" [NoValidClassError] [E028]', () => {
    try {
      // @ts-expect-error expect that the second argument should be an "class"
      addModelToTypegoose(model('hello', new Schema()), 'not class');

      fail('Expected to throw "NoValidClassError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.NoValidClassError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should error if no valid class is supplied to "buildSchema" [NoValidClassError] [E028]', () => {
    try {
      // @ts-expect-error expect that the first argument should be an class
      buildSchema('hello');

      fail('Expected to throw "NoValidClassError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.NoValidClassError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should error if no valid class is supplied to "_buildSchema" [NoValidClassError] [E028]', () => {
    try {
      // @ts-expect-error expect that the first argument should be an class
      _buildSchema('hello');

      fail('Expected to throw "NoValidClassError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.NoValidClassError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should error if no valid class is supplied to "getModelForClass" [NoValidClassError] [E028]', () => {
    try {
      // @ts-expect-error expect that the first argument should be an class
      getModelForClass('hello');

      fail('Expected to throw "NoValidClassError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.NoValidClassError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should error if no valid class is supplied to "deleteModelWithClass" [NoValidClassError] [E028]', () => {
    try {
      // @ts-expect-error expect that the first argument should be an class
      deleteModelWithClass(true);

      fail('Expected to throw "NoValidClassError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.NoValidClassError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should error if no valid class is supplied to "mergeSchemaOptions" [NoValidClassError] [E028]', () => {
    try {
      // @ts-expect-error expect that the second argument should be an class
      utils.mergeSchemaOptions({}, true);

      fail('Expected to throw "NoValidClassError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.NoValidClassError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should error if no valid class is supplied to "getDiscriminatorModelForClass" [NoValidClassError] [E028]', () => {
    try {
      // @ts-expect-error expect that the second argument should be an class
      getDiscriminatorModelForClass(model('NoValidClassgetDiscriminatorModelForClass', {}), true);

      fail('Expected to throw "NoValidClassError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.NoValidClassError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should throw a Error when "cl" in "getName" is null or undefined [NoValidClassError] [E028]', () => {
    try {
      // @ts-expect-error "getName" only accepts classes (and types that are not null / undefined)
      getName(undefined);

      fail('Expected to throw "NoValidClassError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.NoValidClassError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should error if no valid class is supplied to "assignMetadata" (and "mergeMetadata") [NoValidClassError] [E028]', () => {
    try {
      // @ts-expect-error expect that the third argument is an class
      utils.assignMetadata(DecoratorKeys.Index, {}, true);

      fail('Expected to throw "NoValidClassError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.NoValidClassError);
      expect(err.message).toMatchSnapshot();
    }
  });
});

describe('tests for "InvalidTypeError" [E009]', () => {
  it('should error if no valid type is supplied to PropType.NONE [InvalidTypeError] [E009]', () => {
    try {
      class TestNME {
        @prop({ type: undefined })
        public test: undefined;
      }

      buildSchema(TestNME);
      fail('Expected to throw "InvalidTypeError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.InvalidTypeError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should error if no valid type is supplied to PropType.ARRAY [InvalidTypeError] [E009]', () => {
    try {
      class TestNoMetadataErrorAP {
        @prop({ type: undefined }, PropType.ARRAY)
        public something: undefined;
      }

      buildSchema(TestNoMetadataErrorAP);

      fail('Expected to throw "InvalidTypeError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.InvalidTypeError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should error if no valid type is supplied to PropType.MAP [InvalidTypeError] [E009]', () => {
    try {
      class TestNoMetadataErrorMP {
        @prop({ type: undefined }, PropType.MAP)
        public something: undefined;
      }

      buildSchema(TestNoMetadataErrorMP);

      fail('Expected to throw "InvalidTypeError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.InvalidTypeError);
      expect(err.message).toMatchSnapshot();
    }
  });
});

it('should throw an error if a self-contained class is used [typegoose#42] [SelfContainingClassError] [E004]', () => {
  try {
    class TestSelfContained {
      @prop()
      public self: TestSelfContained;
    }

    buildSchema(TestSelfContained);

    fail('Expected to throw "Error"');
  } catch (err) {
    expect(err).toBeInstanceOf(errors.SelfContainingClassError);
    expect(err.message).toMatchSnapshot();
  }
});

describe('tests for "FunctionCalledMoreThanSupportedError" [E003]', () => {
  it('should throw a Error when "addModelToTypegoose" got called more than once with the same model name [FunctionCalledMoreThanSupportedError] [E003]', () => {
    class TestMoreThanOnce {
      @prop()
      public dummy?: string;
    }

    const model = getModelForClass(TestMoreThanOnce);

    try {
      addModelToTypegoose(model, TestMoreThanOnce);

      fail('Expected to throw "FunctionCalledMoreThanSupportedError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.FunctionCalledMoreThanSupportedError);
      expect(err.message).toMatchSnapshot();
    }
  });
});

it('should error if the Type does not have a valid "OptionsConstructor" [InvalidOptionsConstructorError] [E016]', () => {
  class CustomType {
    constructor() {}
  }

  try {
    utils.mapOptions({}, CustomType, Error, 'undefined-pkey');

    fail('Expected to throw "InvalidOptionsConstructor"');
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidOptionsConstructorError);
    expect(err.message).toMatchSnapshot();
  }
});

describe('tests for "InvalidPropTypeError" [E013]', () => {
  it('should throw a Error when a unknown PropType is used for "utils#initProperty" [InvalidPropTypeError] [E013]', () => {
    try {
      utils.initProperty('a1', 'a2', -1);

      fail('Expected to throw "InvalidPropTypeError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.InvalidPropTypeError);
      expect(err.message).toMatchSnapshot();
    }
  });

  describe('PropType unknown (processProp)', () => {
    beforeEach(() => {
      // Mock implementation of "utils.initProperty", otherwise "InvalidPropTypeError.PropType(initProperty)" always gets thrown
      const origInitProperty = utils.initProperty;
      jest.spyOn(utils, 'initProperty').mockImplementation((...args) => {
        return origInitProperty(
          args[0],
          args[1],
          // @ts-expect-error "-1" does not exist in PropType
          args[2] === -1 ? PropType.NONE : args[2] // map "-1" to "NONE" just to have "utils.initProperty" not throw a Error, but still use it
        );
      });
    });

    it('should throw a Error when a unknown PropType is used for "processProp#Passthrough" [InvalidPropTypeError] [E013]', () => {
      class ProcessPropPassthroughPropType {
        @prop({ type: () => new Passthrough({}) }, -1)
        public test?: any;
      }

      try {
        buildSchema(ProcessPropPassthroughPropType);

        fail('Expected to throw "InvalidPropTypeError"');
      } catch (err) {
        expect(err).toBeInstanceOf(errors.InvalidPropTypeError);
        expect(err.message).toMatchSnapshot();
      }
    });

    it('should throw a Error when a unknown PropType is used for "processProp#ref" [InvalidPropTypeError] [E013]', () => {
      class ProcessPropRefPropType {
        @prop({ ref: 'hi' }, -1)
        public test?: any;
      }

      try {
        buildSchema(ProcessPropRefPropType);

        fail('Expected to throw "InvalidPropTypeError"');
      } catch (err) {
        expect(err).toBeInstanceOf(errors.InvalidPropTypeError);
        expect(err.message).toMatchSnapshot();
      }
    });

    it('should throw a Error when a unknown PropType is used for "processProp#refPath" [InvalidPropTypeError] [E013]', () => {
      class ProcessPropRefPropType {
        @prop()
        public hi?: string;

        @prop({ refPath: 'hi' }, -1)
        public test?: any;
      }

      try {
        buildSchema(ProcessPropRefPropType);

        fail('Expected to throw "InvalidPropTypeError"');
      } catch (err) {
        expect(err).toBeInstanceOf(errors.InvalidPropTypeError);
        expect(err.message).toMatchSnapshot();
      }
    });

    it('should throw a Error when a unknown PropType is used for "processProp#primitive" [InvalidPropTypeError] [E013]', () => {
      class ProcessPropRefPropType {
        @prop({ type: () => String }, -1)
        public test?: string;
      }

      try {
        buildSchema(ProcessPropRefPropType);

        fail('Expected to throw "InvalidPropTypeError"');
      } catch (err) {
        expect(err).toBeInstanceOf(errors.InvalidPropTypeError);
        expect(err.message).toMatchSnapshot();
      }
    });

    it('should throw a Error when a unknown PropType is used for "processProp#subSchema" [InvalidPropTypeError] [E013]', () => {
      class Sub {
        @prop()
        public dummy?: string;
      }

      class ProcessPropRefPropType {
        @prop({ type: () => Sub }, -1)
        public test?: Sub;
      }

      try {
        buildSchema(ProcessPropRefPropType);

        fail('Expected to throw "InvalidPropTypeError"');
      } catch (err) {
        expect(err).toBeInstanceOf(errors.InvalidPropTypeError);
        expect(err.message).toMatchSnapshot();
      }
    });
  });

  it('should throw a Error when "PropType.MAP" is used for "processProp#refPath" [InvalidPropTypeError] [E013]', () => {
    class ProcessPropRefPropType {
      @prop()
      public hi?: string;

      @prop({ refPath: 'hi' }, PropType.MAP)
      public test?: any;
    }

    try {
      buildSchema(ProcessPropRefPropType);

      fail('Expected to throw "InvalidPropTypeError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.InvalidPropTypeError);
      expect(err.message).toMatchSnapshot();
    }
  });
});

it('should fail when using Number-Enum on an String Type [NotStringTypeError] [E010]', () => {
  try {
    enum NumberEnum {
      One = 0,
      Two = 1,
    }

    class NumberEnumOnStringType {
      @prop({ enum: NumberEnum })
      public someEnum: string;
    }

    getModelForClass(NumberEnumOnStringType);

    fail('Expected to throw "NotStringTypeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(errors.NotStringTypeError);
    expect(err.message).toMatchSnapshot();
  }
});

it('should fail when using String-Enum on an Number Type [NotNumberTypeError] [E011]', () => {
  try {
    enum StringEnum {
      One = 'hi1',
      Two = 'hi2',
    }

    class NumberEnumOnStringType {
      @prop({ enum: StringEnum })
      public someEnum: number;
    }

    getModelForClass(NumberEnumOnStringType);

    fail('Expected to throw "NotNumberTypeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(errors.NotNumberTypeError);
    expect(err.message).toMatchSnapshot();
  }
});

it('should error if a non-valid object is passed to "getClass" [ResolveTypegooseNameError] [E014]', () => {
  try {
    getClass(undefined);

    fail('Expected to throw "ResolveTypegooseNameError"');
  } catch (err) {
    expect(err).toBeInstanceOf(ResolveTypegooseNameError);
    expect(err.message).toMatchSnapshot();
  }
});

it('should error if 0 or less dimensions are given (createArrayFromDimensions) [RangeError] [E018]', () => {
  try {
    utils.createArrayFromDimensions({ dim: 0 }, { someThing: true }, '', '');

    fail('Expected to throw "RangeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(RangeError);
    expect(err.message).toMatchSnapshot();
  }

  try {
    utils.createArrayFromDimensions({ dim: -100 }, { someThing: true }, '', '');

    fail('Expected to throw "RangeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(RangeError);
    expect(err.message).toMatchSnapshot();
  }
});

describe('tests for "RefOptionIsUndefinedError" [E005]', () => {
  it('should error if "ref" is set to a function, but returns "null" or "undefined" [RefOptionIsUndefinedError] [E005]', () => {
    class Main {
      // @ts-expect-error expect that "ref" is an function and returns an "string"
      @prop({ ref: () => undefined })
      public nested: any; // not setting type to "Ref", because this is a unsupported way for the type
    }

    try {
      buildSchema(Main);

      fail('Expected to throw "RefOptionIsUndefinedError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.RefOptionIsUndefinedError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should error if ref is set but is "null" or "undefined" [RefOptionIsUndefinedError] [E005]', () => {
    try {
      class RefUndefined {
        @prop({ ref: undefined })
        public someref?: any; // not setting type to "Ref", because this is a unsupported way for the type
      }

      buildSchema(RefUndefined);

      fail('Expect to throw "RefOptionIsUndefinedError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.RefOptionIsUndefinedError);
      expect(err.message).toMatchSnapshot();
    }
  });
});

it('should throw default error if no error is specified (assertion) [AssertionFallbackError] [E019]', () => {
  expect.assertions(2);
  try {
    utils.assertion(false);

    // The following is unreachable (by types), but still there just in case something happens
    fail('Expected to throw "AssertionFallbackError"');
  } catch (err) {
    expect(err).toBeInstanceOf(errors.AssertionFallbackError);
    expect(err.message).toMatchSnapshot();
  }
});

it('should throw a Error when the property is a Symbol [CannotBeSymbolError] [E024]', async () => {
  const sym = Symbol();

  class TestPropertySymbol {
    @prop()
    public dummy?: string;

    @prop()
    public [sym]?: string;
  }

  try {
    buildSchema(TestPropertySymbol);
    fail('Expected to fail with "CannotBeSymbolError"');
  } catch (err) {
    expect(err).toBeInstanceOf(errors.CannotBeSymbolError);
    expect(err.message).toMatchSnapshot();
  }
});

it('should throw a Error when "ref" is a array [OptionDoesNotSupportOption] [E027]', async () => {
  class Sub {
    @prop()
    public dummy?: string;
  }

  class TestOptionDoesNotSupportOptionRef {
    // @ts-expect-error option "ref" does not accept a array
    @prop({ ref: () => [Sub] })
    public nested?: any;
  }

  try {
    buildSchema(TestOptionDoesNotSupportOptionRef);

    fail('Expected to throw "OptionDoesNotSupportOption"');
  } catch (err) {
    expect(err).toBeInstanceOf(errors.OptionDoesNotSupportOptionError);
    expect(err.message).toMatchSnapshot();
  }
});

it('should throw a Error when "discriminators" is with "dim" other than "1" [OptionDoesNotSupportOption] [E027]', async () => {
  class Sub {
    @prop()
    public dummy?: string;
  }

  class TestOptionDoesNotSupportOptionDiscriminators {
    // @ts-expect-error option "discriminators" does not accept more than 1 array layer
    @prop({ discriminators: () => [[Sub]] })
    public nested?: any;
  }

  try {
    buildSchema(TestOptionDoesNotSupportOptionDiscriminators);

    fail('Expected to throw "OptionDoesNotSupportOption"');
  } catch (err) {
    expect(err).toBeInstanceOf(errors.OptionDoesNotSupportOptionError);
    expect(err.message).toMatchSnapshot();
  }
});

it('should throw a Error when "mapValueToSeverity" gets called but is not in "Severity" [Error]', () => {
  try {
    mapValueToSeverity(-1);

    fail('Expected to throw "Error"');
  } catch (err) {
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toMatchSnapshot();
  }
});

describe('tests for "StringLengthExpectedError" [E026]', () => {
  class DummyClass {}

  it('should throw a Error in "utils.getName" when "customName" is defined but not a String [StringLengthExpectedError] [E026]', () => {
    try {
      utils.getName(DummyClass, {
        options: {
          // @ts-expect-error "customName" only accepts "undefined", "string" or a function returning a "string"
          customName: 10,
        },
      });

      fail('Expected to throw "StringLengthExpectedError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.StringLengthExpectedError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should throw a Error in "utils.getName" when "customName" is defined but string does not meet the required length [StringLengthExpectedError] [E026]', () => {
    try {
      utils.getName(DummyClass, {
        options: {
          customName: '',
        },
      });

      fail('Expected to throw "StringLengthExpectedError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.StringLengthExpectedError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should throw a Error in "utils.getName" when "customName" is defined as a function but does not return a String [StringLengthExpectedError] [E026]', () => {
    try {
      utils.getName(DummyClass, {
        options: {
          // @ts-expect-error "customName" only accepts "undefined", "string" or a function returning a "string"
          customName: () => 10,
        },
      });

      fail('Expected to throw "StringLengthExpectedError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.StringLengthExpectedError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should throw a Error in "utils.getName" when "customName" is defined as a function but return does not meet the required length [StringLengthExpectedError] [E026]', () => {
    try {
      utils.getName(DummyClass, {
        options: {
          customName: () => '',
        },
      });

      fail('Expected to throw "StringLengthExpectedError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.StringLengthExpectedError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should throw a Error in "utils.mergeMetadata" when "key" is not a string [StringLengthExpectedError] [E026]', () => {
    try {
      utils.mergeMetadata(
        // @ts-expect-error "undefined" is not a key in "DecoratorKeys"
        undefined,
        undefined,
        DummyClass
      );

      fail('Expected to throw "StringLengthExpectedError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.StringLengthExpectedError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should throw a Error in "utils.mergeMetadata" when "key" is a string but does not meet the required length [StringLengthExpectedError] [E026]', () => {
    try {
      utils.mergeMetadata(
        // @ts-expect-error "" is not a key in "DecoratorKeys"
        '',
        undefined,
        DummyClass
      );

      fail('Expected to throw "StringLengthExpectedError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.StringLengthExpectedError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should throw a Error in "processProp" when "refPath" is not a string [StringLengthExpectedError] [E026]', () => {
    try {
      class TestRefPathString {
        @prop(
          // @ts-expect-error "refPath" only accepts strings
          {
            refPath: 10,
          } as BasePropOptions
        )
        public test?: string;
      }

      buildSchema(TestRefPathString);

      fail('Expected to throw "StringLengthExpectedError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.StringLengthExpectedError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should throw a Error in "processProp" when "refPath" is a string but does not meet the required length [StringLengthExpectedError] [E026]', () => {
    try {
      class TestRefPathString {
        @prop({ refPath: '' })
        public test?: string;
      }

      buildSchema(TestRefPathString);

      fail('Expected to throw "StringLengthExpectedError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.StringLengthExpectedError);
      expect(err.message).toMatchSnapshot();
    }
  });
});

describe('tests for "ExpectedTypeError" [E029]', () => {
  it('should error if the options provided to "setGlobalOptions" are not an object [ExpectedTypeError] [E029]', () => {
    try {
      // @ts-expect-error "undefined" does not match the restriction "IGlobalOptions"
      setGlobalOptions(undefined);

      fail('Expected to throw "ExpectedTypeError"');
    } catch (err) {
      expect(err).toBeInstanceOf(ExpectedTypeError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should throw when "deleteModel" is called with no string [ExpectedTypeError] [E029]', () => {
    try {
      // @ts-expect-error expect that the first argument should be an class
      deleteModel(true);

      fail('Expected to throw "ExpectedTypeError"');
    } catch (err) {
      expect(err).toBeInstanceOf(ExpectedTypeError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should error if no valid key is supplied to "getModelWithString" [ExpectedTypeError] [E029]', () => {
    try {
      // @ts-expect-error expect the first argument to be an "string"
      getModelWithString(true);

      fail('Expected to throw "ExpectedTypeError"');
    } catch (err) {
      expect(err).toBeInstanceOf(ExpectedTypeError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should error if no function for hooks is defined [ExpectedTypeError] [E029]', () => {
    try {
      // @ts-expect-error the second argument should be a function
      @pre<TestNoFunctionHook>('')
      class TestNoFunctionHook {
        @prop()
        public test: string;
      }

      fail('Expected to throw "ExpectedTypeError"');
    } catch (err) {
      expect(err).toBeInstanceOf(ExpectedTypeError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should throw a Error when a hooks second parameter is not a function [ExpectedTypeError] [E029]', () => {
    try {
      // @ts-expect-error the second argument should be a function
      @pre<TestHookFunctionNotFunction>('save', 'string')
      class TestHookFunctionNotFunction {
        @prop()
        public dummy?: string;
      }

      fail('Expected to throw "ExpectedTypeError"');
    } catch (err) {
      expect(err).toBeInstanceOf(ExpectedTypeError);
      expect(err.message).toMatchSnapshot();
    }
  });

  it('should throw a Error when a hooks options argument is not a object [ExpectedTypeError] [E029]', async () => {
    const customPre = jest.fn(() => fail('Expected this function to not be executed'));
    try {
      // @ts-expect-error the third argument should be undefined or a object
      @pre<TestHookOptionsNotObject>('save', customPre, 'SomethingElse')
      class TestHookOptionsNotObject {
        @prop()
        public dummy?: string;
      }

      fail('Expected to throw "ExpectedTypeError"');
    } catch (err) {
      expect(err).toBeInstanceOf(ExpectedTypeError);
      expect(err.message).toMatchSnapshot();
    }
  });
});

it('should throw a Error in "processProp" when using a invalid type for enums [InvalidEnumTypeError] [E012]', () => {
  enum TestEnum {
    v1 = 'v1',
    v2 = 'v2',
  }

  class TestInvalidEnumType {
    @prop({ type: mongoose.Schema.Types.Boolean, enum: TestEnum })
    public testVal: boolean;
  }

  try {
    _buildSchema(TestInvalidEnumType);

    fail('Expected "InvalidEnumTypeError" to be thrown');
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidEnumTypeError);
    expect(err.message).toMatchSnapshot();
  }
});
