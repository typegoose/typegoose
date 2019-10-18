import { getModelForClass, prop } from '../../src/typegoose';

class Image {
  public url: string;
  public alt: string;
}

export class Article {
  @prop()
  public title: string;

  @prop({ skipSchemaCreation: true })
  public image: Image;
}

export const ArticleModel = getModelForClass(Article);
