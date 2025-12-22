import { getDiscriminatorModelForClass, getModelForClass, modelOptions, prop } from '../../src/typegoose';

export enum ROLE {
  VISITOR = 'VISITOR',
  DEFAULT = 'DEFAULT',
}

export class Profile {
  @prop()
  public firstName?: string;
}

@modelOptions({
  schemaOptions: {
    collection: 'discriminated',
    discriminatorKey: 'role',
  },
})
export class DiscriminatedUser<T extends Profile = Profile> {
  @prop({ required: true, enum: ROLE })
  public role?: ROLE; // optional because it will be automatically added

  @prop({ type: Profile })
  public profile?: T;
}

export class Visitor extends DiscriminatedUser {
  @prop()
  public visitor?: string;
}

export class DefaultProfile extends Profile {
  @prop()
  public lastName?: string;
}

export class Default extends DiscriminatedUser<DefaultProfile> {
  @prop()
  public default?: string;

  @prop()
  declare public profile?: DefaultProfile;
}

export const DiscriminatedUserModel = getModelForClass(DiscriminatedUser);
export const VisitorModel = getDiscriminatorModelForClass(DiscriminatedUserModel, Visitor, ROLE.VISITOR);
export const DefaultModel = getDiscriminatorModelForClass(DiscriminatedUserModel, Default, ROLE.DEFAULT);
