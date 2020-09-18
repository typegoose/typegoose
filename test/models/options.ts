import { getModelForClass, modelOptions, prop } from '../../src/typegoose';

@modelOptions({ schemaOptions: { timestamps: true } })
export class OptionsClass {
  @prop({ required: true })
  public someprop!: number;

  public createdAt?: Date;
  public updatedAt?: Date;
}

export const OptionsModel = getModelForClass(OptionsClass);
