import { classToPlain, Exclude, Expose, plainToClass, Transform } from 'class-transformer';

import { getModelForClass, mongoose, prop } from '../../src/typegoose';

// re-implement base Document to allow class-transformer to serialize/deserialize its properties
class Document {
  @Expose()
  @Transform(
    // makes sure that when deserializing from a Mongoose Object, ObjectId is serialized into a string 
    (value: any) => value instanceof mongoose.Types.ObjectId
    ? value.toHexString()
    : value,
    { toClassOnly: true })
  public _id: string
  
  @Expose()
  public __v: number
}

@Exclude()
class Account extends Document {
  @prop()
  @Expose()
  public email: string

  @prop()
  @Expose({ groups: ['admin'] })
  password: string;
}

const AccountModel = getModelForClass(Account)

describe('class-transformer', () => {
  let id: string
  beforeAll(async () => {
    const { _id } = await AccountModel.create({
      email: 'somebody@gmail.com',
      password: 'secret',
    } as Account)
    // note here that _id is an ObjectId, hence the toString()
    // otherwise it will have the shape of : { _bsonType: 'ObjectId', id: ArrayBuffer }
    id = _id.toString()
  })
  describe('lean', () => {
    it('should be able to use class-transformer', async () => {
      // lean return a Plain Old Javascript Object
      const pojo = await AccountModel.findById(id).orFail().lean()
      // deserialize Plain Old Javascript Object into an instance of the Account class
      const deserialized = plainToClass(Account, pojo)
      // serialize Account instance back to a Plain Old Javascript Object, applying class-transformer's magic
      const serialized = classToPlain(deserialized)
      // the reason for doing a transformation round-trip here
      // is that class-transformer can only works it magic on an instance of a class with its annotation
      expect(serialized)
      .toStrictEqual({
        _id: id,
        __v: 0,
        email: 'somebody@gmail.com',
      })
    })
    it(`should be able to use class-transformer's groups`, async () => {
      // lean return a Plain Old Javascript Object
      const pojo = await AccountModel.findById(id).orFail().lean()
      const options = { groups: ['admin'] }
      // deserialize Plain Old Javascript Object into an instance of the Account class
      const deserialized = plainToClass(Account, pojo, options)
      // serialize Account instance back to a Plain Old Javascript Object, applying class-transformer's magic
      const serialized = classToPlain(deserialized, options)
      // the reason for doing a transformation round-trip here
      // is that class-transformer can only works it magic on an instance of a class with its annotation
      expect(serialized)
      .toStrictEqual({
        _id: id,
        __v: 0,
        email: 'somebody@gmail.com',
        password: 'secret',
      })
    })
  })
  describe('exec', () => {
    it('should be able to use class-transformer', async () => {
      // exec return a Mongoose Object
      const mo = await AccountModel.findById(id).orFail().exec()
      // deserialize Mongoose Object into an instance of the Account class
      const deserialized = plainToClass(Account, mo)
      // serialize Account instance back to a Plain Old Javascript Object, applying class-transformer's magic
      const serialized = classToPlain(deserialized)
      // the reason for doing a transformation round-trip here
      // is that class-transformer can only works it magic on an instance of a class with its annotation
      expect(serialized)
      .toStrictEqual({
        _id: id,
        __v: 0,
        email: 'somebody@gmail.com',
      })
    })
    it(`should be able to use class-transformer's groups`, async () => {
      // exec return a Mongoose Object
      const mo = await AccountModel.findById(id).orFail().exec()
      const options = { groups: ['admin'] }
      // deserialize Mongoose Object into an instance of the Account class
      const deserialized = plainToClass(Account, mo, options)
      // serialize Account instance back to a Plain Old Javascript Object, applying class-transformer's magic
      const serialized = classToPlain(deserialized, options)
      // the reason for doing a transformation round-trip here
      // is that class-transformer can only works it magic on an instance of a class with its annotation
      expect(serialized)
      .toStrictEqual({
        _id: id,
        __v: 0,
        email: 'somebody@gmail.com',
        password: 'secret',
      })
    })
  })
})