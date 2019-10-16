---
title: "Virtuals"
---

## get & set

Mongoose gives developers the option to create [virtual properties](http://mongoosejs.com/docs/api.html#schema_Schema-virtual). This means that actual database read/write will not occur these are just 'calculated properties'. A virtual property can have a setter and a getter. TypeScript also has a similar feature which Typegoose uses for virtual property definitions (using the `prop` decorator).

*Please do not confuse this "get & set" with [`@prop`'s get & set]({{ site.baseurl }}{% link _docs/decorators/prop.md %}#get--set)*

**Please know that no decorator can be used for the getter's & setter's!** *(Mongoose dosnt allow setting options for virtuals)*

Example:

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
```

Resulting Document in MongoDB:

```js
{
  _id: ObjectId("<some long id>"),
  firstName: "Will",
  lastName: "Smith"
}
```

### Difference between @prop's get & set and this get & set

*This shows the difference between [`@prop`'s get & set]({{ site.baseurl }}{% link _docs/decorators/prop.md %}#get--set) and [this one]({{ site.baseurl }}{% link _docs/virtuals.md %}#get--set)*

The difference between `@prop`'s and this one is simple, `@prop`'s get & set are ***actual properties*** that get saved to the database, only with a conversion layer  
The get & set of *getter's & setter's* are absolutly virtual  

## Virtual Populate

Virtual-Populate is also supported by Typegoose

Options ([look here for more details](https://mongoosejs.com/docs/api/schema.html#schema_Schema-virtual)):
  - `ref`: This is like a normal ref **[Required]**
  - `foreignField`: Which property(on the ref-Class) to match `localField` against **[Required]**
  - `localField`: Which property(on the current-Class) to match `foreignField` against **[Required]**
  - `justOne`: Return as One Document(true) or as Array(false) ***[Optional]***
  - `count`: Return the number of Documents found instead of the actual Documents ***[Optional]***

Example:

```ts
class RefClass {
  @prop({ required: true, ref: Virtual })
  public refToName: Ref<Virtual>;
}

class Name {
  @prop({ ref: RefClass, foreignField: 'refToName', localField: '_id', justOne: true })
  public somevalue: Ref<RefClass>;
}
```
