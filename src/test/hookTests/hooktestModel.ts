import * as mongoose from 'mongoose';

import { Typegoose, prop, pre } from '../../typegoose';

@pre<Hook>('save', function(next) {
  if (this.isModified('shape')) {
    this.shape = 'newShape';
  } else {
    this.shape = 'oldShape';
  }

  next();
})
export class Hook extends Typegoose {
  @prop({ required: true })
  material: string;

  @prop()
  shape?: string;
}

export const model = new Hook().getModelForClass(Hook);
