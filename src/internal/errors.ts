import { allVirtualoptions } from './utils';

export class InvalidTypeError extends Error {
  constructor(targetName: string, key: string, Type: unknown) {
    super(`"${targetName}.${key}"'s Type is invalid! Type is: "${Type}" [E009]`);
  }
}

export class NotNumberTypeError extends Error {
  constructor(targetName: string, key: string, enumKey: string, enumValue: string) {
    super(
      `Typeof "${targetName}.${key}" is "Number", value is undefined/null or does not have a reverse mapping! [E011]\n` +
        `  Encountered with property: ${enumKey}.${typeof enumValue}`
    );
  }
}

export class NotStringTypeError extends Error {
  constructor(targetName: string, key: string, enumKey: string, enumValue: string) {
    super(
      `Typeof "${targetName}.${key}" is "String", used enum is not only Strings! [E010]\n` +
        `  Encountered with property in Enum: ${enumKey}.${typeof enumValue}`
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
  constructor(cl: any) {
    super(`"${cl}" is not a function(/constructor)!`);
  }
}

export class AssertionFallbackError extends Error {
  constructor() {
    super('Assert failed - no custom error [E019]');
  }
}

/** Error for when an unknown WhatIsIt is passed to an switch, gets thrown in the default case */
export class InvalidWhatIsItError extends Error {
  constructor(whatisit: unknown, name: string, key: string, where: string) {
    super(`"${whatisit}"(${where}) is invalid for "${name}.${key}" [E013]`);
  }
}

export class CannotBeSymbol extends Error {
  constructor(name: string, key: string | symbol) {
    super(`A property key in Typegoose cannot be an symbol! (${name}.${String(key)}) [E024]`);
  }
}

export class SelfContainingClassError extends TypeError {
  constructor(name: string, key: string) {
    super(
      'It seems like the type used is the same as the target class, which is not supported\n' +
        `Please look at https://github.com/typegoose/typegoose/issues/42 for more information (${name}.${key}) [E004]`
    );
  }
}
