/// <reference types="mongoose" />
import { MongooseDocument } from 'mongoose';
export declare const pre: {
    <T>(method: "init" | "validate" | "save" | "remove", fn: (this: T & MongooseDocument, next: (err?: Error) => void) => void): (constructor: any) => void;
    <T>(method: "init" | "validate" | "save" | "remove", parallel: boolean, fn: (this: T & MongooseDocument, next: (err?: Error) => void, done: () => void) => void): (constructor: any) => void;
    <T>(method: "count" | "find" | "findOne" | "findOneAndRemove" | "findOneAndUpdate" | "update" | "insertMany", fn: (next: (err?: Error) => void) => void): (constructor: any) => void;
    <T>(method: "count" | "find" | "findOne" | "findOneAndRemove" | "findOneAndUpdate" | "update" | "insertMany", parallel: boolean, fn: (next: (err?: Error) => void, done: () => void) => void): (constructor: any) => void;
};
export declare const post: {
    <T>(method: "count", fn: (result: number, next?: (err?: Error) => void) => void): (constructor: any) => void;
    <T>(method: "count", fn: (error: Error, result: number, next: (err?: Error) => void) => void): (constructor: any) => void;
    <T>(method: "init" | "validate" | "save" | "remove" | "findOne" | "findOneAndRemove" | "findOneAndUpdate", fn: (result: T & MongooseDocument, next?: (err?: Error) => void) => void): (constructor: any) => void;
    <T>(method: "init" | "validate" | "save" | "remove" | "findOne" | "findOneAndRemove" | "findOneAndUpdate", fn: (error: Error, result: T & MongooseDocument, next: (err?: Error) => void) => void): (constructor: any) => void;
    <T>(method: "find" | "update", fn: (result: (T & MongooseDocument)[], next?: (err?: Error) => void) => void): (constructor: any) => void;
    <T>(method: "find" | "update", fn: (error: Error, result: (T & MongooseDocument)[], net: (err?: Error) => void) => void): (constructor: any) => void;
    <T>(method: "insertMany", fn: ((result: any, next?: (err?: Error) => void) => void) | ((result: (T & MongooseDocument)[], next?: (err?: Error) => void) => void)): (constructor: any) => void;
};
