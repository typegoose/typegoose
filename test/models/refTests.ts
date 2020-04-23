import { arrayProp, getModelForClass, mongoose, prop, Ref } from '../../src/typegoose';

export class RefTestBuffer {
  @prop()
  public _id: mongoose.Schema.Types.Buffer;
}

export class RefTestNumber {
  @prop()
  public _id: number;
}

export class RefTestString {
  @prop()
  public _id: string;
}

export const RefTestBufferModel = getModelForClass(RefTestBuffer);
export const RefTestNumberModel = getModelForClass(RefTestNumber);
export const RefTestStringModel = getModelForClass(RefTestString);

export class RefTest {
  // ref objectid
  @prop({ ref: RefTest })
  public refField?: Ref<RefTest>;

  @prop({ ref: 'RefTest' })
  public refField2?: Ref<RefTest>;

  // ref objectid array
  @arrayProp({ ref: RefTest })
  public refArray?: Ref<RefTest>[];

  @arrayProp({ ref: 'RefTest' })
  public refArray2?: Ref<RefTest>[];

  // ref string
  @prop({ ref: RefTestString, refType: mongoose.Schema.Types.String })
  public refFieldString?: Ref<RefTestString/* , string */>; // RefType not set, to know if automatic Ref is brocken

  @prop({ ref: 'RefTestString', refType: mongoose.Schema.Types.String })
  public refFieldString2?: Ref<RefTestString/* , string */>; // RefType not set, to know if automatic Ref is brocken

  // ref string array
  @arrayProp({ ref: RefTestString, refType: mongoose.Schema.Types.String })
  public refArrayString?: Ref<RefTestString, string>[];

  @arrayProp({ ref: 'RefTestString', refType: mongoose.Schema.Types.String })
  public refArrayString2?: Ref<RefTestString, string>[];

  // ref number
  @prop({ ref: RefTestNumber, refType: mongoose.Schema.Types.Number })
  public refFieldNumber?: Ref<RefTestNumber, number>;

  @prop({ ref: 'RefTestNumber', refType: mongoose.Schema.Types.Number })
  public refFieldNumber2?: Ref<RefTestNumber, number>;

  // ref number array
  @arrayProp({ ref: RefTestNumber, refType: mongoose.Schema.Types.Number })
  public refArrayNumber?: Ref<RefTestNumber, number>[];

  @arrayProp({ ref: 'RefTestNumber', refType: mongoose.Schema.Types.Number })
  public refArrayNumber2?: Ref<RefTestNumber, number>[];

  // ref buffer
  @prop({ ref: RefTestBuffer, refType: mongoose.Schema.Types.Buffer })
  public refFieldBuffer?: Ref<RefTestBuffer, Buffer>;

  @prop({ ref: 'RefTestBuffer', refType: mongoose.Schema.Types.Buffer })
  public refFieldBuffer2?: Ref<RefTestBuffer, Buffer>;

  // ref buffer array
  @arrayProp({ ref: RefTestBuffer, refType: mongoose.Schema.Types.Buffer })
  public refArrayBuffer?: Ref<RefTestBuffer, Buffer>[];

  @arrayProp({ ref: 'RefTestBuffer', refType: mongoose.Schema.Types.Buffer })
  public refArrayBuffer2?: Ref<RefTestBuffer, Buffer>[];
}

export const RefTestModel = getModelForClass(RefTest);
