import * as mongoose from 'mongoose';
import * as _ from 'lodash';
// tslint:disable-next-line:no-var-requires
const findOrCreate = require('mongoose-findorcreate');

import { Job } from './job';
import { Car } from './car';
import { Gender, Genders } from '../enums/genders';
import { Role } from '../enums/role';
import {
  Ref,
  prop,
  arrayProp,
  Typegoose,
  ModelType,
  InstanceType,
  staticMethod,
  instanceMethod,
  post,
  plugin,
} from '../../typegoose';

export interface FindOrCreateResult<T> {
  created: boolean;
  doc: InstanceType<T>;
}

@plugin(findOrCreate)
export class User extends Typegoose {
  @prop({ required: true })
  firstName: string;

  @prop({ required: true })
  lastName: string;

  @prop()
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  set fullName(full) {
    const split = full.split(' ');
    this.firstName = split[0];
    this.lastName = split[1];
  }

  @prop({ default: 'Nothing' })
  nick?: string;

  @prop({ index: true, unique: true })
  uniqueId?: string;

  @prop({ unique: true, sparse: true })
  username?: string;

  @prop({ expires: '24h' })
  expireAt?: Date;

  @prop({ min: 10, max: 21 })
  age?: number;

  @prop({ enum: _.values(Genders), required: true })
  gender: Gender;

  @prop({ enum: Role })
  role: Role;

  @prop()
  job?: Job;

  @prop({ ref: Car })
  car?: Ref<Car>;

  @arrayProp({ items: String, required: true })
  languages: string[];

  @arrayProp({ items: Job })
  previousJobs?: Job[];

  @arrayProp({ itemsRef: Car })
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

  @instanceMethod
  addLanguage(this: InstanceType<User>) {
    this.languages.push('Hungarian');

    return this.save();
  }

  @instanceMethod
  addJob(this: InstanceType<User>, job: Partial<Job> = {}) {
    this.previousJobs.push(job);

    return this.save();
  }

  static findOrCreate: (condition: any) => Promise<FindOrCreateResult<User>>;
}

export const model = new User().getModelForClass(User);
