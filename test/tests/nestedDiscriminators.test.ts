import { getModelForClass, modelOptions, mongoose, prop } from '../../src/typegoose';

it('should make use of nested-discriminators [typegoose/typegoose#25]', async () => {
  enum BuildingTypes {
    Garage = 'Garage',
    SummerHouse = 'SummerHouse'
  }

  @modelOptions({
    schemaOptions: {
      discriminatorKey: 'type',
      // set to "throw" that if the discriminators dont get applied it fails instead of silently discarding non-existent values
      strict: 'throw',
      _id: false
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
    @prop({ type: Building, discriminators: () => [Garage, SummerHouse] })
    public buildings: Building[];
  }

  const AreaModel = getModelForClass(Area);

  {
    const area = await AreaModel.create({});
    area.buildings.push({ type: BuildingTypes.SummerHouse, distanceToLake: 100 } as SummerHouse);
    area.buildings.push({ type: BuildingTypes.Garage, slotsForCars: 20 } as Garage);
    await area.save();

    const docPOJO = area.toJSON();
    expect(docPOJO).toHaveProperty('buildings');
    expect(docPOJO.buildings).toEqual([
      {
        width: 100,
        type: 'SummerHouse',
        distanceToLake: 100
      },
      {
        width: 100,
        type: 'Garage',
        slotsForCars: 20
      }
    ]);

    const schemaPath: any = AreaModel.schema.path('buildings');
    expect(schemaPath).toBeInstanceOf(mongoose.Schema.Types.DocumentArray);
    expect(schemaPath.schemaOptions.type).toHaveProperty('discriminators');
  }
});
