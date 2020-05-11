import { getModelForClass, prop } from '../../src/typegoose';

export class Alias {
  @prop({ required: true })
  public normalProp!: string;

  @prop({ required: true, alias: 'aliasProp' })
  public alias!: string;
  public aliasProp!: string; // its just for type completion
}

export const AliasModel = getModelForClass(Alias);
