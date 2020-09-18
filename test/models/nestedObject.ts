import { getModelForClass, prop } from '../../src/typegoose';

export class AddressNested {
  @prop()
  public street?: string;
}

export class PersonNested {
  @prop()
  public name?: string;

  @prop({ _id: false })
  public address?: AddressNested;

  @prop({ _id: false, type: AddressNested })
  public moreAddresses?: AddressNested[];
}

export const PersonNestedModel = getModelForClass(PersonNested);
export const AddressNestedModel = getModelForClass(AddressNested);
