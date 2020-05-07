import { getModelForClass, mongoose, pre, prop } from '../../src/typegoose';

@pre<Car>('save', function (next) {
  if (this.carModel === 'Trabant') {
    this.isSedan = true;
  }
  next();
})
export class Car {
  @prop({ required: true })
  public carModel!: string;

  @prop({ lowercase: true })
  public version?: string;

  @prop()
  public isSedan?: boolean;

  @prop({ required: true })
  public price!: mongoose.Types.Decimal128;

  @prop()
  public someId?: mongoose.Types.ObjectId;
}

export const CarModel = getModelForClass(Car);
