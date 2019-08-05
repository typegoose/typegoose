import { getModelForClass, modelOptions, prop, Typegoose } from '../../src/typegoose';

@modelOptions({ schemaOptions: { timestamps: true } })
export class OptionsClass extends Typegoose {
  @prop({ required: true })
  public someprop: number;

  public createdAt: Date;
  public updatedAt: Date;
}

export const OptionsModel = getModelForClass(OptionsClass);
