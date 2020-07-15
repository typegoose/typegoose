---
id: hooks
title: 'Hooks'
---

## @pre

`@pre<T>(name: string | string[] | regexp | regexp[], method: () => any)` is used to set Pre-Hooks
- `@pre` supports the use of an array of method names for comfort (this is not mongoose-native)

Note: Arrow Functions cannot be used here, because the binding of `this` is required to get & modify the document.

Example:

```ts
@pre<Car>('save', function () {
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
- `@post` supports the use of an array of method names for comfort (this is not mongoose-native)

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
