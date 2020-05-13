import { getModelForClass, prop } from '../../src/typegoose';

export class AllInOneProp {
  @prop()
  public normal?: string;

  @prop({ items: () => String })
  public array?: string[];

  @prop({ of: String })
  public map?: Map<string, string>;
}

export const AllInOnePropModel = getModelForClass(AllInOneProp);
