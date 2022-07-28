import { Exclude, Expose, instanceToPlain, plainToClass, Transform } from 'class-transformer';
import { getModelForClass, prop } from '../../src/typegoose.js';

// re-implement base Document to allow class-transformer to serialize/deserialize its properties
// This class is needed, otherwise "_id" and "__v" would be excluded from the output
class DocumentCT {
  @Expose()
  // makes sure that when deserializing from a Mongoose Object, ObjectId is serialized into a string
  @Transform((value) => {
    if ('value' in value) {
      // HACK: this is changed because of https://github.com/typestack/class-transformer/issues/879
      // return value.value.toString(); // because "toString" is also a wrapper for "toHexString"
      return value.obj[value.key].toString();
    }

    return 'unknown value';
  })
  public _id: string;

  @Expose()
  public __v: number;
}

@Exclude()
class Account extends DocumentCT {
  @prop()
  @Expose()
  public email: string;

  @prop()
  @Expose({ groups: ['admin'] })
  public password: string;
}

const AccountModel = getModelForClass(Account);

describe('class-transformer', () => {
  let id: string;
  beforeAll(async () => {
    const { _id } = await AccountModel.create({
      email: 'somebody@gmail.com',
      password: 'secret',
    } as Account);
    // note here that _id is an ObjectId, hence the toString()
    // otherwise it will have the shape of : { _bsonType: 'ObjectId', id: ArrayBuffer }
    id = _id.toString();
  });

  describe('lean query', () => {
    it('should be able to use class-transformer', async () => {
      // lean return a Plain Old Javascript Object
      const pojo = await AccountModel.findById(id).orFail().lean().exec();
      // deserialize Plain Old Javascript Object into an instance of the Account class
      // serialize Account instance back to a Plain Old Javascript Object, applying class-transformer's magic
      const serialized = instanceToPlain(plainToClass(Account, pojo));
      // the reason for doing a transformation round-trip here
      // is that class-transformer can only works it magic on an instance of a class with its annotation
      expect(serialized).toStrictEqual({
        _id: id,
        __v: 0,
        email: 'somebody@gmail.com',
      });
    });

    it(`should be able to use class-transformer's groups`, async () => {
      // lean return a Plain Old Javascript Object
      const pojo = await AccountModel.findById(id).orFail().lean().exec();
      const options = { groups: ['admin'] };
      // deserialize Plain Old Javascript Object into an instance of the Account class
      // serialize Account instance back to a Plain Old Javascript Object, applying class-transformer's magic
      const serialized = instanceToPlain(plainToClass(Account, pojo, options), options);
      // the reason for doing a transformation round-trip here
      // is that class-transformer can only works it magic on an instance of a class with its annotation
      expect(serialized).toStrictEqual({
        _id: id,
        __v: 0,
        email: 'somebody@gmail.com',
        password: 'secret',
      });
    });
  });

  describe('normal query', () => {
    it('should be able to use class-transformer', async () => {
      // exec return a Mongoose Object
      const doc = await AccountModel.findById(id).orFail().exec();
      // deserialize Mongoose Object into an instance of the Account class
      // serialize Account instance back to a Plain Old Javascript Object, applying class-transformer's magic
      const serialized = instanceToPlain(plainToClass(Account, doc));
      // the reason for doing a transformation round-trip here
      // is that class-transformer can only works it magic on an instance of a class with its annotation
      expect(serialized).toStrictEqual({
        _id: id,
        __v: 0,
        email: 'somebody@gmail.com',
      });
    });

    it(`should be able to use class-transformer's groups`, async () => {
      // exec return a Mongoose Object
      const doc = await AccountModel.findById(id).orFail().exec();
      const options = { groups: ['admin'] };
      // deserialize Mongoose Object into an instance of the Account class
      // serialize Account instance back to a Plain Old Javascript Object, applying class-transformer's magic
      const serialized = instanceToPlain(plainToClass(Account, doc, options), options);
      // the reason for doing a transformation round-trip here
      // is that class-transformer can only works it magic on an instance of a class with its annotation
      expect(serialized).toStrictEqual({
        _id: id,
        __v: 0,
        email: 'somebody@gmail.com',
        password: 'secret',
      });
    });
  });
});
