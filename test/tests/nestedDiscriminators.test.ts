import { getModelForClass, modelOptions, mongoose, prop, getName } from '../../src/typegoose';

it('should make use of nested-discriminators [typegoose/typegoose#25]', async () => {
  enum BuildingTypes {
    Garage = 'GarageNormal',
    SummerHouse = 'SummerHouseNormal'
  }

  @modelOptions({
    schemaOptions: {
      discriminatorKey: 'type',
      // set to "throw" that if the discriminators dont get applied it fails instead of silently discarding non-existent values
      strict: 'throw',
      _id: false
    }
  })
  class BuildingNormal {
    @prop({ default: 100 })
    public width: number;

    @prop({ enum: BuildingTypes, required: true })
    public type: BuildingTypes;
  }

  class GarageNormal extends BuildingNormal {
    @prop({ default: 10 })
    public slotsForCars: number;
  }

  class SummerHouseNormal extends BuildingNormal {
    @prop({ default: 100 })
    public distanceToLake: number;
  }

  class AreaNormal {
    @prop({ type: BuildingNormal, discriminators: () => [GarageNormal, SummerHouseNormal] })
    public buildings: BuildingNormal[];
  }

  const AreaModel = getModelForClass(AreaNormal);

  {
    const area = await AreaModel.create({});
    area.buildings.push({ type: BuildingTypes.SummerHouse, distanceToLake: 100 } as SummerHouseNormal);
    area.buildings.push({ type: BuildingTypes.Garage, slotsForCars: 20 } as GarageNormal);
    await area.save();

    const docPOJO = area.toJSON();
    expect(docPOJO).toHaveProperty('buildings');
    expect(docPOJO.buildings).toEqual([
      {
        width: 100,
        type: getName(SummerHouseNormal),
        distanceToLake: 100
      },
      {
        width: 100,
        type: getName(GarageNormal),
        slotsForCars: 20
      }
    ]);

    const schemaPath: any = AreaModel.schema.path('buildings');
    expect(schemaPath).toBeInstanceOf(mongoose.Schema.Types.DocumentArray);
    expect(schemaPath.schemaOptions.type).toHaveProperty('discriminators');
  }
});

it('should make use of nested-discriminators (options as object) [typegoose/typegoose#25]', async () => {
  enum BuildingTypes {
    Garage = 'G',
    SummerHouse = 'S'
  }

  @modelOptions({
    schemaOptions: {
      discriminatorKey: 'type',
      // set to "throw" that if the discriminators dont get applied it fails instead of silently discarding non-existent values
      // strict: 'throw',
      _id: false
    }
  })
  class BuildingObject {
    @prop({ default: 100 })
    public width: number;

    @prop({ required: true, enum: BuildingTypes })
    public type: BuildingTypes;
  }

  class GarageObject extends BuildingObject {
    @prop({ default: 10 })
    public slotsForCars: number;
  }

  class SummerHouseObject extends BuildingObject {
    @prop({ default: 100 })
    public distanceToLake: number;
  }

  class AreaObject {
    @prop({
      type: BuildingObject,
      discriminators: () => [
        { type: GarageObject, name: BuildingTypes.Garage },
        { type: SummerHouseObject, name: BuildingTypes.SummerHouse }
      ]
    })
    public buildings: BuildingObject[];
  }

  const AreaModel = getModelForClass(AreaObject);

  {
    const area = await AreaModel.create({});
    area.buildings.push({ type: BuildingTypes.SummerHouse, distanceToLake: 100 } as SummerHouseObject);
    area.buildings.push({ type: BuildingTypes.Garage, slotsForCars: 20 } as GarageObject);
    await area.save();

    const docPOJO = area.toJSON();
    expect(docPOJO).toHaveProperty('buildings');
    expect(docPOJO.buildings).toEqual([
      {
        width: 100,
        type: BuildingTypes.SummerHouse,
        distanceToLake: 100
      },
      {
        width: 100,
        type: BuildingTypes.Garage,
        slotsForCars: 20
      }
    ]);

    const schemaPath: any = AreaModel.schema.path('buildings');
    expect(schemaPath).toBeInstanceOf(mongoose.Schema.Types.DocumentArray);
    expect(schemaPath.schemaOptions.type).toHaveProperty('discriminators');
  }
});
