import { getModelForClass, prop, Ref } from '../../src/typegoose';

export class UserRef {
  @prop({ ref: UserRef, default: null })
  public master?: Ref<UserRef>;

  @prop({ ref: UserRef, default: [] })
  public subAccounts!: Ref<UserRef>[];

  @prop({ required: true })
  public name!: string;
}

export const UserRefModel = getModelForClass(UserRef);
