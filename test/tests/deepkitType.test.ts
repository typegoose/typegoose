import { classToPlain, t, plainToClass } from '@deepkit/type';
import { getModelForClass, prop } from '../../src/typegoose';

enum Group {
  confidential = 'confidential',
  public = 'public',
}

class Account {
  @t.mongoId.group(Group.public)
  public _id: string;

  @t.group(Group.public)
  public __v: number;

  @t.group(Group.public)
  @prop()
  public email: string;

  @t.group(Group.confidential)
  @prop()
  public confidentialProperty?: string;
}

const AccountModel = getModelForClass(Account);

describe('@deepkit/type transforms', () => {
  let id: string;
  let accountClassObject: Account;
  let account: Account;
  beforeEach(async () => {
    accountClassObject = new Account();
    accountClassObject.email = 'somebody@gmail.com';
    accountClassObject.confidentialProperty = 'secret';
    account = await AccountModel.create(accountClassObject);
    // note here that _id is an ObjectId, hence the toString()
    // otherwise it will have the shape of : { _bsonType: 'ObjectId', id: ArrayBuffer }
    id = account._id;
    accountClassObject._id = account._id;
    accountClassObject.__v = account.__v;
  });

  describe('lean query', () => {
    it(`should be able to use @deepkit/type to transform to class instance`, async () => {
      // lean return a Plain Old Javascript Object
      const pojo = await AccountModel.findById(id).orFail().lean().exec();
      // groupsExclude option excludes the property group
      const access = { groupsExclude: [Group.confidential] };
      // deserialize pojo back to an Account instance
      const deserialized = plainToClass(Account, pojo, access);
      // need to remove the password property, as it is not available due to our @t.group confidential exclusion definition
      delete accountClassObject.confidentialProperty;
      expect(deserialized).toStrictEqual(accountClassObject);
      expect(deserialized).not.toHaveProperty('confidentialProperty');
    });

    it(`should be able to use @deepkit/type's groups to allow access`, async () => {
      // lean return a Plain Old Javascript Object
      const pojo = await AccountModel.findById(id).orFail().lean().exec();
      // groups option includes the property group
      const access = { groups: [Group.confidential, Group.public] };
      // deserialize pojo back to an Account instance
      const deserialized = plainToClass(Account, pojo, access);
      expect(deserialized).toStrictEqual(accountClassObject);
      expect(deserialized).toHaveProperty('confidentialProperty');
    });
  });

  describe('normal query', () => {
    it('should be able to use @deepkit/type transform', async () => {
      // exec returns a Mongoose Object
      const doc = await AccountModel.findById(id).orFail().exec();
      const access = { groupsExclude: [Group.confidential] };
      // serialize Account instance back to a Plain Old Javascript Object
      const serialized = classToPlain(Account, doc, access);
      expect(serialized).toStrictEqual({
        _id: id,
        __v: 0,
        email: 'somebody@gmail.com',
      });
      expect(serialized).not.toHaveProperty('confidentialProperty');
    });

    it(`should be able to use @deepkit/type's groups to allow access`, async () => {
      // exec return a Mongoose Object
      const doc = await AccountModel.findById(id).orFail().exec();
      const access = { groups: [Group.confidential, Group.public] };
      // serialize Account instance back to a Plain Old Javascript Object
      const serialized = classToPlain(Account, doc, access);
      expect(serialized).toStrictEqual({
        _id: id,
        __v: 0,
        email: 'somebody@gmail.com',
        confidentialProperty: 'secret',
      });
      expect(serialized).toHaveProperty('confidentialProperty');
    });
  });
});
