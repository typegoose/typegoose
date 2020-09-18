import { TestTimeStampsModel } from '../models/dClasses';

it('TimeStamp Model', async () => {
  const doc = await TestTimeStampsModel.create({ someValue: 'hello' });
  expect(doc).not.toBeUndefined();
  expect(doc.someValue).toEqual('hello');
  expect(doc.updatedAt).toBeInstanceOf(Date);
  expect(doc.createdAt).toBeInstanceOf(Date);

  const found = await TestTimeStampsModel.findById(doc.id).orFail().exec();
  expect(found).not.toBeUndefined();
  expect(found.someValue).toEqual('hello');
  expect(found.updatedAt).toBeInstanceOf(Date);
  expect(found.createdAt).toBeInstanceOf(Date);
});
