import { getModelForClass, prop } from '../../src/typegoose';

/** Enum how it *could* be */
export enum NumberValidatorEnum {
  OPT1 = 0,
  OPT2 = 3,
  OPT3 = 6
}

export class NumberValidators {
  @prop({ max: 3 })
  public max?: number;

  @prop({ min: 10 })
  public min?: number;

  @prop({ enum: NumberValidatorEnum })
  public enumed?: NumberValidatorEnum;
}

export const NumberValidatorsModel = getModelForClass(NumberValidators);
