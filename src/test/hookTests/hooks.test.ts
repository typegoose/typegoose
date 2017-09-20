import { expect } from 'chai';

import { model as Hook } from './hooktestModel';
import { model as Dummy } from './dummy';
import { initDatabase } from '../utils/mongoConnect';

describe('Typegoose', () => {
  describe('Hooks', () => {
    before(() => initDatabase());

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
      const dummy = await Dummy.create({ text: 'initial' });

      // text is changed in pre save hook
      const dummyFromDb = await Dummy.findOne({ text: 'saved' });
      expect(dummyFromDb).to.have.property('text', 'changed in post findOne hook');
    });

    it('should find the unexpected dummies because of pre and post hooks', async () => {
      const dummy = await Dummy.create([{ text: 'whatever' }, { text: 'whatever' }]);

      const foundDummies = await Dummy.find({ text: 'saved'});

      // pre-save-hook changed text to saved
      expect(foundDummies.length).to.be.above(2);
      expect(foundDummies[0]).to.have.property('text', 'changed in post find hook');
      expect(foundDummies[1]).to.have.property('text', 'saved');
    });
  });
});
