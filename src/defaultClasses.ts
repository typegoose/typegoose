import { modelOptions } from './optionsProp';

// export abstract class GridFS {

// }

@modelOptions({ schemaOptions: { timestamps: true } })
export abstract class TimeStamps {
  public createdAt!: Readonly<Date>;
  public updatedAt!: Readonly<Date>;
}
