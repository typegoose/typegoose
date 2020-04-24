import { DocumentType, getDiscriminatorModelForClass, getModelForClass, mongoose } from '../../src/typegoose';
import { DisAbove, DisAboveModel, DisMain, DisMainModel } from '../models/discriminators';
import { Default, DefaultModel, DisciminatedUserModel, ROLE, Visitor, VisitorModel } from '../models/discriminatorsWithGenerics';

it('should make use of discriminators', async () => {
  const disMainDoc = await DisMainModel.create({ main1: 'hello DMM' });
  const disAboveDoc = await DisAboveModel.create({ main1: 'hello DAM', above1: 'hello DAM' });
  expect(disMainDoc).not.toEqual(undefined);
  expect(disMainDoc.main1).toEqual('hello DMM');
  expect(disMainDoc).not.toHaveProperty('above1');
  expect(disMainDoc.__t).toEqual(undefined);

  expect(disAboveDoc).not.toEqual(undefined);
  expect(disAboveDoc.main1).toEqual('hello DAM');
  expect(disAboveDoc.above1).toEqual('hello DAM');
  expect(disAboveDoc.__t).toEqual('DisAbove');
});

it('"getDiscriminatorModelForClass" should return the same model if already defined', () => {
  class TestSameModelDicriminator { }

  const model = getModelForClass(TestSameModelDicriminator);

  const dummymodel = mongoose.model('DummyModel', new mongoose.Schema());

  const newmodel = getDiscriminatorModelForClass(dummymodel, TestSameModelDicriminator);

  expect(newmodel).toEqual(model);
});

describe('Generic Discriminators', () => {
  it('should use DefaultModel when setting role to "ROLE.DEFAULT"', async () => {
    const instance: DocumentType<Default> = await DisciminatedUserModel.create({
      role: ROLE.DEFAULT,
      visitor: 'sth',
      default: 'sth',
      profile: { test: 'sth', lastName: 'sth' }
    } as Default);
    expect(instance.constructor).toEqual(DefaultModel);
    expect(instance.schema.path('profile')).not.toBeInstanceOf(mongoose.Schema.Types.Mixed);
    expect((instance as any).visitor).toEqual(undefined);
    expect(instance.default).toEqual('sth');
    expect((instance.profile as any).test).toEqual(undefined);
    expect(instance.profile.lastName).toEqual('sth');
  });

  it('should work when using "DefaultModel" directly', async () => {
    const instance: DocumentType<Default> = await DefaultModel.create({
      visitor: 'sth',
      default: 'sth',
      profile: { test: 'sth', lastName: 'sth' }
    } as Default);
    expect(instance.constructor).toEqual(DefaultModel);
    expect(instance.schema.path('profile')).not.toBeInstanceOf(mongoose.Schema.Types.Mixed);
    expect(instance.role).toEqual(ROLE.DEFAULT);
    expect((instance as any).visitor).toEqual(undefined);
    expect(instance.default).toEqual('sth');
    expect((instance.profile as any).test).toEqual(undefined);
    expect(instance.profile.lastName).toEqual('sth');
  });

  it('should use VisitorModel when setting role to "ROLE.VISITOR"', async () => {
    const instance: DocumentType<Visitor> = await DisciminatedUserModel.create({
      role: ROLE.VISITOR,
      visitor: 'sth',
      default: 'sth',
      profile: { test: 'sth', firstName: 'sth' }
    } as Visitor);
    expect(instance.constructor).toEqual(VisitorModel);
    expect(instance.schema.path('profile')).not.toBeInstanceOf(mongoose.Schema.Types.Mixed);
    expect(instance.role).toEqual(ROLE.VISITOR);
    expect(instance.visitor).toEqual('sth');
    expect((instance as any).default).toEqual(undefined);
    expect((instance.profile as any).test).toEqual(undefined);
    expect((instance.profile as any).lastName).toEqual(undefined);
    expect(instance.profile.firstName).toEqual('sth');
  });
});
