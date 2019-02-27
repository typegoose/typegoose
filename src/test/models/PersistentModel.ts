import * as tg from '../../typegoose';
import { Car } from './car';

export abstract class PersistentModel extends tg.Typegoose {
  @tg.prop()
  createdAt: Date;

  @tg.arrayProp({ itemsRef: Car })
  cars?: tg.Ref<Car>[];

  // define an 'instanceMethod' that will be overwritten
  @tg.instanceMethod
  getClassName() {
    return 'PersistentModel';
  }

  // define an 'instanceMethod' that will be overwritten
  @tg.staticMethod
  static getStaticName() {
    return 'PersistentModel';
  }

  // define an instanceMethod that is called by the derived class
  @tg.instanceMethod
  addCar(this: tg.InstanceType<PersistentModel>, car: Car) {
    if (!this.cars) {
      this.cars = [];
    }

    this.cars.push(car);

    return this.save();
  }
}
