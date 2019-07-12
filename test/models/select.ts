import { prop, Typegoose } from '../../src/typegoose';

export class Select extends Typegoose {
    @prop({ required: true, default: 'testing 1 should not be included', select: false })
    public test1!: string;

    @prop({ required: true, default: 'testing 2 should be included' })
    public test2!: string;

    @prop({ required: true, default: 'testing 3 should not be included', select: false })
    public test3!: string;
}

export const model = new Select().getModelForClass(Select);
