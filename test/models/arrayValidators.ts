import { arrayProp, getModelForClass } from '../../src/typegoose';

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
  @arrayProp({ items: String, maxlength: 3 })
  public maxLength?: string[];

  @arrayProp({ items: String, minlength: 10 })
  public minLength?: string[];

  @arrayProp({ items: String, trim: true })
  public trimmed?: string[];

  @arrayProp({ items: String, uppercase: true })
  public uppercased?: string[];

  @arrayProp({ items: String, lowercase: true })
  public lowercased?: string[];

  @arrayProp({ items: String, default: ['hello'], lowercase: true })
  public defaulted?: string[];

  // Number-Array Values
  @arrayProp({ items: Number, max: 3 })
  public max?: number[];

  @arrayProp({ items: Number, min: 10 })
  public min?: number[];

  // Enum-Array Values
  @arrayProp({ items: String, enum: ArrayValidatorEnumString })
  public enumedString?: ArrayValidatorEnumString[];

  @arrayProp({ items: Number, enum: ArrayValidatorEnumNumber })
  public enumedNumber?: ArrayValidatorEnumNumber[];
}


export const ArrayValidatorsModel = getModelForClass(ArrayValidators);
