import { prop } from '../../src/prop';
import { getModelForClass } from '../../src/typegoose';

export class GetClassTestSub {
  @prop()
  public test: string;
}

export class GetClassTestParent {
  @prop()
  public testy: GetClassTestSub;
}

export const GetClassTestParentModel = getModelForClass(GetClassTestParent);
