import { Book } from '../models/book';
import { buildSchema } from '../../src/typegoose';

it('should add a search index', async () => {
  const schema = buildSchema(Book);

  expect(schema.indexes()).toEqual([]);
  // @ts-expect-error use the private property because there is no method to fetch search indexes yet
  expect(schema._searchIndexes).toEqual([
    {
      name: 'descriptionIndex',
      definition: {
        mappings: {
          dynamic: false,
          fields: {
            description: { type: 'string' },
          },
        },
      },
    },
  ]);
});
