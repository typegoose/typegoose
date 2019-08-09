import { modelOptions } from './optionsProp';

@modelOptions({ schemaOptions: { timestamps: true } })
export abstract class TimeStamps {
  public createdAt!: Readonly<Date>;
  public updatedAt!: Readonly<Date>;
}
