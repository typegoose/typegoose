import { DocumentType, prop, Ref } from '../../src/typegoose';
import { Car } from './car';

export abstract class PersistentModel {
  @prop()
  public createdAt?: Date;

  @prop({ ref: Car })
  public cars?: Ref<Car>[];

  // define an instance method that will be overwritten
  public getClassName() {
    return 'PersistentModel';
  }

  // define an instance method that will be overwritten
  public static getStaticName() {
    return 'PersistentModel';
  }

  // define an instance method that is called by the derived class
  public async addCar(this: DocumentType<PersistentModel>, car: Car) {
    if (!Array.isArray(this.cars)) {
      this.cars = [];
    }

    this.cars.push(car);

    return this.save();
  }
}
