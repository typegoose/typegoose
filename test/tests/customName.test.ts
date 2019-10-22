import { expect } from 'chai';

import { getClassForDocument, getModelForClass, modelOptions, prop } from '../../src/typegoose';

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
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

  it('expect if collection is defined to be automaticly used with automaticName', () => {
    @modelOptions({ schemaOptions: { collection: 'Something' }, options: { automaticName: true } })
    class CollectionOption { }

    const model = getModelForClass(CollectionOption);
    expect(model.modelName).to.be.equal('CollectionOption_Something');

    const doc = new model();
    const gotClass = getClassForDocument(doc);
    expect(gotClass).to.equals(CollectionOption);
  });

  it('expect if options.customName is defined to be used with automaticName', () => {
    @modelOptions({ options: { customName: 'CustomName', automaticName: true } })
    class CustomNameOption { }

    const model = getModelForClass(CustomNameOption);
    expect(model.modelName).to.be.equal('CustomNameOption_CustomName');

    const doc = new model();
    const gotClass = getClassForDocument(doc);
    expect(gotClass).to.equals(CustomNameOption);
  });

  it('expect to use options.customName if both are defined with automaticName', () => {
    @modelOptions({ options: { customName: 'CustomName2', automaticName: true }, schemaOptions: { collection: 'Something2' } })
    class BothOptions { }

    const model = getModelForClass(BothOptions);
    expect(model.modelName).to.be.equal('BothOptions_CustomName2');

    const doc = new model();
    const gotClass = getClassForDocument(doc);
    expect(gotClass).to.equals(BothOptions);
  });

  it('create multiple models depending on options with base class (extends) with automaticName', () => {
    class MultiModelBase { }

    {
      @modelOptions({ schemaOptions: { collection: 'Something' }, options: { automaticName: true } })
      class MultiModel extends MultiModelBase { }

      const model = getModelForClass(MultiModel);
      expect(model.modelName).to.be.equal('MultiModel_Something');

      const doc = new model();
      const gotClass = getClassForDocument(doc);
      expect(gotClass).to.equals(MultiModel);
    }
    {
      @modelOptions({ schemaOptions: { collection: 'SomethingDifferent' }, options: { automaticName: true } })
      class MultiModel extends MultiModelBase { }

      const model = getModelForClass(MultiModel);
      expect(model.modelName).to.be.equal('MultiModel_SomethingDifferent');

      const doc = new model();
      const gotClass = getClassForDocument(doc);
      expect(gotClass).to.equals(MultiModel);
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
      expect(model.modelName).to.be.equal('MultiModel_SomethingNoExtend');

      const doc = new model();

      expect(doc).to.not.be.an('undefined');
      expect(doc.t1).to.equal('1');
      expect(doc.t2).to.equal('2');
      expect(doc).to.not.have.property('t3');
      expect(doc).to.not.have.property('t4');

      const gotClass = getClassForDocument(doc);
      expect(gotClass).to.equals(MultiModel);
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
      expect(model.modelName).to.be.equal('MultiModel_SomethingDifferentNoExtend');

      const doc = new model();

      expect(doc).to.not.be.an('undefined');
      expect(doc).to.not.have.property('t1');
      expect(doc).to.not.have.property('t2');
      expect(doc.t3).to.equal('3');
      expect(doc.t4).to.equal('4');

      const gotClass = getClassForDocument(doc);
      expect(gotClass).to.equals(MultiModel);
    }
  });

  it('should not make an automatic name (automaticName)', () => {
    @modelOptions({ options: { automaticName: false, customName: 'DAN' } })
    class DisableAutomaticName {
      @prop()
      public test: string;
    }

    const model = getModelForClass(DisableAutomaticName);
    expect(model.modelName).to.be.equal('DAN');
  });
}
