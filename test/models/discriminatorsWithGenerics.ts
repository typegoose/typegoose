import { getDiscriminatorModelForClass, getModelForClass, modelOptions, prop } from '../../src/typegoose';

export enum ROLE {
  VISITOR = 'VISITOR',
  DEFAULT = 'DEFAULT'
}

export class Profile {
  @prop()
  public firstName?: string;
}

@modelOptions({
  schemaOptions: {
    collection: 'discriminated',
    discriminatorKey: 'role'
  }
})
export class DisciminatedUser<T extends Profile = Profile> {
  @prop({ required: true, enum: ROLE })
  public role?: ROLE; // optional because it will be automatically added

  @prop({ type: Profile })
  public profile?: T;
}

export class Visitor extends DisciminatedUser {
  @prop()
  public visitor?: string;
}

export class DefaultProfile extends Profile {
  @prop()
  public lastName?: string;
}

export class Default extends DisciminatedUser<DefaultProfile> {
  @prop()
  public default?: string;

  @prop()
  public profile?: DefaultProfile;
}

export const DisciminatedUserModel = getModelForClass(DisciminatedUser);
export const VisitorModel = getDiscriminatorModelForClass(DisciminatedUserModel, Visitor, ROLE.VISITOR);
export const DefaultModel = getDiscriminatorModelForClass(DisciminatedUserModel, Default, ROLE.DEFAULT);
