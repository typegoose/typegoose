import { prop, Typegoose } from '../../src/typegoose';

export class StringValidators extends Typegoose {
  @prop({ maxlength: 3 })
  public maxLength: string;

  @prop({ trim: true })
  public trimmed: string;

  @prop({ uppercase: true })
  public uppercased: string;

  @prop({ lowercase: true })
  public lowercased: string;

  @prop({ enum: ['one', 'two', 'three'] })
  public enumed: string;
}

export const model = new StringValidators().getModelForClass(StringValidators);
