// Tests for discriminators and refPaths
import { prop, Ref, Typegoose } from '../../typegoose';

export  class Scooter extends Typegoose {
    @prop()
    makeAndModel: string
}

export  class Beverage extends Typegoose {
    @prop({ default: false })
    isSugarFree: boolean

    @prop({ default: false })
    isDecaf: boolean
}

export class Inventory extends Typegoose {
    @prop({ default: 100 })
    count: number

    @prop({ default: 1.00 })
    value: number

    @prop({ required: true, enum: ['Beverage', 'Scooter']})
    refItemPathName: string

    @prop()
    name: string

    @prop({ refPath: 'refItemPathName', required: true})
    kind: Ref<Beverage | Scooter>
}

export const ScooterModel = new Scooter().getModelForClass(Scooter);
export const BeverageModel = new Beverage().getModelForClass(Beverage);
export const InventoryModel = new Inventory().getModelForClass(Inventory);
