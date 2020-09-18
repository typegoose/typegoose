import { getModelForClass, prop } from '../../src/typegoose';

export class GetSet {
  @prop({ required: true })
  public actualProp!: string;

  public get someGetSet() {
    return this.actualProp;
  }
  public set someGetSet(v: string) {
    this.actualProp = v;
  }
}

export const GetSetModel = getModelForClass(GetSet);
