import { pre, prop, Typegoose } from '../../src/typegoose';

@pre<Hook>('save', function (next) {
  if (this.isModified('shape')) {
    this.shape = 'newShape';
  } else {
    this.shape = 'oldShape';
  }

  next();
})
export class Hook extends Typegoose {
  @prop({ required: true })
  public material: string;

  @prop()
  public shape?: string;
}

export const model = new Hook().getModelForClass(Hook);
