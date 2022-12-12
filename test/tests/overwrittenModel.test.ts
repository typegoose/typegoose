import { constructors, models } from '../../src/internal/data';
import { deleteModel, deleteModelWithClass, getModelForClass, modelOptions, prop, types } from '../../src/typegoose';
import { config } from '../utils/config';
import { connect } from '../utils/connect';
import { NormalUser, OverwrittenUser } from './../models/overwrittenUser';

it('should be possible to overwrite an existing model', () => {
  const options = {
    schemaOptions: {
      collection: 'OverwriteUser',
    },
    options: { customName: 'User' },
  } as types.IModelOptions;

  @modelOptions(options)
  class FirstUser {
    @prop()
    public name: string;
  }

  @modelOptions(options)
  class SecondUser {
    @prop()
    public nickName: string;
  }

  const userModel = getModelForClass(FirstUser);
  expect(typeof userModel).toBe('function');
  expect(userModel.modelName).toEqual('User');
  expect(userModel.collection.collectionName).toEqual('OverwriteUser');

  deleteModel('User');

  const overwrittenUserModel = getModelForClass(SecondUser);
  expect(typeof overwrittenUserModel).toBe('function');
  expect(overwrittenUserModel.modelName).toEqual('User');
  expect(overwrittenUserModel.collection.collectionName).toEqual('OverwriteUser');

  expect(overwrittenUserModel).not.toEqual(userModel);

  deleteModel('User');
});

it('should not error if model did not exist in "models" map', () => {
  deleteModel('DefinitelyNotExistingModel');
});

it('should make use of "deleteModelWithClass"', () => {
  const model = getModelForClass(NormalUser);

  expect(typeof model).toBe('function');
  expect(model.modelName).toEqual('NormalUser');
  expect(model.collection.collectionName).toEqual('OverwriteUser');

  deleteModelWithClass(NormalUser);

  const overwrittenUserModel = getModelForClass(OverwrittenUser);
  expect(typeof overwrittenUserModel).toBe('function');
  expect(model.collection.collectionName).toEqual('OverwriteUser');

  expect(overwrittenUserModel).not.toEqual(model);

  deleteModelWithClass(OverwrittenUser);
});

it('should delete model from different connection', async () => {
  const connection = await connect({ dbName: config.DataBase.concat('2'), createNewConnection: true });
  const model = getModelForClass(NormalUser, { existingConnection: connection });
  const name = model.modelName;
  expect(name).toEqual('NormalUser');

  deleteModelWithClass(NormalUser);
  expect(connection.models.NormalUser).toBeUndefined();

  expect(models.has(name)).toEqual(false);
  expect(constructors.has(name)).toEqual(false);

  await connection.close();
});

it('should delete model with class when normal name is not found in "models"', () => {
  class CustomNameOnFunctionCall {
    @prop()
    public test: string;
  }

  const model = getModelForClass(CustomNameOnFunctionCall, { options: { customName: 'CustomNameFC' } });
  expect(model.modelName).toEqual('CustomNameFC');
  expect(models.has(model.modelName)).toBeTruthy();

  deleteModelWithClass(CustomNameOnFunctionCall);
  expect(models.has(model.modelName)).toBeFalsy();
});

it('should not delete anything if nothing can be found', () => {
  class TestClass {
    @prop()
    public dummy?: string;
  }

  getModelForClass(TestClass);

  jest.spyOn(models, 'delete').mockImplementationOnce(() => false);
  jest.spyOn(constructors, 'delete').mockImplementationOnce(() => false);
  const modelsBefore = models.size;
  const constructorsBefore = constructors.size;

  expect(models.has('SomeRandomClass')).toStrictEqual(false); // to ensure that no class with that name has been registered
  expect(constructors.has('SomeRandomClass')).toStrictEqual(false); // to ensure that no class with that name has been registered
  deleteModelWithClass(class SomeRandomClass {});

  expect(models.size).toStrictEqual(modelsBefore);
  expect(constructors.size).toStrictEqual(constructorsBefore);
  expect(models.delete).not.toHaveBeenCalled();
  expect(constructors.delete).not.toHaveBeenCalled();
});
