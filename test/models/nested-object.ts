import * as tg from '../../src/typegoose';

export class AddressNested {
  public street: string;

  constructor(street: string) {
    this.street = street;
  }
}

export class PersonNested extends tg.Typegoose {
  @tg.prop()
  public name: string;

  @tg.prop()
  public address: AddressNested;

  @tg.prop()
  public moreAddresses: AddressNested[] = [];
}

export const PersonNestedModel = new PersonNested().getModelForClass(PersonNested);
