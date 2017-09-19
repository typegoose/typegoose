import { expect } from 'chai';

import { model as Hook } from './hooktestModel';
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
  });
});
