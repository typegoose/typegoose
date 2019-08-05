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

function setNon(val: string) {
  return val.toLowerCase();
}

export class NonVirtual extends Typegoose {
  @prop({ set: setNon, default: 'hello_default' })
  public non: string;
}

export const virtualModel = getModelForClass(Virtual);
export const virtualSubModel = getModelForClass(VirtualSub);
export const nonVirtualModel = getModelForClass(NonVirtual);
