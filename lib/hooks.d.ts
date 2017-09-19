/// <reference types="mongoose" />
import { MongooseDocument } from 'mongoose';
export declare const pre: {
    <T>(method: "init" | "validate" | "save" | "remove", parallel: boolean, fn: (this: T & MongooseDocument, next: (err?: Error) => void, done: () => void) => void, errorCb?: (err: Error) => void): (constructor: any) => void;
    <T>(method: "init" | "validate" | "save" | "remove", fn: (this: T & MongooseDocument, next: (err?: Error) => void, done: () => void) => void, errorCb?: (err: Error) => void): (constructor: any) => void;
};
export declare const post: <T>(method: "init" | "validate" | "save" | "remove", fn: ((doc: T & MongooseDocument, next: (err?: Error) => void) => void) | ((error: Error, doc: T & MongooseDocument, next: (err?: Error) => void) => void)) => (constructor: any) => void;
