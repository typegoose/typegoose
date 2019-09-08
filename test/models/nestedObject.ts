import { arrayProp, getModelForClass, prop } from '../../src/typegoose';

export class AddressNested {
  public street: string;

  constructor(street: string) {
    this.street = street;
  }
}

export class PersonNested {
  @prop()
  public name: string;

  @prop()
  public address: AddressNested;

  @arrayProp({ items: AddressNested })
  public moreAddresses: AddressNested[];
}

export const PersonNestedModel = getModelForClass(PersonNested);
