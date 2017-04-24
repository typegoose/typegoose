import { Typegoose } from '../../typegoose';
export declare class Job extends Typegoose {
    title?: string;
    position?: string;
    startedAt: Date;
}
