/// <reference types="mongoose" />
import 'reflect-metadata';
import * as mongoose from 'mongoose';
export * from './method';
export * from './prop';
export declare type InstanceType<T> = T & mongoose.Document;
export declare type ModelType<T> = mongoose.Model<InstanceType<T>> & T;
export declare class Typegoose {
    id: string;
    getModelForClass<T>(t: T, existingMongoose?: mongoose.Mongoose): mongoose.Model<InstanceType<this>> & this & T;
}
