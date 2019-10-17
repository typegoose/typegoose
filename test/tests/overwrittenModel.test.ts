import { expect } from 'chai';
import { deleteModel, getModelForClass } from '../../src/typegoose';
import { User } from '../models/user';
import { OverwrittenUser } from './../models/overwrittenUser';

export function suite() {
  it('should be possible to overwrite an existing model', async () => {
    const userModel = getModelForClass(User);
    expect(userModel).to.be.a('function');
    expect(userModel.modelName).to.equal('User');
    expect(userModel.collection.collectionName).to.equal('users');

    deleteModel('User');

    const overwrittenUserModel = getModelForClass(OverwrittenUser);
    expect(overwrittenUserModel).to.be.a('function');
    expect(userModel.collection.collectionName).to.equal('users');

    expect(overwrittenUserModel).not.be.equal(userModel);
  });

  it('should not be possible to delete a non-existing model', () => {
    const notExistingModelName = 'NotExistingModel';
    expect(() => {
      deleteModel(notExistingModelName);
    }).to.throw(`Model "${notExistingModelName}" could not be found`);
  });
}
