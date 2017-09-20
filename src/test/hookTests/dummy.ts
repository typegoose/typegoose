import * as mongoose from 'mongoose';

import { prop, Typegoose, pre, post } from '../../typegoose';

@pre<Dummy>('save', function(next) {
  this.text = 'saved';

  next();
})
@post<Dummy>('find', (result) => {
  result[0].text = 'changed in post find hook';
})
@post<Dummy>('findOne', (result) => {
  result.text = 'changed in post findOne hook';
})
export class Dummy extends Typegoose {
  @prop()
  text: string;
}

export const model = new Dummy().getModelForClass(Dummy);
