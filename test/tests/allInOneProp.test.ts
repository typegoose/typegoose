import * as mongoose from 'mongoose';

import { AllInOnePropModel } from '../models/allInOneProp';

it('should work with normal prop', async () => {
  expect(AllInOnePropModel.schema.path('normal')).toBeInstanceOf(mongoose.Schema.Types.String);
  const { _id } = await AllInOnePropModel.create({ normal: 'Hello There' });
  const found = await AllInOnePropModel.findById(_id).orFail().exec();
  expect(found.normal).toEqual('Hello There');
});

it('should work with array prop', async () => {
  expect(AllInOnePropModel.schema.path('array')).toBeInstanceOf(mongoose.Schema.Types.Array);
  expect((AllInOnePropModel.schema.path('array') as any).caster).toBeInstanceOf(mongoose.Schema.Types.String);
  const { _id } = await AllInOnePropModel.create({ array: ['Hello There', 'Hi'] });
  const found = await AllInOnePropModel.findById(_id).orFail().exec();
  expect(Array.from(found.array!)).toEqual(['Hello There', 'Hi']);
});

it('should work with map prop', async () => {
  expect(AllInOnePropModel.schema.path('map')).toBeInstanceOf(mongoose.Schema.Types.Map);
  // tslint:disable-next-line:no-string-literal
  expect(AllInOnePropModel.schema.path('map')['$__schemaType']).toBeInstanceOf(mongoose.Schema.Types.String);
  const { _id } = await AllInOnePropModel.create({ map: { key1: 'Hello There', key2: 'Hi' } });
  const found = await AllInOnePropModel.findById(_id).orFail().exec();
  expect(Array.from(found.map!)).toEqual([['key1', 'Hello There'], ['key2', 'Hi']]);
});
