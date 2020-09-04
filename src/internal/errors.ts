import { allVirtualoptions } from './utils';

export class InvalidTypeError extends Error {
  constructor(targetName: string, key: string, Type: unknown) {
    super(`"${targetName}.${key}"'s Type is invalid! Type is: "${Type}"`);
  }
}

export class NotNumberTypeError extends Error {
  constructor(targetName: string, key: string, enumKey?: string, enumValue?: string) {
    if (enumKey || enumValue) {
      super(
        `Typeof "${targetName}.${key}" is "Number", value is undefined/null or does not have a reverse mapping!\n`
        + `Encountered with property: ${enumKey}.${typeof enumValue}`
      );
    } else {
      super(`Type of "${targetName}.${key}" property is not a number.`);
    }
  }
}

export class NotStringTypeError extends Error {
  constructor(targetName: string, key: string, enumKey?: string, enumValue?: string) {
    if (enumKey || enumValue) {
      super(
        `Typeof "${targetName}.${key}" is "String", enum is not only Strings!\n`
        + `Encountered with property: ${enumKey}.${typeof enumValue}`
      );
    } else {
      super(`Type of "${targetName}.${key}" property is not a string.`);
    }
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
