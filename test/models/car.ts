import * as mongoose from 'mongoose';

import { pre, prop, Typegoose } from '../../src/typegoose';

@pre<Car>('save', function (next) {
  if (this.model === 'Trabant') {
    this.isSedan = true;
  }
  next();
})
export class Car extends Typegoose {
  @prop({ required: true })
  public model: string;

  @prop({ lowercase: true })
  public version: string;

  @prop()
  public isSedan?: boolean;

  @prop({ required: true })
  public price: mongoose.Types.Decimal128;

  @prop()
  public someId: mongoose.Types.ObjectId;
}

export const model = new Car().getModelForClass(Car);
