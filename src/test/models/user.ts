import * as findOrCreate from 'mongoose-findorcreate';
import {
  arrayProp,
  instanceMethod,
  InstanceType,
  ModelType,
  plugin,
  prop,
  Ref,
  staticMethod,
  Typegoose,
} from '../../typegoose';
import { Genders } from '../enums/genders';
import { Role } from '../enums/role';
import { Car } from './car';
import { Job } from './job';

export interface FindOrCreateResult<T> {
  created: boolean;
  doc: InstanceType<T>;
}

@plugin(findOrCreate)
export class User extends Typegoose {
  @prop({ required: true })
  public firstName: string;

  @prop({ required: true })
  public lastName: string;

  @prop()
  public get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  public set fullName(full) {
    const split = full.split(' ');
    this.firstName = split[0];
    this.lastName = split[1];
  }

  @prop({ default: 'Nothing' })
  public nick?: string;

  @prop({ index: true, unique: true })
  public uniqueId?: string;

  @prop({ unique: true, sparse: true })
  public username?: string;

  @prop({ expires: '24h' })
  public expireAt?: Date;

  @prop({ min: 10, max: 21 })
  public age?: number;

  @prop({ enum: Genders, required: true })
  public gender: Genders;

  @prop({ enum: Role })
  public role: Role;

  @arrayProp({ items: String, enum: Role, default: Role.Guest })
  public roles: Role[];

  @prop()
  public job?: Job;

  @prop({ ref: Car })
  public car?: Ref<Car>;

  @arrayProp({ items: String, required: true })
  public languages: string[];

  @arrayProp({ items: Job })
  public previousJobs?: Job[];

  @arrayProp({ itemsRef: Car })
  public previousCars?: Ref<Car>[];

  @staticMethod
  public static findByAge(this: ModelType<User> & typeof User, age: number) {
    return this.findOne({ age });
  }

  @instanceMethod
  public incrementAge(this: InstanceType<User>) {
    const age = this.age || 1;
    this.age = age + 1;
    return this.save();
  }

  @instanceMethod
  public addLanguage(this: InstanceType<User>) {
    this.languages.push('Hungarian');

    return this.save();
  }

  @instanceMethod
  public addJob(this: InstanceType<User>, job: Partial<Job> = {}) {
    this.previousJobs.push(job);

    return this.save();
  }

  public static findOrCreate: (condition: any) => Promise<FindOrCreateResult<User>>;
}

export const model = new User().getModelForClass(User);
