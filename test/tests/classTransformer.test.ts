import { classToPlain, Exclude, Expose, plainToClass, Transform } from 'class-transformer';

import { getModelForClass, mongoose, prop } from '../../src/typegoose';

// re-implement base Document to allow class-transformer to serialize/deserialize its properties
// This class is needed, otherwise "_id" and "__v" would be excluded from the output
class DocumentCT {
  @Expose()
  // makes sure that when deserializing from a Mongoose Object, ObjectId is serialized into a string
  @Transform((value: any) => {
    if ("value" in value) {
      return value.value instanceof mongoose.Types.ObjectId ? value.value.toHexString() : value.value.toString();
    }

    return "unknown value";
  })
  public _id: string;

  @Expose()
  // tslint:disable-next-line:variable-name
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
      password: 'secret'
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
      const serialized = classToPlain(plainToClass(Account, pojo));
      // the reason for doing a transformation round-trip here
      // is that class-transformer can only works it magic on an instance of a class with its annotation
      expect(serialized).toStrictEqual({
        _id: id,
        __v: 0,
        email: 'somebody@gmail.com'
      });
    });

    it(`should be able to use class-transformer's groups`, async () => {
      // lean return a Plain Old Javascript Object
      const pojo = await AccountModel.findById(id).orFail().lean().exec();
      const options = { groups: ['admin'] };
      // deserialize Plain Old Javascript Object into an instance of the Account class
      // serialize Account instance back to a Plain Old Javascript Object, applying class-transformer's magic
      const serialized = classToPlain(plainToClass(Account, pojo, options), options);
      // the reason for doing a transformation round-trip here
      // is that class-transformer can only works it magic on an instance of a class with its annotation
      expect(serialized).toStrictEqual({
        _id: id,
        __v: 0,
        email: 'somebody@gmail.com',
        password: 'secret'
      });
    });
  });

  describe('normal query', () => {
    it('should be able to use class-transformer', async () => {
      // exec return a Mongoose Object
      const doc = await AccountModel.findById(id).orFail().exec();
      // deserialize Mongoose Object into an instance of the Account class
      // serialize Account instance back to a Plain Old Javascript Object, applying class-transformer's magic
      const serialized = classToPlain(plainToClass(Account, doc));
      // the reason for doing a transformation round-trip here
      // is that class-transformer can only works it magic on an instance of a class with its annotation
      expect(serialized).toStrictEqual({
        _id: id,
        __v: 0,
        email: 'somebody@gmail.com'
      });
    });

    it(`should be able to use class-transformer's groups`, async () => {
      // exec return a Mongoose Object
      const doc = await AccountModel.findById(id).orFail().exec();
      const options = { groups: ['admin'] };
      // deserialize Mongoose Object into an instance of the Account class
      // serialize Account instance back to a Plain Old Javascript Object, applying class-transformer's magic
      const serialized = classToPlain(plainToClass(Account, doc, options), options);
      // the reason for doing a transformation round-trip here
      // is that class-transformer can only works it magic on an instance of a class with its annotation
      expect(serialized).toStrictEqual({
        _id: id,
        __v: 0,
        email: 'somebody@gmail.com',
        password: 'secret'
      });
    });
  });
});
