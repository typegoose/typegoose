import { constructors, models, schemas } from '../../src/internal/data.js';
import { getClass, getClassForDocument, getModelForClass, modelOptions, prop } from '../../src/typegoose.js';

it('expect no changes to model Name when not using customOptions or collection', () => {
  class NormalOptions {}

  const model = getModelForClass(NormalOptions);
  expect(model.modelName).toEqual('NormalOptions');

  const doc = new model();
  const gotClass = getClassForDocument(doc);
  expect(gotClass).toEqual(NormalOptions);
});

it('if collection is defined to be automatically used with automaticName', () => {
  @modelOptions({ schemaOptions: { collection: 'Something' }, options: { automaticName: true } })
  class CollectionOption {}

  const model = getModelForClass(CollectionOption);
  expect(model.modelName).toEqual('CollectionOption_Something');

  const doc = new model();
  const gotClass = getClassForDocument(doc);
  expect(gotClass).toEqual(CollectionOption);
});

it('if options.customName is defined to be used with automaticName', () => {
  @modelOptions({ options: { customName: 'CustomName', automaticName: true } })
  class CustomNameOption {}

  const model = getModelForClass(CustomNameOption);
  expect(model.modelName).toEqual('CustomNameOption_CustomName');

  const doc = new model();
  const gotClass = getClassForDocument(doc);
  expect(gotClass).toEqual(CustomNameOption);
});

it('expect to use options.customName if both are defined with automaticName', () => {
  @modelOptions({ options: { customName: 'CustomName2', automaticName: true }, schemaOptions: { collection: 'Something2' } })
  class BothOptions {}

  const model = getModelForClass(BothOptions);
  expect(model.modelName).toEqual('BothOptions_CustomName2');

  const doc = new model();
  const gotClass = getClassForDocument(doc);
  expect(gotClass).toEqual(BothOptions);
});

it('create multiple models depending on options with base class (extends) with automaticName', () => {
  class MultiModelBase {}

  {
    @modelOptions({ schemaOptions: { collection: 'Something' }, options: { automaticName: true } })
    class MultiModel extends MultiModelBase {}

    const model = getModelForClass(MultiModel);
    expect(model.modelName).toEqual('MultiModel_Something');

    const doc = new model();
    const gotClass = getClassForDocument(doc);
    expect(gotClass).toEqual(MultiModel);
  }
  {
    @modelOptions({ schemaOptions: { collection: 'SomethingDifferent' }, options: { automaticName: true } })
    class MultiModel extends MultiModelBase {}

    const model = getModelForClass(MultiModel);
    expect(model.modelName).toEqual('MultiModel_SomethingDifferent');

    const doc = new model();
    const gotClass = getClassForDocument(doc);
    expect(gotClass).toEqual(MultiModel);
  }
});

it('create multiple models depending on options without base model with automaticName', () => {
  {
    @modelOptions({ schemaOptions: { collection: 'SomethingNoExtend' }, options: { automaticName: true } })
    class MultiModel {
      @prop({ default: '1' })
      public t1: string;

      @prop({ default: '2' })
      public t2: string;
    }

    const model = getModelForClass(MultiModel);
    expect(model.modelName).toEqual('MultiModel_SomethingNoExtend');

    const doc = new model();

    expect(doc).not.toBeUndefined();
    expect(doc.t1).toEqual('1');
    expect(doc.t2).toEqual('2');
    expect(doc).not.toHaveProperty('t3');
    expect(doc).not.toHaveProperty('t4');

    const gotClass = getClassForDocument(doc);
    expect(gotClass).toEqual(MultiModel);
  }
  {
    @modelOptions({ schemaOptions: { collection: 'SomethingDifferentNoExtend' }, options: { automaticName: true } })
    class MultiModel {
      @prop({ default: '3' })
      public t3: string;

      @prop({ default: '4' })
      public t4: string;
    }

    const model = getModelForClass(MultiModel);
    expect(model.modelName).toEqual('MultiModel_SomethingDifferentNoExtend');

    const doc = new model();

    expect(doc).not.toBeUndefined();
    expect(doc).not.toHaveProperty('t1');
    expect(doc).not.toHaveProperty('t2');
    expect(doc.t3).toEqual('3');
    expect(doc.t4).toEqual('4');

    const gotClass = getClassForDocument(doc);
    expect(gotClass).toEqual(MultiModel);
  }
});

it('should not make an automatic name (automaticName)', () => {
  @modelOptions({ options: { automaticName: false, customName: 'DAN' } })
  class DisableAutomaticName {
    @prop()
    public test: string;
  }

  const model = getModelForClass(DisableAutomaticName);
  expect(model.modelName).toEqual('DAN');
});

it('should use the given function to create the custom name', () => {
  @modelOptions({
    schemaOptions: { collection: 'SomethingDifferent' },
    options: {
      automaticName: false,
      customName: (options) => `${options.schemaOptions?.collection}_someSuffix`,
    },
  })
  class UseFunctionForName {
    @prop()
    public test: string;
  }

  const model = getModelForClass(UseFunctionForName);
  expect(model.modelName).toEqual('SomethingDifferent_someSuffix');
});

it('should use the given function to create the custom name and ignore automatic name creation', () => {
  @modelOptions({
    schemaOptions: { collection: 'SomethingDifferent' },
    options: {
      automaticName: true,
      customName: (options) => `${options.schemaOptions?.collection}_someSuffix`,
    },
  })
  class UseFunctionForName2 {
    @prop()
    public test: string;
  }

  const model = getModelForClass(UseFunctionForName2);
  expect(model.modelName).toEqual('SomethingDifferent_someSuffix');
});

it('should not make an automatic name if no collection or customName are defined (automaticName)', () => {
  @modelOptions({ options: { automaticName: true } })
  class NoAutomaticName {
    @prop()
    public test: string;
  }

  const model = getModelForClass(NoAutomaticName);
  expect(model.modelName).toEqual('NoAutomaticName');
});

it('should use customName from getModelForClass', () => {
  class CustomNameGetModelForClass {
    @prop()
    public test: string;
  }

  const model = getModelForClass(CustomNameGetModelForClass, { options: { customName: 'CustomName' } });
  expect(model.modelName).toEqual('CustomName');
  const doc = new model();
  expect(doc.typegooseName()).toEqual('CustomName');
  expect(schemas.get(model.modelName)).toBeUndefined();
  expect(constructors.get(model.modelName)).toBeDefined();
  expect(models.get(model.modelName)).toEqual(model);
});

it('should use customName from getModelForClass over the one defined via modelOptions', () => {
  @modelOptions({
    options: {
      customName: 'WrongName',
    },
  })
  class CustomNameGetModelForClassOverModelOptions {
    @prop()
    public test: string;
  }

  const model = getModelForClass(CustomNameGetModelForClassOverModelOptions, { options: { customName: 'RightName' } });
  expect(model.modelName).toEqual('RightName');
  const doc = new model();
  expect(doc.typegooseName()).toEqual('RightName');
  expect(schemas.get(model.modelName)).toBeUndefined();
  expect(constructors.get(model.modelName)).toBeDefined();
  expect(models.get(model.modelName)).toEqual(model);
});

it('should use customName provided via getModelForClass with automaticName from modelOptions', () => {
  @modelOptions({ options: { automaticName: true } })
  class CustomNameOption {}

  const model = getModelForClass(CustomNameOption, { options: { customName: 'CustomName1' } });
  expect(model.modelName).toEqual('CustomNameOption_CustomName1');
  const doc = new model();
  expect(doc.typegooseName()).toEqual('CustomNameOption_CustomName1');
  expect(schemas.get(model.modelName)).toBeUndefined();
  expect(constructors.get(model.modelName)).toBeDefined();
  expect(models.get(model.modelName)).toEqual(model);
});

it('should use customName and automaticName provided via getModelForClass', () => {
  class CustomNameOption {}

  const model = getModelForClass(CustomNameOption, { options: { customName: 'CustomName2', automaticName: true } });
  expect(model.modelName).toEqual('CustomNameOption_CustomName2');
  const doc = new model();
  expect(doc.typegooseName()).toEqual('CustomNameOption_CustomName2');
  expect(schemas.get(model.modelName)).toBeUndefined();
  expect(constructors.get(model.modelName)).toBeDefined();
  expect(models.get(model.modelName)).toEqual(model);
});

it('should use customName provided via getModelForClass and work with getClass', () => {
  class WithGetClass {}

  const model = getModelForClass(WithGetClass, { options: { customName: 'CustomNameWithGetClass', automaticName: false } });
  expect(model.modelName).toEqual('CustomNameWithGetClass');

  const retrievedClass = getClass('CustomNameWithGetClass');
  expect(retrievedClass).toBe(WithGetClass);
});

it('should use customName provided via getModelForClass and work with getClass', () => {
  class WithAutomaticNameAndGetClass {}

  const model = getModelForClass(WithAutomaticNameAndGetClass, { options: { customName: 'CustomName', automaticName: true } });
  expect(model.modelName).toEqual('WithAutomaticNameAndGetClass_CustomName');

  const retrievedClass = getClass('WithAutomaticNameAndGetClass_CustomName');
  expect(retrievedClass).toBe(WithAutomaticNameAndGetClass);
});
