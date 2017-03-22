import * as mongoose from 'mongoose';

import { Typegoose, prop, subdocProp, refProp, Ref, required, enumProp } from '../../typegoose';
import { Job } from './job';
import { Car } from './car';
import { Gender, Genders } from '../enums/genders';

export class User extends Typegoose {
  @prop
  @required
  name: string;

  @prop
  age?: number;

  @enumProp(Genders)
  @required
  gender: Gender;

  @subdocProp
  job: Job;

  @refProp(Car)
  car: Ref<Car>;
}

export const model = new User()._getModel();