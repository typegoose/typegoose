import { arrayProp, index, prop, Typegoose } from '../../src/typegoose';

// using examples from https://docs.mongodb.com/manual/tutorial/control-results-of-text-search/
@index({ content: 'text', about: 'text', keywords: 'text' }, {
  weights: {
    content: 10,
    keywords: 3
  },
  name: 'TextIndex'
})
export class IndexWeights extends Typegoose {
  @prop({ required: true })
  public content: string;

  @prop({ required: true })
  public about: string;

  @arrayProp({ required: true, items: String })
  public keywords: string[];
}

export const model = new IndexWeights().getModelForClass(IndexWeights);
