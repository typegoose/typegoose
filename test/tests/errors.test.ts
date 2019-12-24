import { AssertionError } from 'assert';
import { assert, expect } from 'chai';
import { model, Schema } from 'mongoose';

import { pre } from '../../src/hooks';
import { DecoratorKeys } from '../../src/internal/constants';
import {
  InvalidTypeError,
  NoMetadataError,
  NotAllVPOPElementsError,
  NotNumberTypeError,
  NotStringTypeError,
  NoValidClass
} from '../../src/internal/errors';
import { _buildSchema } from '../../src/internal/schema';
import { assignMetadata, getClass, getName, mapOptions, mergeSchemaOptions } from '../../src/internal/utils';
import { arrayProp, mapProp, prop } from '../../src/prop';
import {
  addModelToTypegoose,
  buildSchema,
  deleteModel,
  deleteModelWithClass,
  getDiscriminatorModelForClass,
  getModelForClass,
  getModelWithString,
  modelOptions,
  setGlobalOptions
} from '../../src/typegoose';

// disable "no-unused" for this file, because it tests for errors
// tslint:disable:no-unused

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 */
export function suite() {
  it('should error if type is not string and a transform is supplied [NotStringTypeError]', () => {
    try {
      class TestNSTETransform {
        @prop({ lowercase: true })
        public test: number;
      }
      getModelForClass(TestNSTETransform);
      assert.fail('Expected to throw "NotStringTypeError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(NotStringTypeError);
    }
  });

  it('should error if type is not string and a validate is supplied [NotStringTypeError]', () => {
    try {
      class TestNSTEValidate {
        @prop({ maxlength: 10 })
        public test: number;
      }
      getModelForClass(TestNSTEValidate);
      assert.fail('Expected to throw "NotStringTypeError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(NotStringTypeError);
    }
  });

  it('should error if type is not number and a validate is supplied [NotNumberTypeError]', () => {
    try {
      class TestNNTEValidate {
        @prop({ max: 10 })
        public test: string;
      }
      getModelForClass(TestNNTEValidate);
      assert.fail('Expected to throw "NotNumberTypeError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(NotNumberTypeError);
    }
  });

  it('should error if an non-existing(runtime) type is given [NoMetadataError]', () => {
    try {
      class TestNME {
        @prop()
        public test: undefined;
      }
      getModelForClass(TestNME);
      assert.fail('Expected to throw "NoMetadataError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(NoMetadataError);
    }
  });

  it('should error if no function for hooks is defined [TypeError]', () => {
    try {
      // ignore that it is not written right, it should be tested so
      // @ts-ignore
      @pre<Test>('')
      class TestNoFunctionHook {
        @prop()
        public test: string;
      }
      getModelForClass(TestNoFunctionHook);
      assert.fail('Expected to throw "TypeError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(TypeError);
      expect((err as TypeError).message).to.be.equals(`"TestNoFunctionHook.pre."'s function is not a function!`);
    }
  });

  it('should error if no get or set function is defined for non-virtuals [TypeError]', () => {
    try {
      class TestNoGetNoSet {
        // @ts-ignore
        @prop({ set: false })
        public test: string;
      }
      getModelForClass(TestNoGetNoSet);
      assert.fail('Expected to throw "TypeError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(TypeError);
      expect((err as TypeError).message).to.be.equals(`"TestNoGetNoSet.test" does not have a set function!`);
    }
    try {
      class TestWrongGetSetType {
        // @ts-ignore
        @prop({ set: () => undefined, get: false })
        public test: string;
      }
      getModelForClass(TestWrongGetSetType);
      assert.fail('Expected to throw "TypeError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(TypeError);
      expect((err as TypeError).message).to.be.equals(`"TestWrongGetSetType.test" does not have a get function!`);
    }
  });

  it('should error if not all needed parameters for virtual-populate are given [NotAllElementsError]', () => {
    try {
      class TestNAEEVirtualPopulate {
        @prop({ localField: true })
        public test: string;
      }
      getModelForClass(TestNAEEVirtualPopulate);
      assert.fail('Expected to throw "NotAllElementsError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(NotAllVPOPElementsError);
    }
  });

  it('should error if no valid model is supplied to "addModelToTypegoose" [TypeError]', () => {
    try {
      // @ts-ignore
      addModelToTypegoose('hello');
      assert.fail('Expected to throw "TypeError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(TypeError);
    }
  });

  it('should not modify an immutable', async () => {
    class TestImmutable {
      @prop({ required: true, immutable: true })
      public someprop: Readonly<string>;
    }

    const TIModel = getModelForClass(TestImmutable);
    const doc = await TIModel.create({ someprop: 'Hello' } as TestImmutable);
    expect(doc).to.not.be.an('undefined');
    doc.someprop = 'Hello2';
    await doc.save();
    expect(doc.someprop).to.be.equals('Hello');
  });

  describe('tests for "NoValidClass"', () => {
    it('should error if no valid class is supplied to "addModelToTypegoose" [NoValidClass]', () => {
      try {
        // @ts-ignore
        addModelToTypegoose(model('hello', new Schema()), 'not class');
        assert.fail('Expected to throw "NoValidClass"');
      } catch (err) {
        expect(err).to.be.an.instanceOf(NoValidClass);
      }
    });

    it('should error if no valid class is supplied to "buildSchema" [NoValidClass]', () => {
      try {
        // @ts-ignore
        buildSchema('hello');
        assert.fail('Expected to throw "NoValidClass"');
      } catch (err) {
        expect(err).to.be.an.instanceOf(NoValidClass);
      }
    });

    it('should error if no valid class is supplied to "_buildSchema" [NoValidClass]', () => {
      try {
        // @ts-ignore
        _buildSchema('hello');
        assert.fail('Expected to throw "NoValidClass"');
      } catch (err) {
        expect(err).to.be.an.instanceOf(NoValidClass);
      }
    });

    it('should error if no valid class is supplied to "getModelForClass" [NoValidClass]', () => {
      try {
        // @ts-ignore
        getModelForClass('hello');
        assert.fail('Expected to throw "NoValidClass"');
      } catch (err) {
        expect(err).to.be.an.instanceOf(NoValidClass);
      }
    });

    it('should error if no valid class is supplied to "deleteModelWithClass" [NoValidClass]', () => {
      try {
        // @ts-ignore
        deleteModelWithClass(true);
        assert.fail('Expected to throw "NoValidClass"');
      } catch (err) {
        expect(err).to.be.an.instanceOf(NoValidClass);
      }
    });

    it('should error if no valid class is supplied to "mergeSchemaOptions" [NoValidClass]', () => {
      try {
        // @ts-ignore
        mergeSchemaOptions({}, true);
        assert.fail('Expected to throw "NoValidClass"');
      } catch (err) {
        expect(err).to.be.an.instanceOf(NoValidClass);
      }
    });

    it('should error if no valid class is supplied to "getDiscriminatorModelForClass" [NoValidClass]', () => {
      try {
        // @ts-ignore
        getDiscriminatorModelForClass(model('NoValidClassgetDiscriminatorModelForClass', {}), true);
        assert.fail('Expected to throw "NoValidClass"');
      } catch (err) {
        expect(err).to.be.an.instanceOf(NoValidClass);
      }
    });
  });

  describe('tests for "InvalidTypeError"', () => {
    // test for @prop will return a "NoMetadataError", which is already tested above

    it('should error if no valid type is supplied to "@arrayProp" [InvalidTypeError]', () => {
      try {
        class TestInvalidTypeErrorAP {
          @arrayProp({ items: undefined })
          public something: undefined;
        }
        getModelForClass(TestInvalidTypeErrorAP);
        assert.fail('Expected to throw "InvalidTypeError"');
      } catch (err) {
        expect(err).to.be.an.instanceOf(InvalidTypeError);
      }
    });

    it('should error if no valid type is supplied to "@mapProp" [InvalidTypeError]', () => {
      try {
        class TestInvalidTypeErrorMP {
          @mapProp({ of: undefined })
          public something: undefined;
        }
        getModelForClass(TestInvalidTypeErrorMP);
        assert.fail('Expected to throw "InvalidTypeError"');
      } catch (err) {
        expect(err).to.be.an.instanceOf(InvalidTypeError);
      }
    });
  });

  describe('tests for "assignMetadata"', () => {
    it('should error if no valid key is supplied [TypeError]', () => {
      try {
        class Dummy { }
        // @ts-ignore
        assignMetadata(true, {}, Dummy);
        assert.fail('Expected to throw "TypeError"');
      } catch (err) {
        expect(err).to.be.an.instanceOf(TypeError);
        expect((err as TypeError).message).to.be.equals(`"true"(key) is not a string! (assignMetadata)`);
      }
    });

    it('should error if no valid class is supplied [NoValidClass]', () => {
      try {
        // @ts-ignore
        assignMetadata(DecoratorKeys.Index, {}, true);
        assert.fail('Expected to throw "NoValidClass"');
      } catch (err) {
        expect(err).to.be.an.instanceOf(NoValidClass);
      }
    });
  });

  it('should throw an error if a self-contained class is used', () => {
    try {
      class TestSelfContained {
        @prop()
        public self: TestSelfContained;
      }
      assert.fail('Expected to throw "Error"');
    } catch (err) {
      expect(err).to.not.be.an.instanceOf(AssertionError);
      expect(err).to.be.an.instanceOf(Error);
    }
  });

  it('should throw when "deleteModel" is called with no string [TypeError]', () => {
    try {
      // @ts-ignore
      deleteModel(true);
      assert.fail('Expected to throw "TypeError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(TypeError);
    }
  });

  it('should throw when "addModelToTypegoose" is called twice for the same class [Error]', () => {
    class TestDouble { }

    const gotmodel = getModelForClass(TestDouble);

    try {
      addModelToTypegoose(gotmodel, TestDouble);
      assert.fail('Expected to throw "Error"');
    } catch (err) {
      expect(err).to.not.be.an.instanceOf(AssertionError);
      expect(err).to.be.an.instanceOf(Error);
    }
  });

  it('should throw when "customName" is used, but length <= 0 [TypeError]', () => {
    try {
      @modelOptions({ options: { customName: '' } })
      class TestCustomNameError { }
      getName(TestCustomNameError);
      assert.fail('Expected to throw "TypeError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(TypeError);
    }
  });

  it('should error if the Type does not have a valid "OptionsConstructor" [TypeError]', () => {
    try {
      mapOptions({}, Error, undefined, undefined, true);

      assert.fail('Expected to throw "TypeError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(TypeError);
    }
  });

  it('should error if "refPath" is not of type string [TypeError]', () => {
    try {
      class TestRefPathError {
        // @ts-ignore
        @prop({ refPath: 1 })
        public hello: string;
      }

      buildSchema(TestRefPathError);

      assert.fail('Expected to throw "TypeError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(TypeError);
    }
  });

  it('should error if "ref" is used with @mapProp [TypeError]', () => {
    try {
      class TestRefSwitchError {
        @mapProp({ ref: 'hi' })
        public hello: string;
      }

      buildSchema(TestRefSwitchError);

      assert.fail('Expected to throw "TypeError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(TypeError);
    }
  });

  it('should error if "refPath" is used with @mapProp [TypeError]', () => {
    try {
      class TestRefPathSwitchError {
        @mapProp({ refPath: 'hi' })
        public hello: string;
      }

      buildSchema(TestRefPathSwitchError);

      assert.fail('Expected to throw "TypeError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(TypeError);
    }
  });

  it('should error if the options provide to "setGlobalOptions" are not an object [TypeError]', () => {
    try {
      setGlobalOptions(undefined);

      assert.fail('Expected to throw "TypeError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(TypeError);
    }
  });

  it('should error if trying to use circular classes [TypeError]', () => {
    try {
      class TestCircular {
        @prop()
        public hello: TestCircular;
      }

      buildSchema(TestCircular);

      assert.fail('Expected to throw "TypeError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(TypeError);
    }
  });

  it('should fail when using Number-Enum on an String Type [NotStringTypeError]', () => {
    try {
      enum NumberEnum {
        One = 0,
        Two = 1
      }

      class NumberEnumOnStringType {
        @prop({ enum: NumberEnum })
        public someEnum: string;
      }

      getModelForClass(NumberEnumOnStringType);

      assert.fail('Expected to throw "NotStringTypeError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(NotStringTypeError);
    }
  });

  it('should fail when using String-Enum on an Number Type [NotNumberTypeError]', () => {
    try {
      enum StringEnum {
        One = 'hi1',
        Two = 'hi2'
      }

      class NumberEnumOnStringType {
        @prop({ enum: StringEnum })
        public someEnum: number;
      }

      getModelForClass(NumberEnumOnStringType);

      assert.fail('Expected to throw "NotNumberTypeError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(NotNumberTypeError);
    }
  });

  it('should error if no valid model is supplied to "getDiscriminatorModelForClass" [TypeError]', () => {
    try {
      // @ts-ignore
      getDiscriminatorModelForClass(true);
      assert.fail('Expected to throw "TypeError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(TypeError);
    }
  });

  it('should error if no valid key is supplied to "getModelWithString" [TypeError]', () => {
    try {
      // @ts-ignore
      getModelWithString(true);
      assert.fail('Expected to throw "TypeError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(TypeError);
    }
  });

  it('should error if a non-valid object is passed to "getClass" [ReferenceError]', () => {
    try {
      getClass(undefined);

      assert.fail('Expected to throw "ReferenceError"');
    } catch (err) {
      expect(err).to.be.an.instanceOf(ReferenceError);
    }
  });
}
