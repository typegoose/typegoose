import { arrayProp, prop } from '../../src/prop';
import { getModelForClass, modelOptions } from '../../src/typegoose';

@modelOptions({
  schemaOptions: {
    discriminatorKey: 'width',
    collection: 'buildings'
  }
})
export class Building {
  @prop({default: 100})
  public width: number;
}

export class OfficeBuilding extends Building {
  @prop({default: 4})
  public doors: number;
}

export class Garage extends Building {
  @prop({default: 10})
  public slotsForCars: number;
}

@modelOptions({
  schemaOptions: {
    collection: 'skyscrapers'
  }
})
export class Skyscraper extends OfficeBuilding {
  @prop({default: 'Some cool string'})
  public name: string;

  @prop()
  public mainGarage: Garage;

  @arrayProp({items: Garage})
  public garagesInArea: Garage[];
}

export const model = getModelForClass<Skyscraper, any >(Skyscraper);
