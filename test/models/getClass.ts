import { getModelForClass, prop } from '../../src/typegoose.js';

export class GetClassTestSub {
  @prop()
  public subprop?: string;
}

export class GetClassTestParent {
  @prop()
  public nested?: GetClassTestSub;
}

export const GetClassTestParentModel = getModelForClass(GetClassTestParent);
