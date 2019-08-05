import { arrayProp, getModelForClass, prop, Ref, Typegoose } from '../../src/typegoose';

export class UserRef extends Typegoose {
  @prop({ ref: UserRef, default: null })
  public master?: Ref<UserRef>;

  @arrayProp({ itemsRef: UserRef, default: [] })
  public subAccounts!: Ref<UserRef>[];

  @prop({ required: true })
  public name!: string;
}

export const UserRefModel = getModelForClass(UserRef);
