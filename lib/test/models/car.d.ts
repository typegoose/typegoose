/// <reference types="mongoose" />
import { Typegoose } from '../../typegoose';
import * as mongoose from 'mongoose';
export declare class Car extends Typegoose {
    model: string;
}
export declare const model: mongoose.Model<Car & mongoose.Document> & Car & typeof Car;
