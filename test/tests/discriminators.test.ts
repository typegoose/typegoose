import { expect } from 'chai';
import { mongoose } from '../../src/typegoose';
import { DocumentType } from '../../src/types';
import { Default, DefaultModel, DefaultProfile, DisciminatedUser, DisciminatedUserModel, ROLE } from '../models/discriminators2';

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 */
export function suite() {
  it('should set fields based on role disciminator & ignore other fields', async () => {
    const instance: DocumentType<DisciminatedUser<DefaultProfile> & Default> = await DisciminatedUserModel.create({
      role: ROLE.DEFAULT,
      visitor: 'sth',
      default: 'sth',
      profile: { test: 'sth', lastName: 'sth' }
    } as DisciminatedUser<DefaultProfile> & Default);
    console.log('instance', instance);
    console.log('schema', instance.schema);
    expect(instance.schema.path('profile')).to.not.be.an.instanceOf(mongoose.Schema.Types.Mixed);
    expect((instance as any).visitor).to.equals(undefined);
    expect(instance.default).to.equals('sth');
    expect((instance.profile as any).test).to.equals(undefined);
    expect(instance.profile.lastName).to.equals('sth');
  });

  it('should work properly when using the discriminatorModel explicitly', async () => {
    const instance = await DefaultModel.create({
      visitor: 'sth',
      default: 'sth',
      profile: { test: 'sth', lastName: 'sth' }
    } as Default);
    expect(instance.schema.path('profile')).to.not.be.an.instanceOf(mongoose.Schema.Types.Mixed);
    expect(instance.role).to.equals(ROLE.DEFAULT);
    expect((instance as any).visitor).to.equals(undefined);
    expect(instance.default).to.equals('sth');
    expect((instance.profile as any).test).to.equals(undefined);
    expect(instance.profile.lastName).to.equals('sth');
  });
}
