/// <reference types="mongoose" />
import * as mongoose from 'mongoose';
import { Typegoose } from '../../typegoose';
export declare class Dummy extends Typegoose {
    text: string;
}
export declare const model: mongoose.Model<Dummy & mongoose.Document> & Dummy & typeof Dummy;
