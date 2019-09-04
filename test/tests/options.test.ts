import { expect } from 'chai';

import { getClassForDocument, getModelForClass, modelOptions } from '../../src/typegoose';

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 * @example
 * ```
 * import { suite as OptionTests } from './options.test'
 * ...
 * describe('@modelOptions', OptionTests.bind(this));
 * ...
 * ```
 */
export function suite() {
  it('expect no changes to model Name when not using customOptions or collection', () => {
    class NormalOptions { }

    const model = getModelForClass(NormalOptions);
    expect(model.modelName).to.be.equal('NormalOptions');

    const doc = new model();
    const gotClass = getClassForDocument(doc);
    expect(gotClass).to.equals(NormalOptions);
  });

  it('expect if collection is defined to be automaticly used', () => {
    @modelOptions({ schemaOptions: { collection: 'Something' } })
    class CollectionOption { }

    const model = getModelForClass(CollectionOption);
    expect(model.modelName).to.be.equal('CollectionOption_Something');

    const doc = new model();
    const gotClass = getClassForDocument(doc);
    expect(gotClass).to.equals(CollectionOption);
  });

  it('expect if options.customName is defined to be used', () => {
    @modelOptions({ options: { customName: 'CustomName' } })
    class CustomNameOption { }

    const model = getModelForClass(CustomNameOption);
    expect(model.modelName).to.be.equal('CustomNameOption_CustomName');

    const doc = new model();
    const gotClass = getClassForDocument(doc);
    expect(gotClass).to.equals(CustomNameOption);
  });

  it('expect to use options.customName if both are defined', () => {
    @modelOptions({ options: { customName: 'CustomName2' }, schemaOptions: { collection: 'Something2' } })
    class BothOptions { }

    const model = getModelForClass(BothOptions);
    expect(model.modelName).to.be.equal('BothOptions_CustomName2');

    const doc = new model();
    const gotClass = getClassForDocument(doc);
    expect(gotClass).to.equals(BothOptions);
  });

  it('create multiple models depending on options', () => {
    class MultiModelBase { }

    {
      @modelOptions({ schemaOptions: { collection: 'Something' } })
      class MultiModel extends MultiModelBase { }

      const model = getModelForClass(MultiModel);
      expect(model.modelName).to.be.equal('MultiModel_Something');

      const doc = new model();
      const gotClass = getClassForDocument(doc);
      expect(gotClass).to.equals(MultiModel);
    }
    {
      @modelOptions({ schemaOptions: { collection: 'SomethingDifferent' } })
      class MultiModel extends MultiModelBase { }

      const model = getModelForClass(MultiModel);
      expect(model.modelName).to.be.equal('MultiModel_SomethingDifferent');

      const doc = new model();
      const gotClass = getClassForDocument(doc);
      expect(gotClass).to.equals(MultiModel);
    }
  });
}
