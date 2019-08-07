import { arrayProp, DocumentType, prop, Ref } from '../../src/typegoose';
import { Car } from './car';

export abstract class PersistentModel {
  @prop()
  public createdAt: Date;

  @arrayProp({ itemsRef: Car })
  public cars?: Ref<Car>[];

  // define an 'instanceMethod' that will be overwritten
  public getClassName() {
    return 'PersistentModel';
  }

  // define an 'instanceMethod' that will be overwritten
  public static getStaticName() {
    return 'PersistentModel';
  }

  // define an instanceMethod that is called by the derived class
  public async addCar(this: DocumentType<PersistentModel>, car: Car) {
    if (!this.cars) {
      this.cars = [];
    }

    this.cars.push(car);

    return this.save();
  }
}
