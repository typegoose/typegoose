export declare const pre: {
    <T>(method: string, parallel: boolean, fn: (this: T, next: (err?: Error) => void, done: () => void) => void, errorCb?: (err: Error) => void): (constructor: any) => void;
    <T>(method: string, fn: (this: T, next: (err?: Error) => void, done: () => void) => void, errorCb?: (err: Error) => void): (constructor: any) => void;
};
