import * as mongoose from 'mongoose';

import { Typegoose, prop, pre } from '../../typegoose';

@pre<Car>('save', function(next) {
  if (this.model === 'Trabant') {
    this.isSedan = true;
  }
  next();
})
export class Car extends Typegoose {
  @prop({ required: true })
  model: string;

  @prop({ lowercase: true })
  version: string;

  @prop()
  isSedan?: boolean;

  @prop({ required: true })
  price: mongoose.Types.Decimal128;
}

export const model = new Car().getModelForClass(Car);
