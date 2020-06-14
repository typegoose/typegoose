import { getModelForClass, prop } from '../../src/typegoose';

// Please try to keep this file in sync with ./arrayValidators.ts

export enum StringValidatorEnum {
  OPT1 = 'one',
  OPT2 = 'two',
  OPT3 = 'three'
}

export class StringValidators {
  @prop({ maxlength: 3 })
  public maxLength?: string;

  @prop({ minlength: 10 })
  public minLength?: string;

  @prop({ trim: true })
  public trimmed?: string;

  @prop({ uppercase: true })
  public uppercased?: string;

  @prop({ lowercase: true })
  public lowercased?: string;

  @prop({ enum: StringValidatorEnum })
  public enumed?: StringValidatorEnum;
}

export const StringValidatorsModel = getModelForClass(StringValidators);
