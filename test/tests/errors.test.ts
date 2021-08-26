import { AssertionError } from 'assert';
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
  modelOptions,
  pre,
  prop,
  Ref,
  setGlobalOptions,
} from '../../src/typegoose'; // import order is important with jest
import { DecoratorKeys, WhatIsIt } from '../../src/internal/constants';
import { _buildSchema } from '../../src/internal/schema';
import { assertion, assignMetadata, createArrayFromDimensions, mapOptions, mergeSchemaOptions } from '../../src/internal/utils';
import { logger } from '../../src/logSettings';
import { InvalidWhatIsItError } from '../../src/internal/errors';

it('should error if an non-existing(runtime) type is given [InvalidTypeError]', () => {
  try {
    class TestNME {
      @prop()
      public test: undefined;
    }

    buildSchema(TestNME);
    fail('Expected to throw "InvalidTypeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(errors.InvalidTypeError);
  }
});

it('should error if no function for hooks is defined [TypeError]', () => {
  try {
    // @ts-expect-error expect that the first argument needs to be an function
    @pre<Test>('')
    class TestNoFunctionHook {
      @prop()
      public test: string;
    }
    buildSchema(TestNoFunctionHook);
    fail('Expected to throw "TypeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
    expect((err as TypeError).message).toEqual(`"TestNoFunctionHook.pre."'s function is not a function!`);
  }
});

it('should error if no get or set function is defined for non-virtuals [TypeError]', () => {
  try {
    class TestNoGetNoSet {
      // @ts-expect-error expect error because "set" only accepts functions
      @prop({ set: false })
      public test: string;
    }

    buildSchema(TestNoGetNoSet);
    fail('Expected to throw "TypeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
    expect((err as TypeError).message).toEqual(`"TestNoGetNoSet.test" does not have a set function! [E007]`);
  }
  try {
    class TestWrongGetSetType {
      // @ts-expect-error expect error because "get" only accepts functions
      @prop({ set: () => undefined, get: false })
      public test: string;
    }

    buildSchema(TestWrongGetSetType);
    fail('Expected to throw "TypeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
    expect((err as TypeError).message).toEqual(`"TestWrongGetSetType.test" does not have a get function! [E007]`);
  }
});

it('should error if not all needed parameters for virtual-populate are given [NotAllElementsError]', () => {
  try {
    class TestNAEEVirtualPopulate {
      @prop({ localField: true })
      public test: string;
    }

    buildSchema(TestNAEEVirtualPopulate);
    fail('Expected to throw "NotAllElementsError"');
  } catch (err) {
    expect(err).toBeInstanceOf(errors.NotAllVPOPElementsError);
  }
});

it('should error if no valid model is supplied to "addModelToTypegoose" [TypeError]', () => {
  try {
    // @ts-expect-error expect error because "addModelToTypegoose" only accepts models
    addModelToTypegoose('hello');
    fail('Expected to throw "TypeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
  }
});

it('should not modify an immutable', async () => {
  logger.warn = jest.fn();

  class TestImmutable {
    @prop({ required: true, immutable: true })
    public someprop: Readonly<string>;
  }

  const TIModel = getModelForClass(TestImmutable);
  const doc = await TIModel.create({ someprop: 'Hello' } as TestImmutable);
  expect(doc).not.toBeUndefined();
  doc.someprop = 'Hello2';
  await doc.save();
  expect(doc.someprop).toEqual('Hello');
  expect((logger.warn as any).mock.calls.length).toEqual(1);
});

describe('tests for "NoValidClass"', () => {
  it('should error if no valid class is supplied to "addModelToTypegoose" [NoValidClass]', () => {
    try {
      // @ts-expect-error expect that the second argument should be an "class"
      addModelToTypegoose(model('hello', new Schema()), 'not class');
      fail('Expected to throw "NoValidClass"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.NoValidClassError);
    }
  });

  it('should error if no valid class is supplied to "buildSchema" [NoValidClass]', () => {
    try {
      // @ts-expect-error expect that the first argument should be an class
      buildSchema('hello');
      fail('Expected to throw "NoValidClass"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.NoValidClassError);
    }
  });

  it('should error if no valid class is supplied to "_buildSchema" [NoValidClass]', () => {
    try {
      // @ts-expect-error expect that the first argument should be an class
      _buildSchema('hello');
      fail('Expected to throw "NoValidClass"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.NoValidClassError);
    }
  });

  it('should error if no valid class is supplied to "getModelForClass" [NoValidClass]', () => {
    try {
      // @ts-expect-error expect that the first argument should be an class
      getModelForClass('hello');
      fail('Expected to throw "NoValidClass"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.NoValidClassError);
    }
  });

  it('should error if no valid class is supplied to "deleteModelWithClass" [NoValidClass]', () => {
    try {
      // @ts-expect-error expect that the first argument should be an class
      deleteModelWithClass(true);
      fail('Expected to throw "NoValidClass"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.NoValidClassError);
    }
  });

  it('should error if no valid class is supplied to "mergeSchemaOptions" [NoValidClass]', () => {
    try {
      // @ts-expect-error expect that the second argument should be an class
      mergeSchemaOptions({}, true);
      fail('Expected to throw "NoValidClass"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.NoValidClassError);
    }
  });

  it('should error if no valid class is supplied to "getDiscriminatorModelForClass" [NoValidClass]', () => {
    try {
      // @ts-expect-error expect that the second argument should be an class
      getDiscriminatorModelForClass(model('NoValidClassgetDiscriminatorModelForClass', {}), true);
      fail('Expected to throw "NoValidClass"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.NoValidClassError);
    }
  });
});

describe('tests for "InvalidTypeError"', () => {
  // test for @prop will return a "NoMetadataError", which is already tested above

  it('should error if no valid type is supplied to WhatIsIt.ARRAY [InvalidTypeError]', () => {
    try {
      class TestNoMetadataErrorAP {
        @prop({ type: undefined }, WhatIsIt.ARRAY)
        public something: undefined;
      }

      buildSchema(TestNoMetadataErrorAP);

      fail('Expected to throw "InvalidTypeError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.InvalidTypeError);
    }
  });

  it('should error if no valid type is supplied to WhatIsIt.MAP [InvalidTypeError]', () => {
    try {
      class TestNoMetadataErrorMP {
        @prop({ type: undefined }, WhatIsIt.MAP)
        public something: undefined;
      }

      buildSchema(TestNoMetadataErrorMP);

      fail('Expected to throw "InvalidTypeError"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.InvalidTypeError);
    }
  });
});

describe('tests for "assignMetadata"', () => {
  it('should error if no valid key is supplied [TypeError]', () => {
    try {
      class Dummy {}

      // @ts-expect-error expect that the first argument is in "DecoratorKeys"
      assignMetadata(true, {}, Dummy);
      fail('Expected to throw "TypeError"');
    } catch (err) {
      expect(err).toBeInstanceOf(TypeError);
      expect((err as TypeError).message).toEqual(`"true"(key) is not a string! (mergeMetadata)`);
    }
  });

  it('should error if no valid class is supplied [NoValidClass]', () => {
    try {
      // @ts-expect-error expect that the third argument is an class
      assignMetadata(DecoratorKeys.Index, {}, true);
      fail('Expected to throw "NoValidClass"');
    } catch (err) {
      expect(err).toBeInstanceOf(errors.NoValidClassError);
    }
  });
});

it('should throw an error if a self-contained class is used', () => {
  try {
    class TestSelfContained {
      @prop()
      public self: TestSelfContained;
    }

    buildSchema(TestSelfContained);

    fail('Expected to throw "Error"');
  } catch (err) {
    expect(err).not.toBeInstanceOf(AssertionError);
    expect(err).toBeInstanceOf(Error);
  }
});

it('should throw when "deleteModel" is called with no string [TypeError]', () => {
  try {
    // @ts-expect-error expect that the first argument should be an class
    deleteModel(true);
    fail('Expected to throw "TypeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
  }
});

it('should throw when "addModelToTypegoose" is called twice for the same class [Error]', () => {
  class TestDouble {}

  const gotmodel = getModelForClass(TestDouble);

  try {
    addModelToTypegoose(gotmodel, TestDouble);
    fail('Expected to throw "Error"');
  } catch (err) {
    expect(err).not.toBeInstanceOf(AssertionError);
    expect(err).toBeInstanceOf(Error);
  }
});

it('should throw when "customName" is used, but length <= 0 [TypeError]', () => {
  try {
    @modelOptions({ options: { customName: '' } })
    class TestCustomNameError {}
    getName(TestCustomNameError);
    fail('Expected to throw "TypeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
  }
});

it('should throw when "customName" is a function, but the return value is not a string or an empty string [TypeError]', () => {
  try {
    // @ts-expect-error expect that "customname" only accepts an "string"
    @modelOptions({ options: { customName: () => 1234 } })
    class TestCustomNameError2 {}
    getName(TestCustomNameError2);
    fail('Expected to throw "TypeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
  }
});

it('should error if the Type does not have a valid "OptionsConstructor" [TypeError]', () => {
  try {
    mapOptions({}, Error, undefined, 'undefined-pkey');

    fail('Expected to throw "TypeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
  }
});

it('should error if "refPath" is not of type string [TypeError]', () => {
  try {
    class TestRefPathError {
      // @ts-expect-error expect that "refPath" only accepts an "string"
      @prop({ refPath: 1 })
      public hello: string;
    }

    buildSchema(TestRefPathError);

    fail('Expected to throw "TypeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
  }
});

it('should error if "ref" is used with unknown WhatIsIt [TypeError]', () => {
  try {
    class TestRefSwitchError {
      @prop({ ref: 'hi' }, -1)
      public hello: string;
    }

    buildSchema(TestRefSwitchError);

    fail('Expected to throw "TypeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(InvalidWhatIsItError);
  }
});

it('should error if "refPath" is used with WhatIsIt.MAP [TypeError]', () => {
  try {
    class TestRefPathSwitchError {
      @prop({ refPath: 'hi' }, WhatIsIt.MAP)
      public hello: string;
    }

    buildSchema(TestRefPathSwitchError);

    fail('Expected to throw "TypeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
  }
});

it('should error if the options provide to "setGlobalOptions" are not an object [TypeError]', () => {
  try {
    setGlobalOptions(undefined as any);

    fail('Expected to throw "TypeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
  }
});

it('should error if trying to use circular classes [TypeError]', () => {
  try {
    class TestCircular {
      @prop()
      public hello: TestCircular;
    }

    buildSchema(TestCircular);

    fail('Expected to throw "TypeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
  }
});

it('should fail when using Number-Enum on an String Type [NotStringTypeError]', () => {
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
  }
});

it('should fail when using String-Enum on an Number Type [NotNumberTypeError]', () => {
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
  }
});

it('should error if no valid model is supplied to "getDiscriminatorModelForClass" [TypeError]', () => {
  try {
    // @ts-expect-error expect the first argument to be an model
    getDiscriminatorModelForClass(true);
    fail('Expected to throw "TypeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
  }
});

it('should error if no valid key is supplied to "getModelWithString" [TypeError]', () => {
  try {
    // @ts-expect-error expect the first argument to be an "string"
    getModelWithString(true);
    fail('Expected to throw "TypeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(TypeError);
  }
});

it('should error if a non-valid object is passed to "getClass" [ReferenceError]', () => {
  try {
    getClass(undefined);

    fail('Expected to throw "ReferenceError"');
  } catch (err) {
    expect(err).toBeInstanceOf(ReferenceError);
  }
});

it('should error if 0 or less dimensions are given (createArrayFromDimensions) [RangeError]', () => {
  try {
    createArrayFromDimensions({ dim: 0 }, { someThing: true }, '', '');

    fail('Expected to throw "RangeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(RangeError);
  }

  try {
    createArrayFromDimensions({ dim: -100 }, { someThing: true }, '', '');

    fail('Expected to throw "RangeError"');
  } catch (err) {
    expect(err).toBeInstanceOf(RangeError);
  }
});

it("should error if ref's arrow-function returning type returns undefined", async () => {
  class Nested {
    @prop()
    public someNestedProperty: string;
  }

  class Main {
    // @ts-expect-error expect that "ref" is an function and returns an "string"
    @prop({ ref: () => undefined })
    public nested: Ref<Nested>;
  }

  try {
    buildSchema(Main);

    fail('Expected to throw "Error"');
  } catch (err) {
    expect(err).not.toBeInstanceOf(AssertionError);
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toEqual('Option "ref" for "Main.nested" is null/undefined! [E005]');
  }
});

it('should error if ref is set but is "undefined/null"', () => {
  expect.assertions(2);
  try {
    class RefUndefined {
      @prop({ ref: undefined })
      public someref?: Ref<undefined>;
    }

    buildSchema(RefUndefined);

    fail('Expect to throw "Error"');
  } catch (err) {
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toEqual('Option "ref" for "RefUndefined.someref" is null/undefined! [E005]');
  }
});

it('should throw default error if no error is specified (assertion)', () => {
  expect.assertions(2);
  try {
    assertion(false);
  } catch (err) {
    expect(err).toBeInstanceOf(Error);
    expect(err.message).toEqual('Assert failed - no custom error [E019]');
  }
});
