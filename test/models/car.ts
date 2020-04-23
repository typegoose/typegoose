import { getModelForClass, mongoose, pre, prop } from '../../src/typegoose';

@pre<Car>('save', function (next) {
  if (this.model === 'Trabant') {
    this.isSedan = true;
  }
  next();
})
export class Car {
  @prop({ required: true })
  public model: string;

  @prop({ lowercase: true })
  public version: string;

  @prop()
  public isSedan?: boolean;

  @prop({ required: true })
  public price: mongoose.Types.Decimal128;

  @prop()
  public someId: mongoose.Types.ObjectId;
}

export const CarModel = getModelForClass(Car);
