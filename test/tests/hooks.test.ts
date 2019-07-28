import { expect } from 'chai';

import { model as Hook } from '../models/hook1';
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
  it('should update the property using isModified during pre save hook', async () => {
    const hook = await Hook.create({
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
