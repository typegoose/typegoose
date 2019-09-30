import { getModelForClass, prop } from '../../src/typegoose';

export class GetSet {
  @prop({ required: true })
  public actualProp!: string;

  public get some() {
    return this.actualProp;
  }
  public set some(v: string) {
    this.actualProp = v;
  }
}

export const GetSetModel = getModelForClass(GetSet);
