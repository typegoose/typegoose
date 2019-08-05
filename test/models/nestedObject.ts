import { prop, Typegoose } from '../../src/typegoose';

export class AddressNested {
  public street: string;

  constructor(street: string) {
    this.street = street;
  }
}

export class PersonNested extends Typegoose {
  @prop()
  public name: string;

  @prop()
  public address: AddressNested;

  @prop()
  public moreAddresses: AddressNested[] = [];
}

export const PersonNestedModel = new PersonNested().getModelForClass(PersonNested);
