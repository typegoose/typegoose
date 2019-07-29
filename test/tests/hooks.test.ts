import { expect } from 'chai';

import { Hook, model as HookModel } from '../models/hook1';
import { model as Dummy } from '../models/hook2';

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 * @example
 * ```
 * import { suite as HookTests } from './hooks.test'
 * ...
 * describe('Hooks', HookTests.bind(this));
 * ...
 * ```
 */
export function suite() {
  it('RegEXP tests', async () => {
    const doc = new HookModel({ material: 'iron' } as Hook);
    await doc.save();
    await doc.updateOne(doc); // to run the update hook with regexp, find dosnt work (it dosnt get applied)

    const found = await HookModel.findById(doc.id).exec();
    expect(found).to.not.be.an('undefined');
    expect(found).to.have.property('material', 'REGEXP_POST');
    expect(found).to.have.property('shape', 'REGEXP_PRE');
  });

  it('should update the property using isModified during pre save hook', async () => {
    const hook = await HookModel.create({
      material: 'steel',
    });
    expect(hook).to.have.property('shape', 'oldShape');

    hook.set('shape', 'changed');
    const savedHook = await hook.save();
    expect(savedHook).to.have.property('shape', 'newShape');
  });

  it('should test findOne post hook', async () => {
    await Dummy.create({ text: 'initial' });

    // text is changed in pre save hook
    const dummyFromDb = await Dummy.findOne({ text: 'saved' });
    expect(dummyFromDb).to.have.property('text', 'changed in post findOne hook');
  });

  it('should find the unexpected dummies because of pre and post hooks', async () => {
    await Dummy.create([{ text: 'whatever' }, { text: 'whatever' }]);

    const foundDummies = await Dummy.find({ text: 'saved' });

    // pre-save-hook changed text to saved
    expect(foundDummies.length).to.be.above(2);
    expect(foundDummies[0]).to.have.property('text', 'changed in post find hook');
    expect(foundDummies[1]).to.have.property('text', 'saved');
  });

  it('should test the updateMany hook', async () => {
    await Dummy.insertMany([{ text: 'foobar42' }, { text: 'foobar42' }]);

    await Dummy.updateMany({ text: 'foobar42' }, { text: 'lorem ipsum' });

    const foundUpdatedDummies = await Dummy.find({ text: 'updateManied' });

    // pre-updateMany-hook changed text to 'updateManied'
    expect(foundUpdatedDummies.length).to.equal(2);
  });
}
