import { getModelForClass, prop } from '../../src/typegoose';

// Please try to keep this file in sync with ./stringValidators.ts

export enum ArrayValidatorEnumString {
  OPT1 = 'one',
  OPT2 = 'two',
  OPT3 = 'three'
}

export enum ArrayValidatorEnumNumber {
  OPT1 = 0,
  OPT2 = 3,
  OPT3 = 6
}

export class ArrayValidators {
  // String-Array Values
  @prop({ type: String, maxlength: 3 })
  public maxLength?: string[];

  @prop({ type: String, minlength: 10 })
  public minLength?: string[];

  @prop({ type: String, trim: true })
  public trimmed?: string[];

  @prop({ type: String, uppercase: true })
  public uppercased?: string[];

  @prop({ type: String, lowercase: true })
  public lowercased?: string[];

  @prop({ type: String, default: ['hello'], lowercase: true })
  public defaulted?: string[];

  // Number-Array Values
  @prop({ type: Number, max: 3 })
  public max?: number[];

  @prop({ type: Number, min: 10 })
  public min?: number[];

  // Enum-Array Values
  @prop({ type: String, enum: ArrayValidatorEnumString })
  public enumedString?: ArrayValidatorEnumString[];

  @prop({ type: Number, enum: ArrayValidatorEnumNumber })
  public enumedNumber?: ArrayValidatorEnumNumber[];
}

export const ArrayValidatorsModel = getModelForClass(ArrayValidators);
