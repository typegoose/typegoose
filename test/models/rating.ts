import { index } from '../../src';
import { arrayProp, Ref } from '../../src/prop';
import { getModelForClass, prop, Typegoose } from '../../src/typegoose';
import { Car } from './car';
import { User } from './user';

@index({ car: 1, user: 1 }, { unique: true })
@index({ location: '2dsphere' })
export class Rating extends Typegoose {
  @prop({ ref: Car })
  public car: Ref<Car>;

  @prop({ ref: User })
  public user: Ref<User>;

  @prop()
  public stars: number;

  @arrayProp({ items: Array })
  public location: [[number]];
}

export const model = getModelForClass(Rating);
