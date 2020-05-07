---
title: "Migrate to 8.0.0"
classes: wide
---

These are the changes needed to migrate to version 8 of Typegoose.

## Typings for document creation
Document creation now has types, so some old code may fail. Note that now, you MUST specify which parameters are optional and which are mandatory in your classes with `?` and `!`. Note that no modifier means that the property will be assumed required.

```ts
// This is bad - both name and favoriteNumber are supposed to be mandatory, but appear mandatory to TypeScript
class MyOldClass {
  @prop();
  name: string;

  @prop();
  favoriteNumber: number;
}

const MyOldClassModel = getModelForClass(MyOldClass);

new MyOldClassModel({ }); // TypeScript complains
new MyOldClassModel(); // Works, but it should not
new MyOldClassModel({
  name: 'Bob',
  favoriteNumber: 23
}); // Works
```

Usually, fixing is easy:

```ts
class MyNewClass {
  @prop()
  name?: string;

  @prop()
  favoriteNumber?: number;
};

const MyOldClassModel = getModelForClass(MyOldClass);

new MyOldClassModel(); // Works, but should not
MyOldClass.create(); // IMPORTANT: TYPESCRIPT ERROR
new MyOldClassModel({ }); // Works
new MyOldClassModel({
  name: 'Bob',
  favoriteNumber: 23
}); // Works
```

Note that zero-argument creation from `.create()` will throw an error. Zero-argument creation with the constructor is deprecated but still supported for Mongoose compatibility reasons. It will likely be removed in a future version, so remove it from your code immediately.

Of course, you can always specify an empty object literal and achieve the same thing with no chance of error.

Note that the auto-detection for values to specify in the creation is imperfect. It will require that you specify all properties that have both a getter and a setter. As a workaround, specify the keys to ignore for creation as a generic parameter.

```ts
class Name {
  @prop()
  public firstName?: string;

  @prop()
  public lastName?: string;

  // this will create a virtual property called 'fullName'
  public get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  public set fullName(full) {
    const [firstName, lastName] = full.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

new Name({ firstName: 'John', lastName: 'Smith' }); // TypeScript complains, but it shouldn't
new Name({ fullName: 'John Smith' }); // Works
new Name<'fullName'>({ firstName: 'John', lastName: 'Smith' }); // Works
```