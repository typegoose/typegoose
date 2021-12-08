module.exports = {
  docs: {
    Start: ['api/index-api', 'api/virtuals', 'api/environment-variables'],
    Decorators: [
      'api/decorators/prop',
      'api/decorators/model-options',
      'api/decorators/hooks',
      'api/decorators/indexes',
      'api/decorators/plugins',
      'api/decorators/query-method',
    ],
    Functions: [
      'api/functions/get-model-for-class',
      'api/functions/get-class-for-document',
      'api/functions/get-class',
      'api/functions/build-schema',
      'api/functions/get-discriminator-model-for-class',
      'api/functions/add-model-to-typegoose',
      'api/functions/delete-model',
      'api/functions/set-global-options',
      'api/functions/get-model-with-string',
      'api/functions/get-name',
    ],
    TypeGuards: ['api/functions/typeguards/is-document', 'api/functions/typeguards/is-ref-type'],
    Types: ['api/types/document-type', 'api/types/return-model-type', 'api/types/ref-type', 'api/types/additional-types'],
  },
  guides: {
    'Getting Started': [
      'guides/quick-start-guide',
      'guides/faq',
      'guides/known-issues',
      'guides/mongoose-compatibility',
      'guides/deprecation-codes',
      'guides/error-warning-details',
    ],
    // 'guides/known-issues' is included in both "Getting Started" and "Guides", because it fits into both categories
    Guides: [
      {
        'Integration Examples': [
          'guides/integration-examples/using-with-class-transformer',
          'guides/integration-examples/using-with-deepkit-type',
          'guides/integration-examples/common-plugins',
        ],
        Miscellaneous: ['guides/advanced/logger', 'guides/all-decorators', 'guides/use-without-emitDecoratorMetadata', 'guides/motivation'],
      },
      'guides/default-classes',
      'guides/advanced/custom-types',
      'guides/advanced/array-types',
      'guides/advanced/models-with-same-name',
      'guides/advanced/reference-other-classes',
      'guides/advanced/change-id-type',
      'guides/advanced/using-objectid-type',
      'guides/advanced/non-nested-discriminators',
      'guides/advanced/nested-discriminators',
      'guides/advanced/name-generation',
    ],
    Migration: ['guides/migration/migrate-9', 'guides/migration/migrate-8', 'guides/migration/migrate-7', 'guides/migration/migrate-6'],
  },
};
