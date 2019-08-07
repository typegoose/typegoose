import { expect } from 'chai';
import { createReadStream, readFileSync } from 'fs';
import { isBuffer } from 'util';
import { getModelForClass } from '../../src/typegoose';
import { TestGridFS, TestTimeStamps, TestTimeStampsModel } from '../models/dClasses';

/**
 * Function to pass into describe
 * ->Important: you need to always bind this
 * @example
 * ```
 * import { suite as DefaultClassesTests } from './dClasses.test'
 * ...
 * describe('Default Classes', DefaultClassesTests.bind(this));
 * ...
 * ```
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

  describe('GridFS', () => {
    const testFile = readFileSync('./LICENSE');
    it('GridFS Model openUploadStream', async () => {
      const TestGridFSModel = getModelForClass(TestGridFS);
      const file1 = new TestGridFSModel({ filename: 'LICENSE' } as TestGridFS);
      console.log('model', TestGridFSModel);
      const aw = new Promise((res, rej) => {
        createReadStream('./LICENSE').pipe(file1.openUploadStream())
          .on('finish', res)
          .on('error', rej);
      });
      await aw;
      console.log('stream closed');
    });

    it('GridFS Model openDownloadStream', async () => {
      const TestGridFSModel = getModelForClass(TestGridFS);
      const file1 = await TestGridFSModel.findOne({}).exec();
      let buff: Buffer;
      const aw = new Promise((res, rej) => {
        const parts = [];
        console.log('starting download stream');
        file1.openDownloadStream()
          .on('data', parts.push)
          .on('finish', () => {
            console.log('stream closed');
            buff = Buffer.concat(parts.map((part) => isBuffer(part) ? part : Buffer.from(part)));
            res();
          })
          .on('error', rej);
      });
      await aw;
      expect(buff).to.deep.equal(testFile);
    });
  });
}
