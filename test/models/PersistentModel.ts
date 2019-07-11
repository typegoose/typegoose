import * as tg from '../../src/typegoose';
import { Car } from './car';

export abstract class PersistentModel extends tg.Typegoose {
  @tg.prop()
  public createdAt: Date;

  @tg.arrayProp({ itemsRef: Car })
  public cars?: tg.Ref<Car>[];

  // define an 'instanceMethod' that will be overwritten
  @tg.instanceMethod
  public getClassName() {
    return 'PersistentModel';
  }

  // define an 'instanceMethod' that will be overwritten
  @tg.staticMethod
  public static getStaticName() {
    return 'PersistentModel';
  }

  // define an instanceMethod that is called by the derived class
  @tg.instanceMethod
  public addCar(this: tg.InstanceType<PersistentModel>, car: Car) {
    if (!this.cars) {
      this.cars = [];
    }

    this.cars.push(car);

    return this.save();
  }
}
