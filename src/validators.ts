import { schema } from './data';
import { isNumber, initAsObject, isString } from './utils';
import { NotNumberTypeError, NotStringTypeError } from './errors';

interface ValidateNumberOptions {
  min?: number | [number, string];
  max?: number | [number, string];
}

interface ValidateStringOptions {
  minlength?: number | [number, string];
  maxlength?: number | [number, string];
  match?: RegExp | [RegExp, string];
}

export const validate = {
  number: (options: ValidateNumberOptions) => (target: any, key: string) => {
    const type = Reflect.getMetadata('design:type', target, key);
    if (!isNumber(type)) {
      throw new NotNumberTypeError(key);
    }
    return validator(options, type, target, key);
  },
  string: (options: ValidateStringOptions) => (target: any, key: string) => {
    const type = Reflect.getMetadata('design:type', target, key);
    if (!isString(type)) {
      throw new NotStringTypeError(key);
    }
    return validator(options, type, target, key);
  },
};

const validator = (options, type, target, key) => {
  const name = target.constructor.name;
  initAsObject(name, key);
  schema[name][key] = {
    ...schema[name][key],
    ...options,
  };
};
