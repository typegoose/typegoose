import { schema } from './data';
import { isPrimitive, initAsObject } from './utils';

export const prop = (target: any, key: string) => {
  const Type = Reflect.getMetadata('design:type', target, key);
  const instance = new Type();

  const subSchema = schema[instance.constructor.name];
  if (!subSchema && !isPrimitive(Type)) {
    throw new Error(`${Type.name} is not a primitive type nor a Typegoose schema (Not extending it).`);
  }

  const name = target.constructor.name;
  initAsObject(name, key);

  if (isPrimitive(Type)) {
    schema[name][key] = {
      ...schema[name][key],
      type: Type,
    };
  } else {
    schema[name][key] = {
      ...schema[name][key],
      ...subSchema,
    };
  }
};