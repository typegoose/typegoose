import { getModelForClass, prop } from '../../src/typegoose';

export class AllInOneProp {
  @prop()
  public normal?: string;

  @prop({ type: () => String })
  public array?: string[];

  @prop({ type: String })
  public map?: Map<string, string>;
}

export const AllInOnePropModel = getModelForClass(AllInOneProp);
