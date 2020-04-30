import { getModelForClass, pre, prop } from '../../src/typegoose';
import { PersistentModel } from './persistentModel';

// add a pre-save hook to PersistentModel
@pre<PersistentModel>('save', function (next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
})
export class Person extends PersistentModel {
  // add new property
  @prop({ required: true, validate: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/ })
  public email!: string;

  // override instanceMethod
  public getClassName() {
    return 'Person';
  }

  // override staticMethod
  public static getStaticName() {
    return 'Person';
  }
}

export const PersonModel = getModelForClass(Person);
