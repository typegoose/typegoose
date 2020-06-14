import { getModelForClass, index, prop } from '../../src/typegoose';

// using examples from https://docs.mongodb.com/manual/tutorial/control-results-of-text-search/
@index({ content: 'text', about: 'text', keywords: 'text' }, {
  weights: {
    content: 10,
    keywords: 3
  },
  name: 'TextIndex'
})
export class IndexWeights {
  @prop({ required: true })
  public content!: string;

  @prop({ required: true })
  public about!: string;

  @prop({ required: true, type: String })
  public keywords!: string[];
}

export const IndexWeightsModel = getModelForClass(IndexWeights);
