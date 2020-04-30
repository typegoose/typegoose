import { arrayProp, getModelForClass, mongoose, prop, Ref } from '../../src/typegoose';

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
  @arrayProp({ ref: IsRefTypeNestedString, items: String })
  public nestedString?: Ref<IsRefTypeNestedString>[];

  @arrayProp({ ref: IsRefTypeNestedString })
  public nestedObjectId?: Ref<IsRefTypeNestedObjectId>[];
}

export const IsRefTypeArrayModel = getModelForClass(IsRefTypeArray);
