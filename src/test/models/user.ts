import * as mongoose from 'mongoose';

import { Typegoose, prop, refProp, Ref, required, enumProp, arrayProp } from '../../typegoose';
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

  @prop
  job: Job;

  @refProp(Car)
  car: Ref<Car>;

  @arrayProp(String)
  languages: string[];
}

export const model = new User()._getModel();