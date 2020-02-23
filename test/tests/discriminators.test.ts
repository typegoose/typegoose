import { expect } from 'chai';

import { DocumentType, getDiscriminatorModelForClass, getModelForClass, mongoose } from '../../src/typegoose';
import { DisAbove, DisAboveModel, DisMain, DisMainModel } from '../models/discriminators';
import { Default, DefaultModel, DisciminatedUserModel, ROLE, Visitor, VisitorModel } from '../models/discriminatorsWithGenerics';

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 */
export function suite() {
  it('should make use of discriminators', async () => {
    const disMainDoc = await DisMainModel.create({ main1: 'hello DMM' } as DisMain);
    const disAboveDoc = await DisAboveModel.create({ main1: 'hello DAM', above1: 'hello DAM' } as DisAbove);
    expect(disMainDoc).to.not.be.an('undefined');
    expect(disMainDoc.main1).to.equals('hello DMM');
    expect(disMainDoc).to.not.have.property('above1');
    expect(disMainDoc.__t).to.be.an('undefined');

    expect(disAboveDoc).to.not.be.an('undefined');
    expect(disAboveDoc.main1).to.equals('hello DAM');
    expect(disAboveDoc.above1).to.equals('hello DAM');
    expect(disAboveDoc.__t).to.equals('DisAbove');
  });

  it('"getDiscriminatorModelForClass" should return the same model if already defined', () => {
    class TestSameModelDicriminator { }

    const model = getModelForClass(TestSameModelDicriminator);

    const dummymodel = mongoose.model('DummyModel', new mongoose.Schema());

    const newmodel = getDiscriminatorModelForClass(dummymodel, TestSameModelDicriminator);

    expect(newmodel).to.deep.equal(model);
  });

  describe('Generic Discriminators', () => {
    it('should use DefaultModel when setting role to "ROLE.DEFAULT"', async () => {
      const instance: DocumentType<Default> = await DisciminatedUserModel.create({
        role: ROLE.DEFAULT,
        visitor: 'sth',
        default: 'sth',
        profile: { test: 'sth', lastName: 'sth' }
      } as Default);
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
      expect(instance.role).to.equals(ROLE.VISITOR);
      expect(instance.visitor).to.equals('sth');
      expect((instance as any).default).to.equals(undefined);
      expect((instance.profile as any).test).to.equals(undefined);
      expect((instance.profile as any).lastName).to.equals(undefined);
      expect(instance.profile.firstName).to.equals('sth');
    });
  });
}
