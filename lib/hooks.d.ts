export declare const pre: {
    <T>(method: "init" | "validate" | "save" | "remove", parallel: boolean, fn: (this: T, next: (err?: Error) => void, done: () => void) => void, errorCb?: (err: Error) => void): (constructor: any) => void;
    <T>(method: "init" | "validate" | "save" | "remove", fn: (this: T, next: (err?: Error) => void, done: () => void) => void, errorCb?: (err: Error) => void): (constructor: any) => void;
};
export declare const post: <T>(method: "init" | "validate" | "save" | "remove", fn: ((doc: T, next: (err?: Error) => void) => void) | ((error: Error, doc: T, next: (err?: Error) => void) => void)) => (constructor: any) => void;
