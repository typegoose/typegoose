import { expect } from 'chai';

import { mongoose } from '../../src/typegoose';
import { ArticleModel } from '../models/modelWithNestedClass';

export function suite() {
  it('Model with nested class', () => {
    expect(ArticleModel.schema.path('image')).to.be.instanceOf(mongoose.Schema.Types.Mixed);
  });
}
