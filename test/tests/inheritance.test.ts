import { expect } from 'chai';
import { model as inheritanceClass, Skyscraper } from '../models/inheritanceClass';

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 */
export function suite() {
  it('should set all direct parent props', async () => {
    const instance = await inheritanceClass.create({});
    expect(instance.name).to.equals('Some cool string');
    expect(instance.doors).to.equals(4);
    expect(instance.width).to.equals(100);
  });

  it('should merge all parent schema options', async () => {
    const instance = await inheritanceClass.create({});
    expect(instance.schema.get('collection')).to.equals('skyscrapers');
    expect(instance.schema.get('discriminatorKey')).to.equals('width');
  });

  it('should set all parent props for nested schemas', async () => {
    const input = {
      mainGarage: {
        slotsForCars: 3
      }
    } as Skyscraper;
    const instance = await inheritanceClass.create(input);
    expect(instance.mainGarage.slotsForCars).to.equals(3);
    expect(instance.mainGarage.width).to.equals(100);
    // this has an any type assertion, because it shouldnt exists on this type, what is tested here
    expect((instance.mainGarage as any).doors).to.equals(undefined);
  });

  it('should set all parent props for nested array items', async () => {
    const input = {
      garagesInArea: [{
        slotsForCars: 2
      }]
    } as Skyscraper;
    const instance = await inheritanceClass.create(input);
    expect(instance.garagesInArea).to.be.lengthOf(1);
    const firstGarage = instance.garagesInArea.pop();
    expect(firstGarage.slotsForCars).to.equals(2);
    expect(firstGarage.width).to.equals(100);
    // this has an any type assertion, because it shouldnt exists on this type, what is tested here
    expect((firstGarage as any).doors).to.be.equals(undefined);
  });
}
