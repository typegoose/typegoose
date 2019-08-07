import { arrayProp, DocumentType, instanceMethod, prop, Ref, staticMethod } from '../../src/typegoose';
import { Car } from './car';

export abstract class PersistentModel {
  @prop()
  public createdAt: Date;

  @arrayProp({ itemsRef: Car })
  public cars?: Ref<Car>[];

  // define an 'instanceMethod' that will be overwritten
  @instanceMethod
  public getClassName() {
    return 'PersistentModel';
  }

  // define an 'instanceMethod' that will be overwritten
  @staticMethod
  public static getStaticName() {
    return 'PersistentModel';
  }

  // define an instanceMethod that is called by the derived class
  @instanceMethod
  public async addCar(this: DocumentType<PersistentModel>, car: Car) {
    if (!this.cars) {
      this.cars = [];
    }

    this.cars.push(car);

    return this.save();
  }
}
