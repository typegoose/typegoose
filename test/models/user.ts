import * as findOrCreate from 'mongoose-findorcreate';
import { isNullOrUndefined } from '../../src/internal/utils';
import { defaultClasses, DocumentType, getModelForClass, plugin, prop, Ref, ReturnModelType } from '../../src/typegoose';
import { Car } from './car';
import { Job } from './job';

export enum Genders {
  MALE = 'male',
  FEMALE = 'female'
}

export enum Role {
  Admin = 'admin',
  User = 'user',
  Guest = 'guest'
}

@plugin(findOrCreate)
export class User extends defaultClasses.FindOrCreate {
  @prop({ required: true })
  public firstName!: string;

  @prop({ required: true })
  public lastName!: string;

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
  public gender!: Genders;

  @prop({ enum: Role })
  public role?: Role;

  @prop({ type: String, enum: Role, default: [Role.Guest] })
  public roles?: Role[];

  @prop()
  public job?: Job;

  @prop({ ref: Car })
  public car?: Ref<Car>;

  @prop({ type: String, required: true })
  public languages!: string[];

  @prop({ type: Job, _id: false })
  public previousJobs?: Job[];

  @prop({ ref: Car })
  public previousCars?: Ref<Car>[];

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  public set fullName(full: string) {
    const split = full.split(' ');
    this.firstName = split[0];
    this.lastName = split[1];
  }

  public static async findByAge(this: ReturnModelType<typeof User>, age: number) {
    return this.findOne({ age }).exec();
  }

  public async incrementAge(this: DocumentType<User>) {
    const age = this?.age ?? 1;
    this.age = age + 1;

    return this.save();
  }

  public async addLanguage(this: DocumentType<User>) {
    this.languages.push('Hungarian');

    return this.save();
  }

  public async addJob(this: DocumentType<User>, job: Job = new Job()) {
    if (isNullOrUndefined(this.previousJobs)) {
      this.previousJobs = [];
    }

    this.previousJobs.push(job);

    return this.save();
  }
}

export const UserModel = getModelForClass(User);
