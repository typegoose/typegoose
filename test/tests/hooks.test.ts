import { DecoratorKeys } from '../../src/internal/constants';
import { logger } from '../../src/logSettings';
import { buildSchema, post, pre, prop } from '../../src/typegoose';
import { HookOptionsEither, IHooksArray } from '../../src/types';
import { ExtendedHookModel, Hook, HookArray, HookArrayModel, HookModel } from '../models/hook1';
import { Hook2Model } from '../models/hook2';

it('RegEXP tests', async () => {
  const doc = new HookModel({ material: 'iron' } as Hook);
  await doc.save();
  await doc.updateOne(doc).exec(); // to run the update hook with regexp, find doesn't work (it doesn't get applied)

  const found = await HookModel.findById(doc.id).exec();
  expect(typeof found).not.toBe('undefined');
  expect(found).toHaveProperty('material', 'REGEXP_POST');
  expect(found).toHaveProperty('shape', 'REGEXP_PRE');
});

it('should update the property using isModified during pre save hook', async () => {
  const hook = await HookModel.create({
    material: 'steel',
  });
  expect(hook).toHaveProperty('shape', 'oldShape');

  hook.set('shape', 'changed');
  const savedHook = await hook.save();
  expect(savedHook).toHaveProperty('shape', 'newShape');
});

it('should test findOne post hook', async () => {
  await Hook2Model.create({ text: 'initial' });

  // text is changed in pre save hook
  const dummyFromDb = await Hook2Model.findOne({ text: 'saved' }).exec();
  expect(dummyFromDb).toHaveProperty('text', 'changed in post findOne hook');
});

it('should find the unexpected dummies because of pre and post hooks', async () => {
  await Hook2Model.create([{ text: 'whatever' }, { text: 'whatever' }]);

  const foundDummies = await Hook2Model.find({ text: 'saved' }).exec();

  // pre-save-hook changed text to saved
  expect(foundDummies.length > 2).toBe(true);
  expect(foundDummies[0]).toHaveProperty('text', 'changed in post find hook');
  expect(foundDummies[1]).toHaveProperty('text', 'saved');
});

it('should test the updateMany hook', async () => {
  await Hook2Model.insertMany([{ text: 'foobar42' }, { text: 'foobar42' }]);

  await Hook2Model.updateMany({ text: 'foobar42' }, { text: 'lorem ipsum' }).exec();

  const foundUpdatedDummies = await Hook2Model.find({ text: 'updateManied' }).exec();

  // pre-updateMany-hook changed text to 'updateManied'
  expect(foundUpdatedDummies).toHaveLength(2);
});

it('should execute multiple hooks with array', async () => {
  const doc = await HookArrayModel.create({} as HookArray);
  await HookArrayModel.find({}).exec();
  await HookArrayModel.findOne({ _id: doc.id }).exec();

  const found = await HookArrayModel.findById(doc.id).orFail().exec();
  expect(typeof found).not.toBe('undefined');
  expect(Array.isArray(found.testArray)).toBe(true);
  expect(found.testArray).toHaveLength(3);
  expect(Array.from(found.testArray)).toEqual(['hello', 'hello', 'hello']);
});

it('should execute pre hooks only twice in case inheritance is being used [typegoose#218]', async () => {
  const doc = new ExtendedHookModel();
  await doc.save();
  expect(doc.hooksMessages.length).toEqual(2);
});

it('should execute post hooks only twice in case inheritance is being used [typegoose#218]', async () => {
  const doc = new ExtendedHookModel();
  await doc.save();

  const docFromDb = await ExtendedHookModel.findOne({ _id: doc._id }).orFail().exec();
  expect(docFromDb.hooksMessages.length).toEqual(4);
});

it('should log a warning if "addToHooks" parameter "args" is longer than 3', async () => {
  const loggerSpy = jest.spyOn(logger, 'warn').mockImplementationOnce(() => void 0);

  const customPre = jest.fn(() => fail('Expected this function to not be executed'));

  // @ts-expect-error only 3 arguments are supported, but more will be tested for the warning
  @pre<TestAddToHooksArgsLengthWarning>('save', customPre, {}, 'somethingElse')
  class TestAddToHooksArgsLengthWarning {
    @prop()
    public dummy?: string;
  }

  expect(loggerSpy).toHaveBeenCalledTimes(1);
  expect(loggerSpy.mock.calls).toMatchSnapshot();
});

it('should allow usage of hook-options [typegoose/typegoose#605]', async () => {
  // this is combined, because currently both "Post" and "Pre" hooks have the same options with the same meaning
  const fullHookOptions: HookOptionsEither = { document: false, query: false };
  const customPre = jest.fn(() => fail('Expected this function to not be executed'));
  const customPost = jest.fn(() => fail('Expected this function to not be executed'));

  @pre<TestHookOptions>('save', customPre, fullHookOptions)
  @post<TestHookOptions>('save', customPost, fullHookOptions)
  class TestHookOptions {
    @prop()
    public dummy?: string;
  }

  const reflectHooksPre: IHooksArray[] = Reflect.getMetadata(DecoratorKeys.HooksPre, TestHookOptions);
  const reflectHooksPost: IHooksArray[] = Reflect.getMetadata(DecoratorKeys.HooksPost, TestHookOptions);

  expect(reflectHooksPre).toHaveLength(1);
  expect(reflectHooksPre[0]).toStrictEqual<IHooksArray>({
    method: 'save',
    func: customPre,
    options: fullHookOptions,
  });

  expect(reflectHooksPost).toHaveLength(1);
  expect(reflectHooksPost[0]).toStrictEqual<IHooksArray>({
    method: 'save',
    func: customPost,
    options: fullHookOptions,
  });

  const schema = buildSchema(TestHookOptions);
  // @ts-expect-error "s" is not in the types, but is used for something like "hooks"
  const schemaHooks: { _pres: Map<string, any>; _posts: Map<string, any> } = schema.s.hooks;

  expect(schemaHooks._pres.size).toStrictEqual(1);
  expect(schemaHooks._posts.size).toStrictEqual(1);

  // this is using "objectContaining", because mongoose could at any point in time just add more options, which would not matter here
  expect(schemaHooks._pres.get('save')[0]).toStrictEqual(
    expect.objectContaining({
      ...fullHookOptions,
      fn: customPre,
    })
  );
  expect(schemaHooks._posts.get('save')[0]).toStrictEqual(
    expect.objectContaining({
      ...fullHookOptions,
      fn: customPost,
    })
  );
});
