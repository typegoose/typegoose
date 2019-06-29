import { prop, Ref, Typegoose } from '../../typegoose';

export class Virtual extends Typegoose {
    @prop({ required: true })
    public dummyVirtual?: string;

    @prop({ ref: 'VirtualSub', foreignField: 'virtual', localField: '_id', justOne: false, overwrite: true })
    public get virtualSubs() { return undefined; }
}

export class VirtualSub extends Typegoose {
    @prop({ required: true, ref: Virtual })
    public virtual: Ref<Virtual>;

    @prop({ required: true })
    public dummy: string;
}
