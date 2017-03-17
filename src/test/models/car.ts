import { Typegoose, prop } from '../../typegoose';

export class Car extends Typegoose {
  @prop
  model: string;
}