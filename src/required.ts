import { schema } from './data';
import { initAsObject, initAsArray, isArray } from './utils';

export const required = (target: any, key: string) => {
  const type = Reflect.getMetadata('design:type', target, key);

  const name = target.constructor.name;
  if (isArray(type)) {
    initAsArray(name, key);
    schema[name][key][0] = {
      ...schema[name][key][0],
      required: true,
    };
  } else {
    initAsObject(name, key);
    schema[name][key] = {
      ...schema[name][key],
      required: true,
    };
  }
};