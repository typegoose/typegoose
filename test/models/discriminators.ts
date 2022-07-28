import { getDiscriminatorModelForClass, getModelForClass, prop } from '../../src/typegoose.js';

export class DisMain {
  @prop({ required: true, default: 'hello main1' })
  public main1!: string;

  @prop({ default: undefined })
  public __t?: string;
}

export class DisAbove extends DisMain {
  @prop({ required: true, default: 'hello above1' })
  public above1!: string;

  @prop({ default: 'DisAbove' })
  public __t?: string;
}

export const DisMainModel = getModelForClass(DisMain);
export const DisAboveModel = getDiscriminatorModelForClass(DisMainModel, DisAbove);
