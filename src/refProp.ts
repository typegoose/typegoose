import * as mongoose from 'mongoose';

import { schema } from './data';
import { initAsObject } from './utils';

export type Ref<T> = T | string;

export const refProp = (refModel: any) => (target: any, key: string) => {
  const name = target.constructor.name;
  initAsObject(name, key);

  schema[name][key] = {
    ...schema[name][key],
    type: mongoose.Schema.Types.ObjectId,
    ref: refModel.name,
  };
};
