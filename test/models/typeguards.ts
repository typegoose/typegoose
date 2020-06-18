import { WhatIsIt } from '../../src/internal/constants';
import { getModelForClass, mongoose, prop, Ref } from '../../src/typegoose';

export class IsRefTypeNestedString {
  @prop()
  public _id!: string;
}

export class IsRefTypeNestedObjectId {
  @prop()
  public _id!: mongoose.Schema.Types.ObjectId;
}

export class IsRefType {
  @prop({ ref: IsRefTypeNestedString, type: String })
  public nestedString?: Ref<IsRefTypeNestedString>;

  @prop({ ref: IsRefTypeNestedString })
  public nestedObjectId?: Ref<IsRefTypeNestedObjectId>;
}

export const IsRefTypeNestedObjectIdModel = getModelForClass(IsRefTypeNestedObjectId);
export const IsRefTypeNestedStringModel = getModelForClass(IsRefTypeNestedString);
export const IsRefTypeModel = getModelForClass(IsRefType);

export class IsRefTypeArray {
  @prop({ ref: IsRefTypeNestedString, type: String })
  public nestedString?: Ref<IsRefTypeNestedString>[];

  @prop({ ref: IsRefTypeNestedString })
  public nestedObjectId?: Ref<IsRefTypeNestedObjectId>[];
}

export const IsRefTypeArrayModel = getModelForClass(IsRefTypeArray);

export class Sub {
  @prop({ required: true })
  public someValue!: string;
}

export class MTypesArrayRef {
  @prop({ required: true, ref: () => Sub }, WhatIsIt.ARRAY)
  public subs!: mongoose.Types.Array<Ref<Sub>>;
}

export const SubModel = getModelForClass(Sub);
export const MTypesArrayRefModel = getModelForClass(MTypesArrayRef);

export class UserRef {
  @prop({ ref: UserRef, default: null })
  public master?: Ref<UserRef>;

  @prop({ ref: UserRef, default: [] })
  public subAccounts?: Ref<UserRef>[];

  @prop({ required: true })
  public name!: string;
}

export const UserRefModel = getModelForClass(UserRef);
