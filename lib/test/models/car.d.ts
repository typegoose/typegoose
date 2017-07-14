/// <reference types="mongoose" />
import * as mongoose from 'mongoose';
import { Typegoose } from '../../typegoose';
export declare class Car extends Typegoose {
    model: string;
    isSedan?: boolean;
}
export declare const model: mongoose.Model<Car & mongoose.Document> & Car & typeof Car;
