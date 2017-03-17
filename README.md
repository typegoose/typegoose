# Typegoose
Define Mongoose models using TypeScript classes.

A common problem when using Mongoose with TypeScript is that you have to define
both the Mongoose model and the TypeScript interface.

If the model changes, you also have to keep the TypeScript interface file in sync
or the TypeScript interface would not represent the real data structure of the
model.

Typegoose aims to solve this problem by defining only a TypeScript interface (class)
which need to be annotated with special Mongoose annotations.

Instead of:
```typescript
interface User {
  name?: string;
  age: number;
  job?: Job;
  car: Car | string;
}

interface Job {
  title?: string;
  position?: string;
}

interface Car {
  model?: string;
}

mongoose.model('User', {
  name: String,
  age: { type: Number, required: true },
  job: {
    title: String;
    position: String;
  },
  car: { type: Schema.Types.ObjectId, ref: 'Car' }
});

mongoose.model('Car', {
  model: string,
});
```
You can just:
```typescript
class User extends Typegoose {
  @prop
  name?: string;

  @prop
  @required
  age: number;

  @subdoc
  job?: Job;

  @ref(Car)
  @required
  car: Ref<Car>;
}

class Job extends Typegoose {
  @prop
  title?: string;

  @prop
  position?: string;
}

class Car extends Typegoose {
  @prop
  model?: string;
}
```
