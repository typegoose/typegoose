import * as _ from 'lodash';

import { schema } from './data';
import { initAsObject } from './utils';

export const enumProp = (enumeration: any) => (target: any, key: string) => {
  const name = target.constructor.name;
  initAsObject(name, key);
  schema[name][key] = {
    ...schema[name][key],
    type: String,
    enum: _.values(enumeration),
  };
};