/// <reference types="mongoose" />
import 'reflect-metadata';
import { Document, Model } from 'mongoose';
export * from './method';
export * from './prop';
export declare type InstanceType<T> = T & Document;
export declare type ModelType<T> = Model<InstanceType<T>> & T;
export declare class Typegoose {
    id: string;
    getModelForClass<T>(t: T): Model<InstanceType<this>> & this & T;
}
