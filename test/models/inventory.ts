// Tests for discriminators and refPaths
import { getModelForClass, getName, prop, Ref } from '../../src/typegoose';

export class Scooter {
  @prop()
  public makeAndModel?: string;
}

export class Beverage {
  @prop({ default: false })
  public isSugarFree?: boolean;

  @prop({ default: false })
  public isDecaf?: boolean;
}

export class Inventory {
  @prop({ default: 100 })
  public count?: number;

  @prop({ default: 1 })
  public value?: number;

  @prop({ required: true, enum: [getName(Beverage), getName(Scooter)] })
  public refItemPathName!: string;

  @prop({ required: true, refPath: 'refItemPathName' })
  public kind!: Ref<Beverage | Scooter>;

  @prop({ required: true, refPath: 'refItemPathName' })
  public kindArray!: Ref<Beverage | Scooter>[];
}

export class TestIRPbyString {
  @prop({ required: true })
  public normalProp!: string;

  @prop({ required: true, ref: Beverage })
  public bev!: Ref<Beverage>[];
}

export const ScooterModel = getModelForClass(Scooter);
export const BeverageModel = getModelForClass(Beverage);
export const InventoryModel = getModelForClass(Inventory);
export const TestIRPbyStringModel = getModelForClass(TestIRPbyString);
