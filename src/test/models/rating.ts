import * as mongoose from 'mongoose';

import { index } from '../..';
import { Ref, arrayProp } from '../../prop';
import { prop, Typegoose } from '../../typegoose';
import { Car } from './car';
import { User } from './user';

@index({ car: 1, user: 1 }, { unique: true })
@index({ location: '2dsphere'})
export class Rating extends Typegoose {
  @prop({ ref: Car })
  car: Ref<Car>;

  @prop({ ref: User })
  user: Ref<User>;

  @prop()
  stars: number;

  @arrayProp({ items: Array })
  location: [[number]];
}

export const model = new Rating().getModelForClass(Rating);
