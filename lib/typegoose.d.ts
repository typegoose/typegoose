/// <reference types="mongoose" />
import 'reflect-metadata';
import * as mongoose from 'mongoose';
export * from './method';
export * from './prop';
export * from './hooks';
export * from './plugin';
export declare type InstanceType<T> = T & mongoose.Document;
export declare type ModelType<T> = mongoose.Model<InstanceType<T>> & T;
export interface GetModelForClassOptions {
    existingMongoose?: mongoose.Mongoose;
    schemaOptions?: mongoose.SchemaOptions;
}
export declare class Typegoose {
    id: string;
    getModelForClass<T>(t: T, {existingMongoose, schemaOptions}?: GetModelForClassOptions): mongoose.Model<InstanceType<this>> & this & T;
}
