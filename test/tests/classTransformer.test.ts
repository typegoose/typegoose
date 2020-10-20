import { ObjectId } from 'bson';
import { classToPlain, Exclude, Expose, plainToClass, Transform } from 'class-transformer';

import { prop } from '../../src/prop';
import { getModelForClass } from '../../src/typegoose';

// re-implement base Document to allow class-transformer to serialize/deserialize its properties
class Document {
  @Expose()
  @Transform(
    // makes sure that when serializing from a Mongoose Object, ObjectId is transformed into a string 
    (value: any) => value instanceof ObjectId
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
      const POJO = await AccountModel.findById(id).lean()
      // transform Plain Old Javascript Object into an instance of the Account class
      const serialized = plainToClass(Account, POJO)
      // transform Account instance back to a Plain Old Javascript Object, applying class-transformer's magic
      const deserialized = classToPlain(serialized)
      expect(deserialized)
      .toStrictEqual({
        _id: id,
        __v: 0,
        email: 'somebody@gmail.com',
      })
    })
    it(`should be able to use class-transformer's groups`, async () => {
      // lean return a Plain Old Javascript Object
      const POJO = await AccountModel.findById(id).lean()
      const options = { groups: ['admin'] }
      // transform Plain Old Javascript Object into an instance of the Account class
      const serialized = plainToClass(Account, POJO, options)
      // transform Account instance back to a Plain Old Javascript Object, applying class-transformer's magic
      const deserialized = classToPlain(serialized, options)
      expect(deserialized)
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
      const MO = await AccountModel.findById(id).exec()
      // transform Mongoose Object into an instance of the Account class
      const serialized = plainToClass(Account, MO)
      // transform Account instance back to a Plain Old Javascript Object, applying class-transformer's magic
      const deserialized = classToPlain(serialized)
      expect(deserialized)
      .toStrictEqual({
        _id: id,
        __v: 0,
        email: 'somebody@gmail.com',
      })
    })
  })
})