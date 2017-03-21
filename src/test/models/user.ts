import * as mongoose from 'mongoose';

import { Typegoose, prop, subdoc, ref, Ref, required } from '../../typegoose';
import { Job } from './job';
import { Car } from './car';

export class User extends Typegoose {
  @prop
  @required
  name: string;

  @prop
  age?: number;

  @subdoc
  job: Job;

  @ref(Car)
  car: Ref<Car>;
}

export const model = new User()._getModel();