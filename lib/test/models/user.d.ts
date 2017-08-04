/// <reference types="mongoose" />
import * as mongoose from 'mongoose';
import { Job } from './job';
import { Car } from './car';
import { Gender } from '../enums/genders';
import { Ref, Typegoose, ModelType, InstanceType } from '../../typegoose';
export interface FindOrCreateResult<T> {
    created: boolean;
    doc: InstanceType<T>;
}
export declare class User extends Typegoose {
    firstName: string;
    lastName: string;
    fullName: string;
    nick?: string;
    age?: number;
    gender: Gender;
    job?: Job;
    car?: Ref<Car>;
    languages: string[];
    previousJobs?: Job[];
    previousCars?: Ref<Car>[];
    static findByAge(this: ModelType<User> & typeof User, age: number): mongoose.DocumentQuery<InstanceType<User>, InstanceType<User>>;
    incrementAge(this: InstanceType<User>): Promise<InstanceType<User>>;
    static findOrCreate: (condition: any) => Promise<FindOrCreateResult<User>>;
}
export declare const model: mongoose.Model<InstanceType<User>> & User & typeof User;
