import { Typegoose, prop } from '../../typegoose';

export class Car extends Typegoose {
  @prop({ required: true })
  model: string;
}

export const model = new Car().getModelForClass(Car);