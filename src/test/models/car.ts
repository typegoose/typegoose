import * as mongoose from 'mongoose';

import { Typegoose, prop, pre } from '../../typegoose';

@pre<Car>('save', (next) => {
  next();
})
export class Car extends Typegoose {
  @prop({ required: true })
  model: string;
}

export const model = new Car().getModelForClass(Car);
