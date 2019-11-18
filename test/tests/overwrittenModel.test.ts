import { expect } from 'chai';

import { constructors, models } from '../../src/internal/data';
import { deleteModel, deleteModelWithClass, getModelForClass } from '../../src/typegoose';
import { config } from '../utils/config';
import { connect } from '../utils/mongooseConnect';
import { NormalUser, OverwrittenUser } from './../models/overwrittenUser';

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 */
export function suite() {
  it('should be possible to overwrite an existing model', () => {
    const userModel = getModelForClass(NormalUser);
    expect(userModel).to.be.a('function');
    expect(userModel.modelName).to.equal('NormalUser');
    expect(userModel.collection.collectionName).to.equal('OverwriteUser');

    deleteModel('User');

    const overwrittenUserModel = getModelForClass(OverwrittenUser);
    expect(overwrittenUserModel).to.be.a('function');
    expect(userModel.collection.collectionName).to.equal('OverwriteUser');

    expect(overwrittenUserModel).not.be.equal(userModel);

    deleteModel('OverwrittenUser');
  });

  it('should not be possible to delete a non-existing model', () => {
    const notExistingModelName = 'NotExistingModel';
    expect(() => {
      deleteModel(notExistingModelName);
    }).to.throw(`Model "${notExistingModelName}" could not be found`);
  });

  it('should make use of "deleteModelWithClass"', () => {
    const model = getModelForClass(NormalUser);

    expect(model).to.be.a('function');
    expect(model.modelName).to.equal('NormalUser');
    expect(model.collection.collectionName).to.equal('OverwriteUser');

    deleteModelWithClass(NormalUser);

    const overwrittenUserModel = getModelForClass(OverwrittenUser);
    expect(overwrittenUserModel).to.be.a('function');
    expect(model.collection.collectionName).to.equal('OverwriteUser');

    expect(overwrittenUserModel).not.be.equal(model);

    deleteModelWithClass(OverwrittenUser);
  });

  it('should delete model from different connection', async () => {
    const connection = await connect({ dbName: config.DataBase.concat('2'), createNewConnection: true });
    const model = getModelForClass(NormalUser, { existingConnection: connection });
    const name = model.modelName;
    expect(name).to.equal('NormalUser');

    deleteModelWithClass(NormalUser);
    expect(connection.models.NormalUser).to.equal(undefined);

    expect(models.has(name)).to.equal(false);
    expect(constructors.has(name)).to.equal(false);

    await connection.close();
  });
}
