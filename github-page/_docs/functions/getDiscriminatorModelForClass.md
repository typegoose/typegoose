---
title: "Get Discriminator Model For Class"
redirect_from:
  - /docs/functions/getdiscriminatormodelforclass
---

`getDiscriminatorModelForClass(from: mongoose.model<any>, class, discriminator?: string)` is used to get a model for a given discriminator
  - `from`: which is the base model
  - `class`: the class to use for the *new* model
  - `discriminator` [optional]: set an custom discriminator id (defaults to `class`'s name)

## Example

```ts
class Event {
  @prop({ required: true })
  public name!: string;
}

class ClickEvent extends Event {
  @prop({ required: true, default: 0})
  public timesClicked!: number;
}

const EventModel = getModelForClass(Event);
const ClickEventModel = getDiscriminatorModelForClass(EventModel, ClickEvent);
```
