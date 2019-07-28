// Tests for discriminators and refPaths
import { prop, Ref, Typegoose } from '../../src/typegoose';

export class Scooter extends Typegoose {
  @prop()
  public makeAndModel: string;
}

export class Beverage extends Typegoose {
  @prop({ default: false })
  public isSugarFree: boolean;

  @prop({ default: false })
  public isDecaf: boolean;
}

export class Inventory extends Typegoose {
  @prop({ default: 100 })
  public count: number;

  @prop({ default: 1.00 })
  public value: number;

  @prop({ required: true, enum: ['Beverage', 'Scooter'] })
  public refItemPathName: string;

  @prop()
  public name: string;

  @prop({ refPath: 'refItemPathName', required: true })
  public kind: Ref<Beverage | Scooter>;
}

export const ScooterModel = new Scooter().getModelForClass(Scooter);
export const BeverageModel = new Beverage().getModelForClass(Beverage);
export const InventoryModel = new Inventory().getModelForClass(Inventory);
