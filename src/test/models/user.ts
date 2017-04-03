import * as mongoose from 'mongoose';

import { Job } from './job';
import { Car } from './car';
import { Gender, Genders } from '../enums/genders';
import {
  Ref,
  prop,
  refProp,
  required,
  enumProp,
  arrayProp,
  Typegoose,
  ModelType,
  InstanceType,
  refArrayProp,
  staticMethod,
  instanceMethod,
} from '../../typegoose';

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
  job?: Job;

  @refProp(Car)
  car: Ref<Car>;

  @required
  @arrayProp(String)
  languages: string[];

  @arrayProp(Job)
  previousJobs?: Job[];

  @refArrayProp(Car)
  previousCars?: Ref<Car>[];

  @staticMethod
  static findByAge(this: ModelType<User> & typeof User, age: number) {
    return this.findOne({ age });
  }

  @instanceMethod
  incrementAge(this: InstanceType<User>) {
    const age = this.age || 1;
    this.age = age + 1;
    return this.save();
  }
}

export const model = new User().getModelForClass(User);