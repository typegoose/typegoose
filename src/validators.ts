import { schema } from './data';
import { isNumber, initAsObject } from './utils';
import { NotNumberTypeError } from './errors';

type MinMaxType = number | [number, string];

type ValidatorType = 'min' | 'max';

const minMaxBase = (options: MinMaxType, validatorType: ValidatorType) => (target: any, key: string) => {
  const type = Reflect.getMetadata('design:type', target, key);

  if (!isNumber(type)) {
    throw new NotNumberTypeError(key);
  }

  const name = target.constructor.name;
  initAsObject(name, key);
  schema[name][key] = {
    ...schema[name][key],
    [validatorType]: options,
  };
};

export const min = (options: MinMaxType) => minMaxBase(options, 'min');

export const max = (options: MinMaxType) => minMaxBase(options, 'max');