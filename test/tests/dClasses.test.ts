import { expect } from 'chai';
import { TestTimeStamps, TestTimeStampsModel } from '../models/dClasses';

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 */
export function suite() {
  it('TimeStamp Model', async () => {
    const doc = await TestTimeStampsModel.create({ someValue: 'hello' } as Partial<TestTimeStamps>);
    expect(doc).to.not.be.an('undefined');
    expect(doc.someValue).to.equal('hello');
    expect(doc.updatedAt).to.be.an.instanceOf(Date);
    expect(doc.createdAt).to.be.an.instanceOf(Date);

    const found = await TestTimeStampsModel.findById(doc.id).exec();
    expect(found).to.not.be.an('undefined');
    expect(found.someValue).to.equal('hello');
    expect(found.updatedAt).to.be.an.instanceOf(Date);
    expect(found.createdAt).to.be.an.instanceOf(Date);
  });
}
