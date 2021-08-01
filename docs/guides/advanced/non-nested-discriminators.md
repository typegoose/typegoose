---
id: non-nested-discriminators
title: 'Non-Nested Discriminators'
---

## Use-Case

If you dont know an use case for this, consider the following:  
An Veterinarian that wants to store information about the current patients in their care, how would it be done in mongoose / typegoose?

## First thought

At first you might think to do the following:

```ts
// to have an shared collection
@modelOptions({ schemaOptions: { collection: "animal" } })
class Animal {
  @prop({ required: true, unique: true })
  public patientNumber!: number;
}

class Dog extends Animal {
  @prop()
  public cageNumber!: number;
}

class Cat extends Animal {
  @prop()
  public nameTag!: string;
}

const AnimalModel = getModelForClass(Animal);
const DogModel = getModelForClass(Dog);
const CatModel = getModelForClass(Cat);
```

and then in some querying code:

```ts
await CatModel.create({ patientNumber: 0, nameTag: "Catty-1" });
await DogModel.create({ patientNumber: 1, cageNumber: 1 });

// for this example its an "findOne" to lower the example code
const found = await ParrotModel.findOne({}).exec();

// this will find should log one of the 2 created above
console.log("found", found);
```

which is obviously not what is wanted, there would be ways to test for what document is what, but there is an easier way: Discriminators.

## Fixing it with Discriminators

The code from [First thought](#first-thought) is actually not so far off of what discriminators will need:

```ts
@modelOptions({ schemaOptions: { collection: "animal" } })
class Animal {
  @prop({ required: true, unique: true })
  public patientNumber!: number;
}

class Dog extends Animal {
  @prop()
  public cageNumber!: number;
}

class Cat extends Animal {
  @prop()
  public nameTag!: string;
}

class Parrot extends Animal {
  @prop()
  public commonMessage?: string;
}

const AnimalModel = getModelForClass(Animal);
// difference is below here
const DogModel = getDiscriminatorModelForClass(AnimalModel, Dog);
const CatModel = getDiscriminatorModelForClass(AnimalModel, Cat);
const ParrotModel = getDiscriminatorModelForClass(AnimalModel, Parrot);
```

and then the querying code:

```ts
await CatModel.create({ patientNumber: 0, nameTag: "Catty-1" });
await DogModel.create({ patientNumber: 1, cageNumber: 1 });

// for this example its an "findOne" to lower the example code
const found = await ParrotModel.findOne({}).exec();

console.log("found", found);
```

and this time it will log `null`, because there is no `Parrot` document inside the collection.

You might ask "how does this work?", well, it is easy: mongoose will by default use the hidden property `__t` to differentiate between registered models from the shared parent, and the default value for the `__t` property is the model name. ([Look here for more on how typegoose generates an model name](../../api/decorators/modelOptions.md#customname))

## Query with Shared Parent Model

When using discriminators, it is also possible to use the shared parent to query for documents:

```ts
await CatModel.create({ patientNumber: 0, nameTag: "Catty-1" });
await DogModel.create({ patientNumber: 1, cageNumber: 1 });

// for this example its an "findOne" to lower the example code
const found = await AnimalModel.findOne({}).exec();

console.log("found", found);
```

this should find one of the 2 created documents, with full properties of one of those, but inside the code it will still be of type `Animal`.  
This can be solved by using custom type guards:

Classes & Models:

```ts
// an enum to make it easier to access the names for the typeguard
enum Names {
  DOG = "DOG",
  CAT = "CAT",
  PARROT = "PARROT",
}

@modelOptions({ schemaOptions: { collection: "animal" } })
class Animal {
  @prop({ required: true, unique: true })
  public patientNumber!: number;
}

class Dog extends Animal {
  @prop()
  public cageNumber!: number;
}

class Cat extends Animal {
  @prop()
  public nameTag!: string;
}

class Parrot extends Animal {
  @prop()
  public commonMessage?: string;
}

const AnimalModel = getModelForClass(Animal);
const DogModel = getDiscriminatorModelForClass(AnimalModel, Dog, Names.DOG);
const CatModel = getDiscriminatorModelForClass(AnimalModel, Cat, Names.CAT);
const ParrotModel = getDiscriminatorModelForClass(AnimalModel, Parrot, Names.PARROT);
```

Query Code:

```ts
function checkForClass<T extends Animal>(doc: mongoose.Document & KeyStringAny, name: string): doc is DocumentType<T> {
  return doc?.__t === name;
}

await CatModel.create({ patientNumber: 0, nameTag: "Catty-1" });
await DogModel.create({ patientNumber: 1, cageNumber: 1 });

// for this example its an "findOne" to lower the example code
const found = await AnimalModel.findOne({ patientNumber: 0 }).orFail().exec();

if (checkForClass<Cat>(found, Names.CAT)) {
  console.log("runtime Cat", found.nameTag);
}
console.log("found", found);
```

this code should now log `runtime Cat Catty-1` and the full document and types should also work inside the if-block.

## Extras

This property name can be changed with the schemaOption [`discriminatorKey`](https://mongoosejs.com/docs/guide.html#discriminatorKey).  
The value of the `discriminatorKey` (default: `__t`) can also be changed, by defining the property on the class (/ schema).

Example:

```ts
@modelOptions({ schemaOptions: { collection: "animal", discriminatorKey: "customKey" } })
class Animal {
  @prop({ required: true, unique: true })
  public patientNumber!: number;

  // options "enum" & "default" can also be specified, but dont have much effect
  // the property set in "discriminatorKey" does not actually need to be defined, but its for types like usage in an typeguard
  @prop({ required: true })
  public customKey!: string; // its recommended to only use "string" or "number"
}

class Dog extends Animal {
  @prop()
  public cageNumber!: number;
}

class Cat extends Animal {
  @prop()
  public nameTag!: string;
}

class Parrot extends Animal {
  @prop()
  public commonMessage?: string;
}

const AnimalModel = getModelForClass(Animal);
// difference is below here
const DogModel = getDiscriminatorModelForClass(AnimalModel, Dog, "customDog");
const CatModel = getDiscriminatorModelForClass(AnimalModel, Cat, "customCat");
const ParrotModel = getDiscriminatorModelForClass(AnimalModel, Parrot, "customParrot");
```

and so instead of the model name (example: `Cat`), it will be stored as `customCat` inside property `customKey`.
