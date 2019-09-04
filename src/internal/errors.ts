import { allVirtualoptions } from './utils';

export class InvalidPropError extends Error {
  constructor(typeName: string, key: string) {
    super(`In property ${key}: ${typeName} is not a primitive type nor a Typegoose schema (Not extending it).`);
  }
}

export class NotNumberTypeError extends Error {
  constructor(key: string) {
    super(`Type of ${key} property is not a number.`);
  }
}

export class NotStringTypeError extends Error {
  constructor(key: string) {
    super(`Type of ${key} property is not a string.`);
  }
}

export class NoMetadataError extends Error {
  constructor(key: string) {
    super(
      `There is no metadata for the "${key}" property.\n` +
      'Check if emitDecoratorMetadata is enabled in tsconfig.json ' +
      'or check if you\'ve declared a sub document\'s class after usage.'
    );
  }
}

/** Not All Virtual Populate Elements Error */
export class NotAllVPOPElementsError extends Error {
  constructor(name: string, key: string) {
    super(`"${name}.${key}" has not all needed Virtual Populate Options! Needed are: ${allVirtualoptions.join(', ')}`);
  }
}

export class NoValidClass extends TypeError {
  constructor(cl: any) {
    super(`"${cl}" is not a function(/constructor)!`);
  }
}
