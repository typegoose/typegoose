// Tests for discriminators and refPaths
import { arrayProp, prop, Ref, Typegoose } from '../../src/typegoose';

export class Scooter extends Typegoose {
  @prop()
  public makeAndModel?: string;
}

export class Beverage extends Typegoose {
  @prop({ default: false })
  public isSugarFree?: boolean;

  @prop({ default: false })
  public isDecaf?: boolean;
}

export class Inventory extends Typegoose {
  @prop({ default: 100 })
  public count?: number;

  @prop({ default: 1 })
  public value?: number;

  @prop({ required: true, enum: ['Beverage', 'Scooter'] })
  public refItemPathName!: string;

  @prop()
  public name?: string;

  @prop({ required: true, refPath: 'refItemPathName' })
  public kind!: Ref<Beverage | Scooter>;

  @arrayProp({ required: true, itemsRefPath: 'refItemPathName' })
  public irp!: Ref<Beverage | Scooter>[];
}

export class TestIRPbyString extends Typegoose {
  @prop({ required: true })
  public normalProp!: string;

  @arrayProp({ required: true, itemsRef: 'Beverage' })
  public bev!: Ref<Beverage>[];
}

export const ScooterModel = new Scooter().getModelForClass(Scooter);
export const BeverageModel = new Beverage().getModelForClass(Beverage);
export const InventoryModel = new Inventory().getModelForClass(Inventory);
export const TestIRPbyStringModel = new TestIRPbyString().getModelForClass(TestIRPbyString);
