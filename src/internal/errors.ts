import { format } from 'util';
import { allVirtualoptions } from './utils';

export class InvalidPropError extends Error {
  constructor(targetName: string, key: string) {
    super(`Property "${targetName}.${key}" has no buildSchema!`);
  }
}

export class InvalidTypeError extends Error {
  constructor(targetName: string, key: string, Type: unknown) {
    super(`"${targetName}.${key}"'s Type is invalid! Type is: "${Type}"`);
  }
}

export class NotNumberTypeError extends Error {
  constructor(targetName: string, key: string, enumKey?: string, enumValue?: string) {
    if (enumKey || enumValue) {
      super(format(
        'Typeof "%s.%s" is "Number", value is undefined/null or does not have a reverse mapping!\n'
        + 'Encountered with property: %s.%s',
        targetName, key,
        enumKey, typeof enumValue
      ));
    } else {
      super(`Type of "${targetName}.${key}" property is not a number.`);
    }
  }
}

export class NotStringTypeError extends Error {
  constructor(targetName: string, key: string, enumKey?: string, enumValue?: string) {
    if (enumKey || enumValue) {
      super(format(
        'Typeof "%s.%s" is "String", enum is not only Strings!\n'
        + 'Encountered with property: %s.%s',
        targetName, key,
        enumKey, typeof enumValue
      ));
    } else {
      super(`Type of "${targetName}.${key}" property is not a string.`);
    }
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
