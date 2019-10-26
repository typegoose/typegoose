import { expect } from 'chai';
import { mongoose } from '../../src/typegoose';
import { DocumentType } from '../../src/types';
import { Default, DefaultModel, DefaultProfile, DisciminatedUser, DisciminatedUserModel, ROLE, Visitor, VisitorModel } from '../models/discriminators2';

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 */
export function suite() {
  it('should use DefaultModel when setting role to "ROLE.DEFAULT"', async () => {
    const instance: DocumentType<Default> = await DisciminatedUserModel.create({
      role: ROLE.DEFAULT,
      visitor: 'sth',
      default: 'sth',
      profile: { test: 'sth', lastName: 'sth' }
    } as Default);
    // console.log('instance', instance);
    // console.log('schema', instance.schema);
    // console.log('modelName1', instance.constructor);
    expect(instance.constructor).to.equal(DefaultModel);
    expect(instance.schema.path('profile')).to.not.be.an.instanceOf(mongoose.Schema.Types.Mixed);
    expect((instance as any).visitor).to.equals(undefined);
    expect(instance.default).to.equals('sth');
    expect((instance.profile as any).test).to.equals(undefined);
    expect(instance.profile.lastName).to.equals('sth');
  });

  it('should work when using "DefaultModel" directly', async () => {
    const instance: DocumentType<Default> = await DefaultModel.create({
      visitor: 'sth',
      default: 'sth',
      profile: { test: 'sth', lastName: 'sth' }
    } as Default);
    expect(instance.constructor).to.equal(DefaultModel);
    expect(instance.schema.path('profile')).to.not.be.an.instanceOf(mongoose.Schema.Types.Mixed);
    // console.log('modelName2', instance.constructor);
    expect(instance.role).to.equals(ROLE.DEFAULT);
    expect((instance as any).visitor).to.equals(undefined);
    expect(instance.default).to.equals('sth');
    expect((instance.profile as any).test).to.equals(undefined);
    expect(instance.profile.lastName).to.equals('sth');
  });

  it('should use VisitorModel when setting role to "ROLE.VISITOR"', async () => {
    const instance: DocumentType<Visitor> = await DisciminatedUserModel.create({
      role: ROLE.VISITOR,
      visitor: 'sth',
      default: 'sth',
      profile: { test: 'sth', firstName: 'sth' }
    } as Visitor);
    expect(instance.constructor).to.equal(VisitorModel);
    expect(instance.schema.path('profile')).to.not.be.an.instanceOf(mongoose.Schema.Types.Mixed);
    // console.log('modelName3', instance.constructor);
    expect(instance.role).to.equals(ROLE.VISITOR);
    expect(instance.visitor).to.equals('sth');
    expect((instance as any).default).to.equals(undefined);
    expect((instance.profile as any).test).to.equals(undefined);
    expect((instance.profile as any).lastName).to.equals(undefined);
    expect(instance.profile.firstName).to.equals('sth');
  });
}
