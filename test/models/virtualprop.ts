import { getModelForClass, prop, Ref, Typegoose } from '../../src/typegoose';

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

export class NonVirtual extends Typegoose {
  @prop({ set: (val: string) => val.toLowerCase(), get: (val: string) => val, default: 'hello_default' })
  public non: string;
}

export class NonVirtualGS {
  @prop({ set: (val: string[]) => val.join(' '), get: (val: string) => val.split(' ') })
  public non: string[];
}

export const VirtualModel = getModelForClass(Virtual);
export const VirtualSubModel = getModelForClass(VirtualSub);
export const NonVirtualModel = getModelForClass(NonVirtual);
export const NonVirtualGSModel = getModelForClass(NonVirtualGS);
