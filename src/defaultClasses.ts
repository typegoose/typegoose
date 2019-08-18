import { modelOptions } from './optionsProp';

@modelOptions({ schemaOptions: { timestamps: true } })
/**
 * This class can be used for already existing type infomation for the Timestamps
 */
export abstract class TimeStamps {
  public createdAt!: Readonly<Date>;
  public updatedAt!: Readonly<Date>;
}
