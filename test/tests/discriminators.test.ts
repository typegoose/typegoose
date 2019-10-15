import { expect } from 'chai';
import { getDiscriminatorModelForClass, getModelForClass, prop, modelOptions } from '../../src/typegoose';

enum ROLE {
  VISITOR = 'VISITOR',
  DEFAULT = 'DEFAULT'
}

class Profile {
  @prop()
  public firstName: string;
}

@modelOptions({
  schemaOptions: {
    collection: 'blabla',
    discriminatorKey: 'role'
  }
})
class DisciminatedUser<T extends Profile = Profile> {
  @prop({ required: true, enum: ROLE })
  public role: ROLE;

  @prop()
  public profile: T;
}

const DisciminatedUserModel = getModelForClass(DisciminatedUser);

class Visitor {
  @prop()
  public visitor: string;
}

const VisitorModel = getDiscriminatorModelForClass(DisciminatedUserModel, Visitor, ROLE.VISITOR);

class DefaultProfile extends Profile {
  @prop()
  public lastName: string;
}

class Default extends DisciminatedUser<DefaultProfile> {
  @prop()
  public default: string;
}

const DefaultModel = getDiscriminatorModelForClass(DisciminatedUserModel, Default, ROLE.DEFAULT);

export function suite() {
  it('should set fields based on role disciminator & ignore other fields', async () => {
    const instance: any = await DisciminatedUserModel.create({
      role: ROLE.DEFAULT,
      visitor: 'sth',
      default: 'sth',
      profile: { test: 'sth', lastName: 'sth' }
    });
    expect(instance.visitor).to.equals(undefined);
    expect(instance.default).to.equals('sth');
    expect(instance.profile.test).to.equals(undefined);
    expect(instance.profile.lastName).to.equals('sth');
  });

  it('should work properly when using the discriminatorModel explicitly', async () => {
    const instance: any = await DefaultModel.create({
      visitor: 'sth',
      default: 'sth',
      profile: { test: 'sth', lastName: 'sth' }
    });
    expect(instance.role).to.equals(ROLE.DEFAULT);
    expect(instance.visitor).to.equals(undefined);
    expect(instance.default).to.equals('sth');
    expect(instance.profile.test).to.equals(undefined);
    expect(instance.profile.lastName).to.equals('sth');
  });
}
