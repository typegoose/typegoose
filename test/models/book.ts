import { prop } from '../../src/prop';
import { searchIndex } from '../../src/searchIndexes';
import { getModelForClass, modelOptions } from '../../src/typegoose';

@searchIndex({
  name: 'descriptionIndex',
  definition: {
    mappings: {
      dynamic: false,
      fields: {
        description: { type: 'string' },
      },
    },
  },
})
@modelOptions({ schemaOptions: { autoSearchIndex: true } })
export class Book {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true })
  public author!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ required: true })
  public publicationYear!: number;
}

export const BookModel = getModelForClass(Book);
