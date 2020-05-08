---
title: "Migrate to 8.0.0"
classes: wide
---

These are the changes needed to migrate to version 8 of Typegoose.

## Typings for document creation
Document creation now has types, so some old code may fail. Note that now, you MUST specify which parameters are optional and which are mandatory in your classes with `?` and `!`. Note that no modifier means that the property will be assumed required.

```ts
// This is bad - both name and favoriteNumber are not supposed to be mandatory, but appear mandatory to TypeScript
class MyOldClass {
  @prop();
  name: string;

  @prop();
  favoriteNumber: number;
}

const MyOldClassModel = getModelForClass(MyOldClass);

new MyOldClassModel(); // TypeScript error
new MyOldClassModel({ }); // TypeScript complains
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

new MyOldClassModel(); // TypeScript error
MyOldClass.create(); // TypeScript error
new MyOldClassModel({ }); // Works
new MyOldClassModel({
  name: 'Bob',
  favoriteNumber: 23
}); // Works
```

Note that zero-argument creation will now be a TypeScript (but not runtime) error. Of course, you can always specify an empty object literal and achieve the same thing with no chance of error.

Note that the auto-detection for values to specify in the creation is imperfect. It will require that you specify all properties that have both a getter and a setter. As a workaround, specify the keys to ignore for creation as a generic parameter.

In addition, parameters with a default cannot be detected, so there is a second generic parameter for them.

```ts
class Name {
  @prop({ required: true, default: 'Will' })
  public firstName: string;

  @prop({ required: true })
  public lastName: string;

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

new Name({
  firstName: 'Johnny',
  lastName: 'Appleseed',
  fullName: 'Johnny Appleseed'
}); // Works


// First parameter allows excluding a property entirely
new Name<'firstName' | 'lastName'>({ fullName: 'Johnny Appleseed' }); // Works
new Name<'fullName'>({ firstName: 'Johnny', lastName: 'Appleseed' }) // Works
new Name<'fullName'>({
  firstName: 'Johnny',
  lastName: 'Appleseed',
  fullName: 'Johnny Appleseed'
}); // Fails: does not expect fullName parameter


// Second parameter allows making a property optional
new Name<'fullName'>({
  lastName: 'Appleseed'
}); // Fails: TypeScript expects firstName key-value pair
new Name<'fullName', 'firstName'>({ lastName: 'Appleseed' }) // Works
new Name<'fullName', 'firstName'>({
  firstName: 'Bobby',
  lastName: 'Appleseed'
}) // Works: unlike with first parameter, you can still specify key-value pair

// You can exclude the first parameter by putting never
new Name<never, 'firstName'>({
  lastName: 'Appleseed',
  fullName: 'Bobby Appleseed'
}) // Works
```