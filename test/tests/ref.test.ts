import { expect } from 'chai';
import * as mongoose from 'mongoose';

import { isDocument, isDocumentArray } from '../../src/typeguards';
import { RefTestBufferModel, RefTestModel, RefTestNumberModel, RefTestStringModel } from '../models/refTests';

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 */
export function suite() {
  it('check generated ref schema for ObjectID _id', async () => {
    expect((RefTestModel.schema.path('refField') as any).instance).to.equal('ObjectID');
    expect((RefTestModel.schema.path('refField') as any).options.ref).to.equal('RefTest');
    expect((RefTestModel.schema.path('refField2') as any).instance).to.equal('ObjectID');
    expect((RefTestModel.schema.path('refField2') as any).options.ref).to.equal('RefTest');

    expect((RefTestModel.schema.path('refArray') as any).instance).to.equal('Array');
    expect((RefTestModel.schema.path('refArray') as any).caster.instance).to.equal('ObjectID');
    expect((RefTestModel.schema.path('refArray') as any).caster.options.ref).to.equal('RefTest');
    expect((RefTestModel.schema.path('refArray2') as any).instance).to.equal('Array');
    expect((RefTestModel.schema.path('refArray2') as any).caster.instance).to.equal('ObjectID');
    expect((RefTestModel.schema.path('refArray2') as any).caster.options.ref).to.equal('RefTest');
  });

  it('check generated ref schema for string _id', async () => {
    expect((RefTestModel.schema.path('refFieldString') as any).instance).to.equal('String');
    expect((RefTestModel.schema.path('refFieldString') as any).options.ref).to.equal('RefTestString');
    expect((RefTestModel.schema.path('refFieldString2') as any).instance).to.equal('String');
    expect((RefTestModel.schema.path('refFieldString2') as any).options.ref).to.equal('RefTestString');

    expect((RefTestModel.schema.path('refArrayString') as any).instance).to.equal('Array');
    expect((RefTestModel.schema.path('refArrayString') as any).caster.instance).to.equal('String');
    expect((RefTestModel.schema.path('refArrayString') as any).caster.options.ref).to.equal('RefTestString');
    expect((RefTestModel.schema.path('refArrayString2') as any).instance).to.equal('Array');
    expect((RefTestModel.schema.path('refArrayString2') as any).caster.instance).to.equal('String');
    expect((RefTestModel.schema.path('refArrayString2') as any).caster.options.ref).to.equal('RefTestString');
  });

  it('check generated ref schema for number _id', async () => {
    expect((RefTestModel.schema.path('refFieldNumber') as any).instance).to.equal('Number');
    expect((RefTestModel.schema.path('refFieldNumber') as any).options.ref).to.equal('RefTestNumber');
    expect((RefTestModel.schema.path('refFieldNumber2') as any).instance).to.equal('Number');
    expect((RefTestModel.schema.path('refFieldNumber2') as any).options.ref).to.equal('RefTestNumber');

    expect((RefTestModel.schema.path('refArrayNumber') as any).instance).to.equal('Array');
    expect((RefTestModel.schema.path('refArrayNumber') as any).caster.instance).to.equal('Number');
    expect((RefTestModel.schema.path('refArrayNumber') as any).caster.options.ref).to.equal('RefTestNumber');
    expect((RefTestModel.schema.path('refArrayNumber2') as any).instance).to.equal('Array');
    expect((RefTestModel.schema.path('refArrayNumber2') as any).caster.instance).to.equal('Number');
    expect((RefTestModel.schema.path('refArrayNumber2') as any).caster.options.ref).to.equal('RefTestNumber');
  });

  it('check generated ref schema for Buffer _id', async () => {
    expect((RefTestModel.schema.path('refFieldBuffer') as any).instance).to.equal('Buffer');
    expect((RefTestModel.schema.path('refFieldBuffer') as any).options.ref).to.equal('RefTestBuffer');
    expect((RefTestModel.schema.path('refFieldBuffer2') as any).instance).to.equal('Buffer');
    expect((RefTestModel.schema.path('refFieldBuffer2') as any).options.ref).to.equal('RefTestBuffer');

    expect((RefTestModel.schema.path('refArrayBuffer') as any).instance).to.equal('Array');
    expect((RefTestModel.schema.path('refArrayBuffer') as any).caster.instance).to.equal('Buffer');
    expect((RefTestModel.schema.path('refArrayBuffer') as any).caster.options.ref).to.equal('RefTestBuffer');
    expect((RefTestModel.schema.path('refArrayBuffer2') as any).instance).to.equal('Array');
    expect((RefTestModel.schema.path('refArrayBuffer2') as any).caster.instance).to.equal('Buffer');
    expect((RefTestModel.schema.path('refArrayBuffer2') as any).caster.options.ref).to.equal('RefTestBuffer');
  });

  it('check reference with string _id', async () => {
    const id1 = 'testid1';
    const id2 = 'testid2';

    const refTypeTest = new RefTestModel();
    refTypeTest.refFieldString = id1;
    refTypeTest.refArrayString = [id1, id2];
    refTypeTest.refFieldString = new RefTestStringModel();
    refTypeTest.refArrayString = [new RefTestStringModel(), new RefTestStringModel()];

    const { _id: _id1 } = await RefTestStringModel.create({ _id: id1 });
    expect(_id1).to.equal(id1);
    const { _id: _id2 } = await RefTestStringModel.create({ _id: id2 });
    expect(_id2).to.equal(id2);

    const { _id: refStringId } = await RefTestModel.create({ refFieldString: _id1 });
    const { refFieldString } = await RefTestModel.findById(refStringId).exec();
    expect(refFieldString).to.equal(_id1);
    const { _id: refArrayId } = await RefTestModel.create({ refArrayString: [_id1, _id2] });
    const { refArrayString } = await RefTestModel.findById(refArrayId).exec();
    expect(refArrayString).to.deep.equal([_id1, _id2]);
  });

  it('check reference with number _id', async () => {
    const id1 = 1234;
    const id2 = 5678;

    const refTypeTest = new RefTestModel();
    refTypeTest.refFieldNumber = id1;
    refTypeTest.refArrayNumber = [id1, id2];
    refTypeTest.refFieldNumber = new RefTestNumberModel();
    refTypeTest.refArrayNumber = [new RefTestNumberModel(), new RefTestNumberModel()];

    const { _id: _id1 } = await RefTestNumberModel.create({ _id: id1 });
    expect(_id1).to.equal(id1);
    const { _id: _id2 } = await RefTestNumberModel.create({ _id: id2 });
    expect(_id2).to.equal(id2);

    const { _id: refNumberId } = await RefTestModel.create({ refFieldNumber: _id1 });
    const { refFieldNumber } = await RefTestModel.findById(refNumberId).exec();
    expect(refFieldNumber).to.equal(_id1);
    const { _id: refArrayId } = await RefTestModel.create({ refArrayNumber: [_id1, _id2] });
    const { refArrayNumber } = await RefTestModel.findById(refArrayId).exec();
    expect(refArrayNumber).to.deep.equal([_id1, _id2]);
  });

  it('check reference with buffer _id', async () => {
    const id1 = Buffer.from([1, 2, 3, 4]);
    const id2 = Buffer.from([5, 6, 7, 8]);

    const refTypeTest = new RefTestModel();
    refTypeTest.refFieldBuffer = id1;
    refTypeTest.refArrayBuffer = [id1, id2];
    refTypeTest.refFieldBuffer = new RefTestBufferModel();
    refTypeTest.refArrayBuffer = [new RefTestBufferModel(), new RefTestBufferModel()];

    const { _id: _id1 } = await RefTestBufferModel.create({ _id: id1 });
    expect(_id1.equals(id1)).to.equal(true);
    const { _id: _id2 } = await RefTestBufferModel.create({ _id: id2 });
    expect(_id2.equals(id2)).to.equal(true);

    const { _id: refBufferId } = await RefTestModel.create({ refFieldBuffer: _id1 });
    const { refFieldBuffer } = await RefTestModel.findById(refBufferId).exec();
    expect(_id1.equals(refFieldBuffer)).to.equal(true);
    const { _id: refArrayId } = await RefTestModel.create({ refArrayBuffer: [_id1, _id2] });
    const { refArrayBuffer } = await RefTestModel.findById(refArrayId).exec();
    expect(refArrayBuffer).to.deep.equal([_id1, _id2]);
  });

  it('check typeguards', async () => {
    const idFields = await RefTestModel.create({
      refField: mongoose.Types.ObjectId(),
      refArray: [mongoose.Types.ObjectId()],
      refFieldString: 'test1',
      refArrayString: ['test1', 'test2'],
      refFieldNumber: 1234,
      refArrayNumber: [1234, 5678],
      refFieldBuffer: Buffer.from([1, 2, 3, 4]),
      refArrayBuffer: [Buffer.from([1, 2, 3, 4]), Buffer.from([5, 6, 7, 8])]
    });

    expect(isDocument(idFields.refField)).to.equal(false);
    expect(isDocument(idFields.refFieldString)).to.equal(false);
    expect(isDocument(idFields.refFieldNumber)).to.equal(false);
    expect(isDocument(idFields.refFieldBuffer)).to.equal(false);

    expect(isDocumentArray(idFields.refArray)).to.equal(false);
    expect(isDocumentArray(idFields.refArrayString)).to.equal(false);
    expect(isDocumentArray(idFields.refArrayNumber)).to.equal(false);
    expect(isDocumentArray(idFields.refArrayBuffer)).to.equal(false);

    const { _id: populatedId } = await RefTestModel.create({
      refField: await RefTestModel.create({}),
      refArray: [await RefTestModel.create({}), await RefTestModel.create({})],
      refFieldString: await RefTestStringModel.create({ _id: 'atest1' }),
      refArrayString: [
        await RefTestStringModel.create({ _id: 'btest2' }),
        await RefTestStringModel.create({ _id: 'ctest3' })
      ],
      refFieldNumber: await RefTestNumberModel.create({ _id: 12345 }),
      refArrayNumber: [
        await RefTestNumberModel.create({ _id: 56789 }),
        await RefTestNumberModel.create({ _id: 98765 })
      ],
      refFieldBuffer: await RefTestBufferModel.create({ _id: Buffer.from([1, 2, 3, 4, 5]) }),
      refArrayBuffer: [
        await RefTestBufferModel.create({ _id: Buffer.from([5, 6, 7, 8, 9]) }),
        await RefTestBufferModel.create({ _id: Buffer.from([9, 8, 7, 6, 5]) })
      ]
    });

    const populate = Object.keys(RefTestModel.schema.obj);
    const foundPopulated = await RefTestModel.findById(populatedId).populate(populate).exec();

    expect(foundPopulated.refArray).to.be.an('array');
    expect(foundPopulated.refArrayString).to.be.an('array');
    expect(foundPopulated.refArrayNumber).to.be.an('array');
    expect(foundPopulated.refArrayBuffer).to.be.an('array');

    expect(foundPopulated.refArray.length).to.equal(2);
    expect(foundPopulated.refArrayString.length).to.equal(2);
    expect(foundPopulated.refArrayNumber.length).to.equal(2);
    expect(foundPopulated.refArrayBuffer.length).to.equal(2);

    expect(isDocument(foundPopulated.refField)).to.equal(true);
    expect(isDocument(foundPopulated.refFieldString)).to.equal(true);
    expect(isDocument(foundPopulated.refFieldNumber)).to.equal(true);
    expect(isDocument(foundPopulated.refFieldBuffer)).to.equal(true);

    expect(isDocumentArray(foundPopulated.refArray)).to.equal(true);
    expect(isDocumentArray(foundPopulated.refArrayString)).to.equal(true);
    expect(isDocumentArray(foundPopulated.refArrayNumber)).to.equal(true);
    expect(isDocumentArray(foundPopulated.refArrayBuffer)).to.equal(true);
  });
}
