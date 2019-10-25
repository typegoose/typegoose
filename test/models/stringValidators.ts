import { getModelForClass, prop } from '../../src/typegoose';

// Please try to keep this file in sync with ./arrayValidators.ts

export class StringValidators {
  @prop({ maxlength: 3 })
  public maxLength: string;

  @prop({ minlength: 10 })
  public minLength: string;

  @prop({ trim: true })
  public trimmed: string;

  @prop({ uppercase: true })
  public uppercased: string;

  @prop({ lowercase: true })
  public lowercased: string;

  @prop({ enum: ['one', 'two', 'three'] })
  public enumed: string;
}

export const model = getModelForClass(StringValidators);
