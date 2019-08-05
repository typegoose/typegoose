import { getModelForClass, prop, Typegoose } from '../../src/typegoose';

export class Alias extends Typegoose {
  @prop({ required: true })
  public normalProp: string;

  @prop({ required: true, alias: 'aliasProp' })
  public alias: string;
  public aliasProp: string; // its just for type completion
}

export const model = getModelForClass(Alias);
