import { constructors, models } from '../../src/internal/data';
import { getModelForClass, getName, modelOptions, mongoose, prop } from '../../src/typegoose';

beforeEach(() => {
  // Clear all models and caches, because in this test the names are re-used
  mongoose.deleteModel(/.*/);
  constructors.clear();
  models.clear();
});

it('should make use of nested-discriminators [typegoose/typegoose#25]', async () => {
  enum BuildingTypes {
    Garage = 'GarageNormal',
    SummerHouse = 'SummerHouseNormal',
  }

  @modelOptions({
    schemaOptions: {
      discriminatorKey: 'type',
      // set to "throw" that if the discriminators don't get applied it fails instead of silently discarding non-existent values
      strict: 'throw',
      _id: false,
    },
  })
  class BuildingNormal {
    @prop({ required: true })
    public width!: number;

    @prop({ enum: BuildingTypes, required: true })
    public type!: BuildingTypes;
  }

  class GarageNormal extends BuildingNormal {
    @prop({ required: true })
    public slotsForCars!: number;
  }

  class SummerHouseNormal extends BuildingNormal {
    @prop({ required: true })
    public distanceToLake!: number;
  }

  class AreaNormal {
    @prop({ type: BuildingNormal, discriminators: () => [GarageNormal, SummerHouseNormal], required: true })
    public buildings!: BuildingNormal[];
  }

  const AreaModel = getModelForClass(AreaNormal);

  {
    const area = await AreaModel.create({
      buildings: [
        { type: BuildingTypes.SummerHouse, distanceToLake: 100, width: 80 } as SummerHouseNormal,
        { type: BuildingTypes.Garage, slotsForCars: 20, width: 50 } as GarageNormal,
      ],
    });

    const docPOJO = area.toJSON();
    expect(docPOJO).toHaveProperty('buildings');
    expect(docPOJO.buildings).toEqual([
      {
        width: 80,
        type: getName(SummerHouseNormal),
        distanceToLake: 100,
      },
      {
        width: 50,
        type: getName(GarageNormal),
        slotsForCars: 20,
      },
    ]);

    const schemaPath: any = AreaModel.schema.path('buildings');
    expect(schemaPath).toBeInstanceOf(mongoose.Schema.Types.DocumentArray);
    expect(schemaPath.schemaOptions.type).toHaveProperty('discriminators');
  }
});

it('should make use of nested-discriminators (options as object) [typegoose/typegoose#25]', async () => {
  enum BuildingTypes {
    Garage = 'G',
    SummerHouse = 'S',
  }

  @modelOptions({
    schemaOptions: {
      discriminatorKey: 'type',
      // set to "throw" that if the discriminators don't get applied it fails instead of silently discarding non-existent values
      // strict: 'throw',
      _id: false,
    },
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
        { type: GarageObject, value: BuildingTypes.Garage },
        { type: SummerHouseObject, value: BuildingTypes.SummerHouse },
      ],
    })
    public buildings: BuildingObject[];
  }

  const AreaModel = getModelForClass(AreaObject);

  {
    const area = await AreaModel.create({
      buildings: [
        { type: BuildingTypes.SummerHouse, distanceToLake: 100 } as SummerHouseObject,
        { type: BuildingTypes.Garage, slotsForCars: 20 } as GarageObject,
      ],
    });

    const docPOJO = area.toJSON();
    expect(docPOJO).toHaveProperty('buildings');
    expect(docPOJO.buildings).toEqual([
      {
        width: 100,
        type: BuildingTypes.SummerHouse,
        distanceToLake: 100,
      },
      {
        width: 100,
        type: BuildingTypes.Garage,
        slotsForCars: 20,
      },
    ]);

    const schemaPath: any = AreaModel.schema.path('buildings');
    expect(schemaPath).toBeInstanceOf(mongoose.Schema.Types.DocumentArray);
    expect(schemaPath.schemaOptions.type).toHaveProperty('discriminators');
  }
});

it('should work on multi-dimensional arrays', async () => {
  enum BuildingTypes {
    Garage = 'G',
    SummerHouse = 'S',
  }

  @modelOptions({
    schemaOptions: {
      discriminatorKey: 'type',
      // set to "throw" that if the discriminators don't get applied it fails instead of silently discarding non-existent values
      // strict: 'throw',
      _id: false,
    },
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
      type: [[BuildingObject]],
      discriminators: () => [
        { type: GarageObject, value: BuildingTypes.Garage },
        { type: SummerHouseObject, value: BuildingTypes.SummerHouse },
      ],
    })
    public buildings: BuildingObject[][];
  }

  const AreaModel = getModelForClass(AreaObject);

  {
    const schema = AreaModel.schema;
    type ArrayPathLevel1 = mongoose.Schema.Types.Array & { casterConstructor: { caster: mongoose.Schema.Types.String } };
    const schemaPathLevel1: ArrayPathLevel1 = schema.path('buildings') as any;
    // console.log('level 1', schemaPathLevel1);
    expect(schemaPathLevel1).toBeInstanceOf(mongoose.Schema.Types.Array);
    type ArrayPathLevel2 = mongoose.Schema.Types.DocumentArray & {
      casterConstructor: { caster: mongoose.Schema.Types.String };
      schemaOptions: any;
    };
    const schemaPathLevel2: ArrayPathLevel2 = schema.path('buildings.$') as any;
    // console.log('level 2', schemaPathLevel2.schemaOptions.type.discriminators);
    expect(schemaPathLevel2).toBeInstanceOf(mongoose.Schema.Types.DocumentArray);
    expect(schemaPathLevel2.schemaOptions.type).toHaveProperty('discriminators');
  }

  {
    const area = await AreaModel.create({
      buildings: [
        [
          { type: BuildingTypes.SummerHouse, distanceToLake: 100 } as SummerHouseObject,
          { type: BuildingTypes.Garage, slotsForCars: 20 } as GarageObject,
        ],
      ],
    });

    const docPOJO = area.toJSON();
    expect(docPOJO).toHaveProperty('buildings');
    expect(docPOJO.buildings[0]).toEqual([
      {
        width: 100,
        type: BuildingTypes.SummerHouse,
        distanceToLake: 100,
      },
      {
        width: 100,
        type: BuildingTypes.Garage,
        slotsForCars: 20,
      },
    ]);
  }
});

describe('as model-option on base', () => {
  it('should make use of nested-discriminators [typegoose/typegoose#25]', async () => {
    enum BuildingTypes {
      Garage = 'GarageNormal',
      SummerHouse = 'SummerHouseNormal',
    }

    @modelOptions({
      schemaOptions: {
        discriminatorKey: 'type',
        // set to "throw" that if the discriminators don't get applied it fails instead of silently discarding non-existent values
        strict: 'throw',
        _id: false,
      },
      options: {
        discriminators: () => [GarageNormal, SummerHouseNormal],
      },
    })
    class BuildingNormal {
      @prop({ required: true })
      public width!: number;

      @prop({ enum: BuildingTypes, required: true })
      public type!: BuildingTypes;
    }

    class GarageNormal extends BuildingNormal {
      @prop({ required: true })
      public slotsForCars!: number;
    }

    class SummerHouseNormal extends BuildingNormal {
      @prop({ required: true })
      public distanceToLake!: number;
    }

    class AreaNormal {
      @prop({ type: BuildingNormal, required: true })
      public buildings!: BuildingNormal[];
    }

    const AreaModel = getModelForClass(AreaNormal);

    {
      const area = await AreaModel.create({
        buildings: [
          { type: BuildingTypes.SummerHouse, distanceToLake: 100, width: 80 } as SummerHouseNormal,
          { type: BuildingTypes.Garage, slotsForCars: 20, width: 50 } as GarageNormal,
        ],
      });

      const docPOJO = area.toJSON();
      expect(docPOJO).toHaveProperty('buildings');
      expect(docPOJO.buildings).toEqual([
        {
          width: 80,
          type: getName(SummerHouseNormal),
          distanceToLake: 100,
        },
        {
          width: 50,
          type: getName(GarageNormal),
          slotsForCars: 20,
        },
      ]);

      const schemaPath: any = AreaModel.schema.path('buildings');
      expect(schemaPath).toBeInstanceOf(mongoose.Schema.Types.DocumentArray);
      expect(schemaPath.schemaOptions.type).toHaveProperty('discriminators');
    }
  });

  it('should make use of nested-discriminators (options as object) [typegoose/typegoose#25]', async () => {
    enum BuildingTypes {
      Garage = 'G',
      SummerHouse = 'S',
    }

    @modelOptions({
      schemaOptions: {
        discriminatorKey: 'type',
        // set to "throw" that if the discriminators don't get applied it fails instead of silently discarding non-existent values
        // strict: 'throw',
        _id: false,
      },
      options: {
        discriminators: () => [
          { type: GarageObject, value: BuildingTypes.Garage },
          { type: SummerHouseObject, value: BuildingTypes.SummerHouse },
        ],
      },
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
      })
      public buildings: BuildingObject[];
    }

    const AreaModel = getModelForClass(AreaObject);

    {
      const area = await AreaModel.create({
        buildings: [
          { type: BuildingTypes.SummerHouse, distanceToLake: 100 } as SummerHouseObject,
          { type: BuildingTypes.Garage, slotsForCars: 20 } as GarageObject,
        ],
      });

      const docPOJO = area.toJSON();
      expect(docPOJO).toHaveProperty('buildings');
      expect(docPOJO.buildings).toEqual([
        {
          width: 100,
          type: BuildingTypes.SummerHouse,
          distanceToLake: 100,
        },
        {
          width: 100,
          type: BuildingTypes.Garage,
          slotsForCars: 20,
        },
      ]);

      const schemaPath: any = AreaModel.schema.path('buildings');
      expect(schemaPath).toBeInstanceOf(mongoose.Schema.Types.DocumentArray);
      expect(schemaPath.schemaOptions.type).toHaveProperty('discriminators');
    }
  });
});
