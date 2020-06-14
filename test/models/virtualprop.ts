import { getModelForClass, prop, Ref } from '../../src/typegoose';

export class Virtual {
  @prop({ required: true })
  public dummyVirtual?: string;

  @prop({ ref: () => VirtualSub, foreignField: 'virtual', localField: '_id', justOne: false })
  public virtualSubs?: Ref<VirtualSub>[];
}

export class VirtualSub {
  @prop({ required: true, ref: Virtual })
  public virtual!: Ref<Virtual>;

  @prop({ required: true })
  public dummy!: string;
}

export class NonVirtual {
  @prop({ set: (val: string) => val.toLowerCase(), get: (val: string) => val, default: 'hello_default' })
  public non?: string;
}

export class NonVirtualGS {
  @prop({ set: (val: string[]) => val.join(' '), get: (val: string) => val.split(' '), type: String })
  public non?: string[];
}

export const VirtualModel = getModelForClass(Virtual);
export const VirtualSubModel = getModelForClass(VirtualSub);
export const NonVirtualModel = getModelForClass(NonVirtual);
export const NonVirtualGSModel = getModelForClass(NonVirtualGS);
