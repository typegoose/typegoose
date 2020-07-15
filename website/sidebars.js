module.exports = {
  docs: {
    Start: ["api/index-api", "api/virtuals", "api/environment-variables"],
    Decorators: ["api/decorators/prop", "api/decorators/map-prop", "api/decorators/array-prop", "api/decorators/model-options", "api/decorators/hooks", "api/decorators/indexes", "api/decorators/plugins", "api/decorators/query-method"],
    Functions: ["api/functions/get-model-for-class", "api/functions/get-class-for-document", "api/functions/get-class", "api/functions/build-schema", "api/functions/get-discriminator-model-for-class", "api/functions/add-model-to-typegoose", "api/functions/delete-model", "api/functions/set-global-options", "api/functions/get-model-with-string", "api/functions/get-name"],
    TypeGuards: ["api/functions/typeguards/is-document", "api/functions/typeguards/is-ref-type"],
    Types: ["api/types/document-type", "api/types/return-model-type", "api/types/ref-type", "api/types/additional-types"]
  },
  guides: {
    "Getting Started": ["guides/quick-start-guide", "guides/migrate-6", "guides/migrate-7", "guides/faq", "guides/known-issues", "guides/deprecation-codes"],
    Basics: ["guides/all-decorators", "guides/motivation", "guides/default-classes"],
    Advanced: ["guides/advanced/custom-types", "guides/advanced/models-with-same-name", "guides/advanced/logger", "guides/advanced/reference-other-classes", "guides/advanced/common-plugins", "guides/advanced/change-id-type", "guides/advanced/using-objectid-type"]
  }
};
