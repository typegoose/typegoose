---
title: "Is Document"
redirect_from:
  - /docs/functions/typeguards/isdocument
---

## isDocument

`isDocument(doc: any)`: Check if the supplied value is a valid Model(/Document) (mainly for `Ref<T>` fields)

## isDocumentArray

`isDocumentArray(doc: any[])` is the same as `isDocument`, only that it checks if it is an array **AND** all of the items are a Document
