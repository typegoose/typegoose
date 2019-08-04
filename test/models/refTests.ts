import * as mongoose from 'mongoose';

import { arrayProp, prop, Ref, Typegoose } from '../../src/typegoose';

export class RefTestBuffer extends Typegoose {
  @prop()
  public _id: mongoose.Schema.Types.Buffer;
}

export class RefTestNumber extends Typegoose {
  @prop()
  public _id: number;
}

export class RefTestString extends Typegoose {
  @prop()
  public _id: string;
}

export const RefTestBufferModel = new RefTestBuffer().getModelForClass(RefTestBuffer);
export const RefTestNumberModel = new RefTestNumber().getModelForClass(RefTestNumber);
export const RefTestStringModel = new RefTestString().getModelForClass(RefTestString);

export class RefTest extends Typegoose {
  // ref objectid
  @prop({ ref: RefTest })
  public refField?: Ref<RefTest>;

  @prop({ ref: 'RefTest' })
  public refField2?: Ref<RefTest>;

  // ref objectid array
  @arrayProp({ itemsRef: RefTest })
  public refArray?: Ref<RefTest>[];

  @arrayProp({ itemsRef: 'RefTest' })
  public refArray2?: Ref<RefTest>[];

  // ref string
  @prop({ ref: RefTestString, refType: mongoose.Schema.Types.String })
  public refFieldString?: Ref<RefTestString, string>;

  @prop({ ref: 'RefTestString', refType: mongoose.Schema.Types.String })
  public refFieldString2?: Ref<RefTestString, string>;

  // ref string array
  @arrayProp({ itemsRef: RefTestString, itemsRefType: mongoose.Schema.Types.String })
  public refArrayString?: Ref<RefTestString, string>[];

  @arrayProp({ itemsRef: 'RefTestString', itemsRefType: mongoose.Schema.Types.String })
  public refArrayString2?: Ref<RefTestString, string>[];

  // ref number
  @prop({ ref: RefTestNumber, refType: mongoose.Schema.Types.Number })
  public refFieldNumber?: Ref<RefTestNumber, number>;

  @prop({ ref: 'RefTestNumber', refType: mongoose.Schema.Types.Number })
  public refFieldNumber2?: Ref<RefTestNumber, number>;

  // ref number array
  @arrayProp({ itemsRef: RefTestNumber, itemsRefType: mongoose.Schema.Types.Number })
  public refArrayNumber?: Ref<RefTestNumber, number>[];

  @arrayProp({ itemsRef: 'RefTestNumber', itemsRefType: mongoose.Schema.Types.Number })
  public refArrayNumber2?: Ref<RefTestNumber, number>[];

  // ref buffer
  @prop({ ref: RefTestBuffer, refType: mongoose.Schema.Types.Buffer })
  public refFieldBuffer?: Ref<RefTestBuffer, Buffer>;

  @prop({ ref: 'RefTestBuffer', refType: mongoose.Schema.Types.Buffer })
  public refFieldBuffer2?: Ref<RefTestBuffer, Buffer>;

  // ref buffer array
  @arrayProp({ itemsRef: RefTestBuffer, itemsRefType: mongoose.Schema.Types.Buffer })
  public refArrayBuffer?: Ref<RefTestBuffer, Buffer>[];

  @arrayProp({ itemsRef: 'RefTestBuffer', itemsRefType: mongoose.Schema.Types.Buffer })
  public refArrayBuffer2?: Ref<RefTestBuffer, Buffer>[];
}

export const model = new RefTest().getModelForClass(RefTest);
