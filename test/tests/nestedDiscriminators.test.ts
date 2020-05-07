import { arrayProp, getModelForClass, getNestedDiscriminatorForClass, modelOptions, prop } from '../../src/typegoose';

it('should make use of nested-discriminators [typegoose/typegoose#25]', async () => {
  enum BuildingTypes {
    Garage = 'Garage',
    SummerHouse = 'SummerHouse'
  }

  @modelOptions({
    schemaOptions: {
      discriminatorKey: 'type'
    }
  })
  class Building {
    @prop({ default: 100 })
    public width: number;

    @prop({ enum: BuildingTypes })
    public type: BuildingTypes;
  }

  class Garage extends Building {
    @prop({ default: 10 })
    public slotsForCars: number;
  }

  class SummerHouse extends Building {
    @prop({ default: 100 })
    public distanceToLake: number;
  }

  class Area {
    @arrayProp({ items: Building })
    public buildings: Building[];
  }

  // const AreaSchema = buildSchema(Area);
  const AreaModel = getModelForClass(Area);
  // const docArray: mongoose.Schema.Types.DocumentArray | any = AreaSchema.path('buildings');

  // if (!(docArray instanceof mongoose.Schema.Types.DocumentArray)) {
  //   throw new Error('Expected "docArray" to be an mongoose.Types.DocumentArray');
  // }

  // const BuildingModel = getModelForClass(Building);
  const GarageModel = getNestedDiscriminatorForClass(AreaModel, 'buildings', Garage, BuildingTypes.Garage);
  const SummerHouseModel = getNestedDiscriminatorForClass(AreaModel, 'buildings', SummerHouse, BuildingTypes.SummerHouse);

  // const AreaModel = mongoose.model('Area', AreaSchema) as ReturnModelType<typeof Area>;
  // addModelToTypegoose(AreaModel, Area);

  {
    const area = await AreaModel.create({});
    area.buildings.push({ type: BuildingTypes.SummerHouse, distanceToLake: 100 } as SummerHouse);
    area.buildings.push({ type: BuildingTypes.Garage, slotsForCars: 20 } as Garage);
    await area.save();

    console.log(area);
    console.log(area.schema.path('buildings'));
  }
});
