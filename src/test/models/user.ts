import * as mongoose from 'mongoose';

import { Typegoose, prop, subdoc, ref, Ref, required, enumeration } from '../../typegoose';
import { Job } from './job';
import { Car } from './car';
import { Gender, Genders } from '../enums/genders';

export class User extends Typegoose {
  @prop
  @required
  name: string;

  @prop
  age?: number;

  @enumeration(Genders)
  @required
  gender: Gender;

  @subdoc
  job: Job;

  @ref(Car)
  car: Ref<Car>;
}

export const model = new User()._getModel();