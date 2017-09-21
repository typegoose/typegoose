/// <reference types="mongoose" />
import * as mongoose from 'mongoose';
import { Typegoose } from '../../typegoose';
export declare class Hook extends Typegoose {
    material: string;
    shape?: string;
}
export declare const model: mongoose.Model<Hook & mongoose.Document> & Hook & typeof Hook;
