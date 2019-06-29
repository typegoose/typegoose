/** @format */

import * as tg from '../../typegoose';
import { PersistentModel } from './PersistentModel';

// add a pre-save hook to PersistentModel
@tg.pre<PersistentModel>('save', function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
})
export class Person extends PersistentModel {
  // add new property
  @tg.prop({ required: true, validate: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/ })
  public email: string;

  // override instanceMethod
  @tg.instanceMethod
  public getClassName() {
    return 'Person';
  }

  // override staticMethod
  @tg.staticMethod
  public static getStaticName() {
    return 'Person';
  }
}

export const model = new Person().getModelForClass(Person);
