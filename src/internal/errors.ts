import { allVirtualoptions, toStringNoFail } from './utils';

// Note: dont forget to use "toStringNoFail" on values that are "unknown" or "any"

export class InvalidTypeError extends Error {
  constructor(targetName: string, key: string, Type: unknown) {
    super(`"${targetName}.${key}"'s Type is invalid! Type is: "${toStringNoFail(Type)}" [E009]`);
  }
}

export class NotNumberTypeError extends Error {
  constructor(targetName: string, key: string, enumKey: string, enumValue: string) {
    super(
      `Typeof "${targetName}.${key}" is "Number", value is undefined/null or does not have a reverse mapping! [E011]\n` +
        `  Encountered with property: "${enumKey}.${typeof enumValue}"`
    );
  }
}

export class NotStringTypeError extends Error {
  constructor(targetName: string, key: string, enumKey: string, enumValue: string) {
    super(
      `Typeof "${targetName}.${key}" is "String", used enum is not only Strings! [E010]\n` +
        `  Encountered with property in Enum: "${enumKey}.${typeof enumValue}"`
    );
  }
}

/** Not All Virtual Populate Elements Error */
export class NotAllVPOPElementsError extends Error {
  constructor(name: string, key: string) {
    super(`"${name}.${key}" has not all needed Virtual Populate Options! Needed are: ${allVirtualoptions.join(', ')} [E006]`);
  }
}

export class NoValidClassError extends TypeError {
  constructor(value: unknown) {
    super('Value is not a function or does not have a constructor! [E028]\n' + `Value: "${toStringNoFail(value)}"`);
  }
}

export class AssertionFallbackError extends Error {
  constructor() {
    super('Assert failed - no custom error [E019]');
  }
}

/** Error for when an unknown PropType is passed to an switch, gets thrown in the default case */
export class InvalidPropTypeError extends Error {
  constructor(proptype: unknown, name: string, key: string, where: string) {
    super(`"${toStringNoFail(proptype)}"(${where}) is invalid for "${name}.${key}" [E013]`);
  }
}

// For Backwards-compatability
/** @deprecated This was renamed to "InvalidPropTypeError" and will be removed in 10.0 */
export const InvalidWhatIsItError = InvalidPropTypeError;

export class CannotBeSymbolError extends Error {
  constructor(name: string, key: string | symbol) {
    super(`A property key in Typegoose cannot be an symbol! ("${name}.${toStringNoFail(key)}") [E024]`);
  }
}

export class SelfContainingClassError extends TypeError {
  constructor(name: string, key: string) {
    super(
      'It seems like the type used is the same as the target class, which is not supported\n' +
        `Please look at https://github.com/typegoose/typegoose/issues/42 for more information ("${name}.${key}") [E004]`
    );
  }
}

export class RefOptionIsUndefinedError extends Error {
  constructor(name: string, key: string) {
    super(`Prop-Option "ref"'s value is "null" or "undefined" for "${name}.${key}" [E005]`);
  }
}

export class NotValidModelError extends TypeError {
  constructor(model: unknown, where: string) {
    super(`Expected "${where}" to be a valid mongoose.Model! (got: "${toStringNoFail(model)}") [E025]`);
  }
}

export class FunctionCalledMoreThanSupportedError extends Error {
  constructor(functionName: string, supported: number, extra: string) {
    super(`Function "${functionName}" only supports to be called "${supported}" times with the same parameters [E003]\n${extra}`);
  }
}

export class StringLengthExpectedError extends TypeError {
  constructor(length: number, got: any, where: string, valueName: string) {
    // create the "got:" message, when string say it was a string, but not the length
    // if not string, then say it is not a string plus the value
    const gotMessage = typeof got === 'string' ? `(String: "${got.length}")` : `(not-String: "${toStringNoFail(got)}")`;

    super(`Expected "${valueName}" to have at least length of "${length}" (got: ${gotMessage}, where: "${where}") [E026]`);
  }
}

export class OptionDoesNotSupportOptionError extends TypeError {
  constructor(currentOption: string, problemOption: string, expected: string, provided: string) {
    super(
      `The Option "${currentOption}" does not support Option "${problemOption}" other than "${expected}" (provided was: "${provided}") [E027]`
    );
  }
}

export class ResolveTypegooseNameError extends ReferenceError {
  constructor(input: unknown) {
    super(
      'Input was not a string AND didnt have a .typegooseName function AND didnt have a .typegooseName string [E014]\n' +
        `Value: "${toStringNoFail(input)}"`
    );
  }
}

export class ExpectedTypeError extends TypeError {
  constructor(optionName: string, expected: string, got: unknown) {
    super(`Expected Argument "${optionName}" to have type "${expected}", got: "${toStringNoFail(got)}" [E029]`);
  }
}

export class InvalidEnumTypeError extends TypeError {
  constructor(name: string, key: string, value: unknown) {
    super(
      `Invalid Type used for options "enum" at "${name}.${key}"! [E012]\n` +
        `Type: "${toStringNoFail(value)}"\n` +
        'https://typegoose.github.io/typegoose/docs/guides/error-warning-details#invalid-type-for-enum-e012'
    );
  }
}

export class InvalidOptionsConstructorError extends TypeError {
  constructor(name: string, key: string, type: unknown) {
    super(`Type has a invalid "OptionsConstructor" on "${name}.${key}"! [E016]\n` + `Type: "${toStringNoFail(type)}"`);
  }
}

export class PathNotInSchemaError extends Error {
  constructor(name: string, key: string) {
    super(`Path "${key}" on "${name}" does not exist in the Schema! [E030]`);
  }
}

export class NoDiscriminatorFunctionError extends Error {
  constructor(name: string, key: string) {
    super(`Path "${name}.${key}" does not have a function called "discriminator"! (Nested Discriminator cannot be applied) [E031]`);
  }
}
