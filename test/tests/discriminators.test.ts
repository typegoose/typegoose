import { expect } from 'chai';
import { DocumentType } from '../../src/types';
import { Default, DefaultModel, DisciminatedUser, DisciminatedUserModel, ROLE } from '../models/discriminators2';

export function suite() {
  it('should set fields based on role disciminator & ignore other fields', async () => {
    const instance: DocumentType<DisciminatedUser> = await DisciminatedUserModel.create({
      role: ROLE.DEFAULT,
      visitor: 'sth',
      default: 'sth',
      profile: { test: 'sth', lastName: 'sth' }
    } as DisciminatedUser);
    expect((instance as any).visitor).to.equals(undefined);
    // why default? this shouldnt exists on the model - at least i cant find it where it would be defined
    expect(instance.default).to.equals('sth');
    expect((instance.profile as any).test).to.equals(undefined);
    // same here, "lastName" is not defined on the "Profile" Model, and the "DefaultProfile" was nowhere defined to be used
    expect(instance.profile.lastName).to.equals('sth');
  });

  it('should work properly when using the discriminatorModel explicitly', async () => {
    const instance = await DefaultModel.create({
      visitor: 'sth',
      default: 'sth',
      profile: { test: 'sth', lastName: 'sth' }
    } as Default);
    expect(instance.role).to.equals(ROLE.DEFAULT);
    expect((instance as any).visitor).to.equals(undefined);
    expect(instance.default).to.equals('sth');
    expect((instance.profile as any).test).to.equals(undefined);
    expect(instance.profile.lastName).to.equals('sth');
  });
}
