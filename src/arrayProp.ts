import { schema } from './data';
import { isPrimitive, initAsArray } from './utils';

export const arrayProp = (type: any) => (target: any, key: string) => {
  const Type = type;
  const instance = new Type();

  const subSchema = schema[instance.constructor.name];
  if (!subSchema && !isPrimitive(Type)) {
    throw new Error(`${Type.name} is not a primitive type nor a Typegoose schema (Not extending it).`);
  }

  const name = target.constructor.name;
  initAsArray(name, key);

  if (isPrimitive(Type)) {
    schema[name][key][0] = {
      ...schema[name][key][0],
      type: Type,
    };
  } else {
    schema[name][key][0] = {
      ...schema[name][key][0],
      ...subSchema,
    };
  }
};