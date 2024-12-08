import type { Types } from 'mongoose';
import { modelOptions } from './modelOptions.js';
import type { RefType } from './types.js';

@modelOptions({ schemaOptions: { timestamps: true } })
/**
 * This class can be used for already existing type information for the Timestamps
 */
export abstract class TimeStamps {
  public createdAt?: Date;
  public updatedAt?: Date;
}

/**
 * This Interface can be used when "_id" and "id" need to be defined in types
 */
export interface Base<IDType extends RefType = Types.ObjectId> {
  _id: IDType;
  /**
   * This getter/setter doesn't exist if "schemaOptions.id" being set to "false"
   */
  id: string;
}
