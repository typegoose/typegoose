import * as mongoose from 'mongoose';
import * as tg from '../../typegoose';

export class AddressNested {
  street: string;

  constructor(street: string) {
    this.street = street;
  }
}

export class PersonNested extends tg.Typegoose {
  @tg.prop()
  name: string;
  @tg.prop()
  address: AddressNested;
  @tg.prop()
  moreAddresses: AddressNested[] = [];
}

export const PersonNestedModel = new PersonNested().getModelForClass(PersonNested);
