---
id: overwrite-this
title: 'Why overwrite "this"'
---

In the documentation for typegoose you may have already seen the following and asked "Why do i need to overwrite `this`"?

```ts
class Kitten {
  // Note the following "this"
  public goEat(this: DocumentType<Kitten>, where: string) {
    // ...code to eat
  }
}
```

## Reason for overwriting

The reason would be that by default the type would implicitly be `this: Kitten`(instance), which does not give access to the document functions and would also be the wrong type and so could wrongly assume `this instanceof Kitten` would work, whereas that would not actually be true.

For Instance methods the implicit type would be `this: Kitten`(instance), whereas the correct type would be `this: DocumentType<Kitten>`.  
For Static methods the implicit type would be `this: typeof Kitten`(static), whereas the correct type would be `this: ReturnModelType<typeof Kitten>`.

The same also applies to other places like validators or QueryHelpers where the `this` may need to be overwritten.

## Typescript Notes

This section has some typescript notes that are subtle and can cause confusion.

### Difference between value and type

The Type `Kitten` is not, infact, the class `Kitten` but the *instance* of `Kitten`, to actually get the static you would need to do `typeof Kitten`.
If you would ever need to get the *instance*(`Kitten`) type of a class while you only have the input of a *static*(`typeof Kitten`), there is a Typescript Utility Type called [`InstanceType`](https://www.typescriptlang.org/docs/handbook/utility-types.html#instancetypetype). (Which was also the reason why typegoose had to rename its [`InstanceType` to `DocumentType`](../migration/migrate-6#instancetype-changed))

Example:

```ts
class Kitten {}

// T is "typeof Kitten" (static Kitten)
const T = Kitten;

// T is "Kitten" (instance of Kitten)
const T = Kitten;
// T is "Kitten" (instance of Kitten)
const T: Kitten = Kitten; // Error cannot assign "typeof Kitten" to "Kitten"
// T is "typeof Kitten" (static Kitten)
const T: typeof Kitten = Kitten;
// T is "Kitten" (instance of Kitten)
const T = new Kitten();
// T is "Kitten" (instance of Kitten)
const T: Kitten = new Kitten();
// T is "typeof Kitten" (static Kitten)
const T: typeof Kitten = new Kitten(); // Error cannot assign "Kitten" to "typeof Kitten"
```
