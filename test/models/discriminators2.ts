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
  public role?: ROLE; // made optional, because it will be automaticly added

  @prop()
  public profile?: T;
}

export class Visitor {
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
}

export const DisciminatedUserModel = getModelForClass(DisciminatedUser);
export const VisitorModel = getDiscriminatorModelForClass(DisciminatedUserModel, Visitor, ROLE.VISITOR);
export const DefaultModel = getDiscriminatorModelForClass(DisciminatedUserModel, Default, ROLE.DEFAULT);
