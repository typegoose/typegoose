import * as mongoose from 'mongoose';

import { assertion, getName } from '../../src/internal/utils';
import { getModelForClass, isDocument, isDocumentArray, isRefType, prop, Ref } from '../../src/typegoose';
import { RefTestArrayTypesModel, RefTestBufferModel, RefTestModel, RefTestNumberModel, RefTestStringModel } from '../models/refTests';

it('check generated ref schema for ObjectID _id', async () => {
  expect((RefTestModel.schema.path('refField') as any).instance).toEqual('ObjectID');
  expect((RefTestModel.schema.path('refField') as any).options.ref).toEqual('RefTest');
  expect((RefTestModel.schema.path('refField2') as any).instance).toEqual('ObjectID');
  expect((RefTestModel.schema.path('refField2') as any).options.ref).toEqual('RefTest');

  expect((RefTestModel.schema.path('refArray') as any).instance).toEqual('Array');
  expect((RefTestModel.schema.path('refArray') as any).caster.instance).toEqual('ObjectID');
  expect((RefTestModel.schema.path('refArray') as any).caster.options.ref).toEqual('RefTest');
  expect((RefTestModel.schema.path('refArray2') as any).instance).toEqual('Array');
  expect((RefTestModel.schema.path('refArray2') as any).caster.instance).toEqual('ObjectID');
  expect((RefTestModel.schema.path('refArray2') as any).caster.options.ref).toEqual('RefTest');
});

it('check generated ref schema for string _id', async () => {
  expect((RefTestModel.schema.path('refFieldString') as any).instance).toEqual('String');
  expect((RefTestModel.schema.path('refFieldString') as any).options.ref).toEqual('RefTestString');
  expect((RefTestModel.schema.path('refFieldString2') as any).instance).toEqual('String');
  expect((RefTestModel.schema.path('refFieldString2') as any).options.ref).toEqual('RefTestString');

  expect((RefTestModel.schema.path('refArrayString') as any).instance).toEqual('Array');
  expect((RefTestModel.schema.path('refArrayString') as any).caster.instance).toEqual('String');
  expect((RefTestModel.schema.path('refArrayString') as any).caster.options.ref).toEqual('RefTestString');
  expect((RefTestModel.schema.path('refArrayString2') as any).instance).toEqual('Array');
  expect((RefTestModel.schema.path('refArrayString2') as any).caster.instance).toEqual('String');
  expect((RefTestModel.schema.path('refArrayString2') as any).caster.options.ref).toEqual('RefTestString');
});

it('check generated ref schema for number _id', async () => {
  expect((RefTestModel.schema.path('refFieldNumber') as any).instance).toEqual('Number');
  expect((RefTestModel.schema.path('refFieldNumber') as any).options.ref).toEqual('RefTestNumber');
  expect((RefTestModel.schema.path('refFieldNumber2') as any).instance).toEqual('Number');
  expect((RefTestModel.schema.path('refFieldNumber2') as any).options.ref).toEqual('RefTestNumber');

  expect((RefTestModel.schema.path('refArrayNumber') as any).instance).toEqual('Array');
  expect((RefTestModel.schema.path('refArrayNumber') as any).caster.instance).toEqual('Number');
  expect((RefTestModel.schema.path('refArrayNumber') as any).caster.options.ref).toEqual('RefTestNumber');
  expect((RefTestModel.schema.path('refArrayNumber2') as any).instance).toEqual('Array');
  expect((RefTestModel.schema.path('refArrayNumber2') as any).caster.instance).toEqual('Number');
  expect((RefTestModel.schema.path('refArrayNumber2') as any).caster.options.ref).toEqual('RefTestNumber');
});

it('check generated ref schema for Buffer _id', async () => {
  expect((RefTestModel.schema.path('refFieldBuffer') as any).instance).toEqual('Buffer');
  expect((RefTestModel.schema.path('refFieldBuffer') as any).options.ref).toEqual('RefTestBuffer');
  expect((RefTestModel.schema.path('refFieldBuffer2') as any).instance).toEqual('Buffer');
  expect((RefTestModel.schema.path('refFieldBuffer2') as any).options.ref).toEqual('RefTestBuffer');

  expect((RefTestModel.schema.path('refArrayBuffer') as any).instance).toEqual('Array');
  expect((RefTestModel.schema.path('refArrayBuffer') as any).caster.instance).toEqual('Buffer');
  expect((RefTestModel.schema.path('refArrayBuffer') as any).caster.options.ref).toEqual('RefTestBuffer');
  expect((RefTestModel.schema.path('refArrayBuffer2') as any).instance).toEqual('Array');
  expect((RefTestModel.schema.path('refArrayBuffer2') as any).caster.instance).toEqual('Buffer');
  expect((RefTestModel.schema.path('refArrayBuffer2') as any).caster.options.ref).toEqual('RefTestBuffer');
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
  expect(_id1).toEqual(id1);
  const { _id: _id2 } = await RefTestStringModel.create({ _id: id2 });
  expect(_id2).toEqual(id2);

  const { _id: refStringId } = await RefTestModel.create({ refFieldString: _id1 });
  const { refFieldString } = await RefTestModel.findById(refStringId).orFail().exec();
  expect(refFieldString).toEqual(_id1);
  const { _id: refArrayId } = await RefTestModel.create({ refArrayString: [_id1, _id2] });
  const { refArrayString } = await RefTestModel.findById(refArrayId).orFail().exec();
  expect(Array.from(refArrayString!)).toEqual([_id1, _id2]);
});

it('check reference with optional string _id [typegoose/typegoose#249]', async () => {
  const id1 = 'testid3';
  const id2 = 'testid4';

  const refTypeTest = new RefTestModel();
  refTypeTest.refFieldStringOptional = id1;
  refTypeTest.refArrayStringOptional = [id1, id2];
  refTypeTest.refFieldStringOptional = new RefTestStringModel();
  refTypeTest.refArrayStringOptional = [new RefTestStringModel(), new RefTestStringModel()];

  const { _id: _id1 } = await RefTestStringModel.create({ _id: id1 });
  expect(_id1).toEqual(id1);
  const { _id: _id2 } = await RefTestStringModel.create({ _id: id2 });
  expect(_id2).toEqual(id2);

  const { _id: refStringId } = await RefTestModel.create({ refFieldString: _id1 });
  const { refFieldString } = await RefTestModel.findById(refStringId).orFail().exec();
  expect(refFieldString).toEqual(_id1);
  const { _id: refArrayId } = await RefTestModel.create({ refArrayString: [_id1, _id2] });
  const { refArrayString } = await RefTestModel.findById(refArrayId).orFail().exec();
  expect(Array.from(refArrayString!)).toEqual([_id1, _id2]);
});

it('check reference with string or undefined _id [typegoose/typegoose#249]', async () => {
  const id1 = 'testid5';
  const id2 = 'testid6';

  const refTypeTest = new RefTestModel();
  refTypeTest.refFieldStringOrUndefined = id1;
  refTypeTest.refArrayStringOrUndefined = [id1, id2];
  refTypeTest.refFieldStringOrUndefined = new RefTestStringModel();
  refTypeTest.refArrayStringOrUndefined = [new RefTestStringModel(), new RefTestStringModel()];

  const { _id: _id1 } = await RefTestStringModel.create({ _id: id1 });
  expect(_id1).toEqual(id1);
  const { _id: _id2 } = await RefTestStringModel.create({ _id: id2 });
  expect(_id2).toEqual(id2);

  const { _id: refStringId } = await RefTestModel.create({ refFieldString: _id1 });
  const { refFieldString } = await RefTestModel.findById(refStringId).orFail().exec();
  expect(refFieldString).toEqual(_id1);
  const { _id: refArrayId } = await RefTestModel.create({ refArrayString: [_id1, _id2] });
  const { refArrayString } = await RefTestModel.findById(refArrayId).orFail().exec();
  expect(Array.from(refArrayString!)).toEqual([_id1, _id2]);
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
  expect(_id1).toEqual(id1);
  const { _id: _id2 } = await RefTestNumberModel.create({ _id: id2 });
  expect(_id2).toEqual(id2);

  const { _id: refNumberId } = await RefTestModel.create({ refFieldNumber: _id1 });
  const { refFieldNumber } = await RefTestModel.findById(refNumberId).orFail().exec();
  expect(refFieldNumber).toEqual(_id1);
  const { _id: refArrayId } = await RefTestModel.create({ refArrayNumber: [_id1, _id2] });
  const { refArrayNumber } = await RefTestModel.findById(refArrayId).orFail().exec();
  expect(Array.from(refArrayNumber!)).toEqual([_id1, _id2]);
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
  expect(_id1.equals(id1)).toEqual(true);
  const { _id: _id2 } = await RefTestBufferModel.create({ _id: id2 });
  expect(_id2.equals(id2)).toEqual(true);

  const { _id: refBufferId } = await RefTestModel.create({ refFieldBuffer: _id1 });
  const { refFieldBuffer } = await RefTestModel.findById(refBufferId).orFail().exec();
  assertion(isRefType(refFieldBuffer), new Error('Expected "refFieldBuffer" to be "mongoose.Types.Buffer | Buffer"'));
  expect(_id1.equals(refFieldBuffer)).toEqual(true);
  const { _id: refArrayId } = await RefTestModel.create({ refArrayBuffer: [_id1, _id2] });
  const { refArrayBuffer } = await RefTestModel.findById(refArrayId).orFail().exec();
  expect(Array.from(refArrayBuffer!)).toEqual([_id1, _id2]);
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

  expect(isDocument(idFields.refField)).toEqual(false);
  expect(isDocument(idFields.refFieldString)).toEqual(false);
  expect(isDocument(idFields.refFieldNumber)).toEqual(false);
  expect(isDocument(idFields.refFieldBuffer)).toEqual(false);

  expect(isDocumentArray(idFields.refArray!)).toEqual(false);
  expect(isDocumentArray(idFields.refArrayString!)).toEqual(false);
  expect(isDocumentArray(idFields.refArrayNumber!)).toEqual(false);
  expect(isDocumentArray(idFields.refArrayBuffer!)).toEqual(false);

  const { _id: populatedId } = await RefTestModel.create({
    refField: await RefTestModel.create({}),
    refArray: [await RefTestModel.create({}), await RefTestModel.create({})],
    refFieldString: await RefTestStringModel.create({ _id: 'atest1' }),
    refArrayString: [await RefTestStringModel.create({ _id: 'btest2' }), await RefTestStringModel.create({ _id: 'ctest3' })],
    refFieldNumber: await RefTestNumberModel.create({ _id: 12345 }),
    refArrayNumber: [await RefTestNumberModel.create({ _id: 56789 }), await RefTestNumberModel.create({ _id: 98765 })],
    refFieldBuffer: await RefTestBufferModel.create({ _id: Buffer.from([1, 2, 3, 4, 5]) }),
    refArrayBuffer: [
      await RefTestBufferModel.create({ _id: Buffer.from([5, 6, 7, 8, 9]) }),
      await RefTestBufferModel.create({ _id: Buffer.from([9, 8, 7, 6, 5]) })
    ]
  });

  const populate = Object.keys(RefTestModel.schema.obj);
  const foundPopulated = await RefTestModel.findById(populatedId).populate(populate).orFail().exec();

  expect(Array.isArray(foundPopulated.refArray)).toBe(true);
  expect(Array.isArray(foundPopulated.refArrayString)).toBe(true);
  expect(Array.isArray(foundPopulated.refArrayNumber)).toBe(true);
  expect(Array.isArray(foundPopulated.refArrayBuffer)).toBe(true);

  expect(foundPopulated.refArray!.length).toEqual(2);
  expect(foundPopulated.refArrayString!.length).toEqual(2);
  expect(foundPopulated.refArrayNumber!.length).toEqual(2);
  expect(foundPopulated.refArrayBuffer!.length).toEqual(2);

  expect(isDocument(foundPopulated.refField)).toEqual(true);
  expect(isDocument(foundPopulated.refFieldString)).toEqual(true);
  expect(isDocument(foundPopulated.refFieldNumber)).toEqual(true);
  expect(isDocument(foundPopulated.refFieldBuffer)).toEqual(true);

  expect(isDocumentArray(foundPopulated.refArray!)).toEqual(true);
  expect(isDocumentArray(foundPopulated.refArrayString!)).toEqual(true);
  expect(isDocumentArray(foundPopulated.refArrayNumber!)).toEqual(true);
  expect(isDocumentArray(foundPopulated.refArrayBuffer!)).toEqual(true);
});

it('should make use of arrow-function returning ref-type', async () => {
  class Nested {
    @prop()
    public someNestedProperty: string;
  }

  class Main {
    @prop({ ref: () => Nested })
    public nested: Ref<Nested>;
  }

  const NestedModel = getModelForClass(Nested);
  const MainModel = getModelForClass(Main);

  const { _id } = await MainModel.create({ nested: await NestedModel.create({ someNestedProperty: 'Hello' }) });
  const found = await MainModel.findById(_id).populate('nested').orFail().exec();
  expect(found.nested).not.toBeUndefined();
  assertion(isDocument(found.nested));
  expect(found.nested!.someNestedProperty).toEqual('Hello');

  expect(MainModel.schema.path('nested')).toBeInstanceOf(mongoose.Schema.Types.ObjectId);
  expect((MainModel.schema.path('nested') as any).options.ref).toEqual(getName(Nested));
});

it('reference arrays should work with mongoose.Types.Array<Ref<T>>', async () => {
  const stringdoc = await RefTestStringModel.create({ _id: 'm.t.a<r>' });
  const doc = await RefTestArrayTypesModel.create({ array: [stringdoc, stringdoc] });
  const found = await RefTestArrayTypesModel.findById(doc._id).orFail().exec();

  expect(found.toObject()).toEqual(doc.depopulate('array').toObject());
  const schemaPath: any = RefTestArrayTypesModel.schema.path('array');
  expect(schemaPath).toBeInstanceOf(mongoose.Schema.Types.Array);
  expect(schemaPath.caster).toBeInstanceOf(mongoose.Schema.Types.String);

  expect(Array.from(found.array!.toObject())).toEqual([stringdoc._id, stringdoc._id]);
});
