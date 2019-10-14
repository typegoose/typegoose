import { logger } from '../../src/logSettings';
import { arrayProp, getModelForClass } from '../../src/typegoose';

logger.setLevel('DEBUG');

export class ArrayValidators {
  @arrayProp({ items: String, maxlength: 3 })
  public maxLength: string[];

  @arrayProp({ items: String, minlength: 10 })
  public minLength: string[];

  @arrayProp({ items: String, trim: true })
  public trimmed: string[];

  @arrayProp({ items: String, uppercase: true })
  public uppercased: string[];

  @arrayProp({ items: String, lowercase: true })
  public lowercased: string[];

  @arrayProp({ items: String, enum: ['one', 'two', 'three'] })
  public enumed: string[];

  @arrayProp({ items: String, default: ['hello'], lowercase: true })
  public defaulted: string[];
}

export const model = getModelForClass(ArrayValidators);
