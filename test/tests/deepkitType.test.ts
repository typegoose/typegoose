import { t, jsonSerializer } from '@deepkit/type';
import { DocumentType, getModelForClass, prop, mongoose } from '../../src/typegoose.js';

const ObjectId = mongoose.Types.ObjectId;
// Create a Custom Serializer to add custom transfrom functions to types
const mySerializer = new (class CustomSerializer extends jsonSerializer.fork('mySerializer') {})();

// Note: A custom Serializer has to be used, because the included "mongoId" "decorator" only works with "@deepkit/orm"

// We overwrite mongoId and correctly convert from Mongo ObjectID to string when deserializing
mySerializer.toClass.register('objectId', (property, state) => {
  state.setContext({ ObjectId: ObjectId });
  state.addSetter(`${state.accessor} instanceof String ? ObjectId.createFromHexString(${state.accessor}) : ${state.accessor}`);
});

// We overwrite mongoId and correctly convert string to Mongo ObjectID when serializing
mySerializer.fromClass.register('objectId', (property, state) => {
  state.setContext({ ObjectId: ObjectId });
  state.addSetter(`${state.accessor} instanceof ObjectId ? ${state.accessor}.toHexString() : ${state.accessor}`);
});

// Create a custom "classToPlain" function, using "mySerializer" instead of the function provided by "@deepkit/type"
const classToPlain = function (schemaCls: any, clsObj: any, access?: any) {
  return mySerializer.for(schemaCls).serialize(clsObj, access);
};

// Create a custom "plainToClass" function, using "mySerializer" instead of the function provided by "@deepkit/type"
const plainToClass = function (schemaCls: any, obj: any, access?: any) {
  return mySerializer.for(schemaCls).deserialize(obj, access);
};

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
  let account: DocumentType<Account>;
  beforeEach(async () => {
    accountClassObject = new Account();
    accountClassObject.email = 'somebody@gmail.com';
    accountClassObject.confidentialProperty = 'secret';
    account = await AccountModel.create(accountClassObject);
    accountClassObject._id = account._id;
    accountClassObject.__v = account.__v;
    id = account._id.toString();
  });

  describe('lean query', () => {
    it('should be able to use @deepkit/type to transform to class instance', async () => {
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

    it("should be able to use @deepkit/type's groups to allow access", async () => {
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

    it("should be able to use @deepkit/type's groups to allow access", async () => {
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

  it('should create a Document from a Class', async () => {
    const origData = new Account(); // data without any mongoose properties (like "__v" and "_id")
    origData.confidentialProperty = 'confident1';
    origData.email = 'nobody1@someone.org';
    // the following is to have a copy of the original, just to test "@deepkit/type"'s ability to transform
    const copied = plainToClass(Account, classToPlain(Account, origData));
    // this is here, because in the transition from mongoose 5.x to mongoose 6.x, class-transformer suddenly started having different values after one transform
    expect(copied).toStrictEqual(origData);
    const createdDoc = await AccountModel.create(copied);

    // Expect "createdDoc" to have the properties of "origData" exactly matching, ignoring extra properties that were not in "origData"
    expect(createdDoc).toStrictEqual(expect.objectContaining(origData));
    const docPOJO = classToPlain(Account, createdDoc);
    expect(docPOJO).toMatchSnapshot({ _id: expect.any(String) });
  });

  it('should transform a POJO to a Class, store it, retrieve it, and transform it back to a POJO', async () => {
    const origData = new Account(); // data without any mongoose properties (like "__v" and "_id")
    origData.confidentialProperty = 'confident2';
    origData.email = 'nobody2@someone.org';
    // create our definition for groupings of properties to transform
    const access = { groups: [Group.confidential, Group.public] };
    // transform our "fake" incoming DTO to a Class instance
    const incomingDataTransformedToClass = plainToClass(Account, origData, access);
    // Strre the class object
    const createdDoc = await AccountModel.create(incomingDataTransformedToClass);
    // retrieve the document
    const docFound = await AccountModel.findById(createdDoc._id).orFail().exec();
    // transform it back to a DTO
    const outboundDTO = classToPlain(Account, docFound, access);
    expect(outboundDTO).toMatchSnapshot({ _id: expect.any(String) });
  });
});
