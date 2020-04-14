---
title: "Hooks"
---

Note that additional typing information is required either by passing the class itself as a type parameter `<Car>` or explicitly telling TypeScript that `this` is a `Car` (`this: Car`). This will grant typing information inside the hook function. (Look into the tests for "live" examples)

## @pre

`@pre<T>(name: string | string[] | regexp | regexp[], method: () => any)` is used to set Pre-Hooks
  `@pre` supports to use an array of method names for comfort (this is not mongoose-native)

Note: Arrow Functions cannot be used here, because the binding of `this` is required to get & modify the document.

Example:

```ts
@pre<Car>('save', function() {
  if (this.model === 'Tesla') {
    this.isFast = true;
  }
})
class Car {
  @prop({ required: true })
  public model!: string;

  @prop()
  public isFast?: boolean;
}
```

## @post

`@post<T>(name: string | string[] | regexp | regexp[], method: () => any)` is used to set Post-Hooks
  `@post` supports to use an array of method names for comfort (this is not mongoose-native)

Example:

```ts
@post<Car>('save', (car) => {
  if (car.topSpeedInKmH > 300) {
    console.log(car.model, 'is fast!');
  }
})
class Car {
  @prop({ required: true })
  public model!: string;

  @prop({ required: true })
  public topSpeedInKmH!: number;
}
```
