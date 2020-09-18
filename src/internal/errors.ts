import { allVirtualoptions } from './utils';

export class InvalidTypeError extends Error {
  constructor(targetName: string, key: string, Type: unknown) {
    super(`"${targetName}.${key}"'s Type is invalid! Type is: "${Type}" [E009]`);
  }
}

export class NotNumberTypeError extends Error {
  constructor(targetName: string, key: string, enumKey: string, enumValue: string) {
    super(
      `Typeof "${targetName}.${key}" is "Number", value is undefined/null or does not have a reverse mapping! [E011]\n`
      + `  Encountered with property: ${enumKey}.${typeof enumValue}`
    );
  }
}

export class NotStringTypeError extends Error {
  constructor(targetName: string, key: string, enumKey: string, enumValue: string) {
    super(
      `Typeof "${targetName}.${key}" is "String", used enum is not only Strings! [E010]\n`
      + `  Encountered with property in Enum: ${enumKey}.${typeof enumValue}`
    );
  }
}

/** Not All Virtual Populate Elements Error */
export class NotAllVPOPElementsError extends Error {
  constructor(name: string, key: string) {
    super(`"${name}.${key}" has not all needed Virtual Populate Options! Needed are: ${allVirtualoptions.join(', ')} [E006]`);
  }
}

export class NoValidClass extends TypeError {
  constructor(cl: any) {
    super(`"${cl}" is not a function(/constructor)!`);
  }
}
