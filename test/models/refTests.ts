import { getModelForClass, getName, mongoose, prop, Ref } from '../../src/typegoose';

export class RefTestBuffer {
  @prop()
  public _id!: mongoose.Types.Buffer;
}

export class RefTestNumber {
  @prop()
  public _id!: number;
}

export class RefTestString {
  @prop()
  public _id!: string;
}

export class RefTestStringOptional {
  @prop()
  public _id?: string;
}

export class RefTestStringOrUndefined {
  @prop()
  public _id!: string | undefined;
}

export const RefTestBufferModel = getModelForClass(RefTestBuffer);
export const RefTestNumberModel = getModelForClass(RefTestNumber);
export const RefTestStringModel = getModelForClass(RefTestString);

export class RefTest {
  // ref objectid
  @prop({ ref: RefTest })
  public refField?: Ref<RefTest>;

  @prop({ ref: getName(RefTest) })
  public refField2?: Ref<RefTest>;

  // ref objectid array
  @prop({ ref: RefTest })
  public refArray?: Ref<RefTest>[];

  @prop({ ref: getName(RefTest) })
  public refArray2?: Ref<RefTest>[];

  // ref string
  @prop({ ref: RefTestString, type: mongoose.Schema.Types.String })
  public refFieldString?: Ref<RefTestString/* , string */>; // RefType not set, to know if automatic Ref is brocken

  @prop({ ref: getName(RefTestString), type: mongoose.Schema.Types.String })
  public refFieldString2?: Ref<RefTestString/* , string */>; // RefType not set, to know if automatic Ref is brocken

  // ref string array
  @prop({ ref: RefTestString, type: mongoose.Schema.Types.String })
  public refArrayString?: Ref<RefTestString, string>[];

  @prop({ ref: getName(RefTestString), type: mongoose.Schema.Types.String })
  public refArrayString2?: Ref<RefTestString, string>[];

  // ref string optional or undefined
  @prop({ ref: RefTestString, type: mongoose.Schema.Types.String })
  public refFieldStringOptional?: Ref<RefTestStringOptional /* , string */>; // RefType not set, to know if automatic Ref is brocken

  @prop({ ref: getName(RefTestString), type: mongoose.Schema.Types.String })
  public refFieldStringOrUndefined?: Ref<RefTestStringOrUndefined /* , string */>; // RefType not set, to know if automatic Ref is brocken

  // ref string array
  @prop({ ref: RefTestString, type: mongoose.Schema.Types.String })
  public refArrayStringOptional?: Ref<RefTestStringOptional, string>[];

  @prop({ ref: getName(RefTestString), type: mongoose.Schema.Types.String })
  public refArrayStringOrUndefined?: Ref<RefTestStringOrUndefined, string>[];

  // ref number
  @prop({ ref: RefTestNumber, type: mongoose.Schema.Types.Number })
  public refFieldNumber?: Ref<RefTestNumber, number>;

  @prop({ ref: getName(RefTestNumber), type: mongoose.Schema.Types.Number })
  public refFieldNumber2?: Ref<RefTestNumber, number>;

  // ref number array
  @prop({ ref: RefTestNumber, type: mongoose.Schema.Types.Number })
  public refArrayNumber?: Ref<RefTestNumber, number>[];

  @prop({ ref: getName(RefTestNumber), type: mongoose.Schema.Types.Number })
  public refArrayNumber2?: Ref<RefTestNumber, number>[];

  // ref buffer
  @prop({ ref: RefTestBuffer, type: mongoose.Schema.Types.Buffer })
  public refFieldBuffer?: Ref<RefTestBuffer, mongoose.Types.Buffer | Buffer>;

  @prop({ ref: getName(RefTestBuffer), type: mongoose.Schema.Types.Buffer })
  public refFieldBuffer2?: Ref<RefTestBuffer, mongoose.Types.Buffer | Buffer>;

  // ref buffer array
  @prop({ ref: RefTestBuffer, type: mongoose.Schema.Types.Buffer })
  public refArrayBuffer?: Ref<RefTestBuffer, mongoose.Types.Buffer | Buffer>[];

  @prop({ ref: getName(RefTestBuffer), type: mongoose.Schema.Types.Buffer })
  public refArrayBuffer2?: Ref<RefTestBuffer, mongoose.Types.Buffer | Buffer>[];
}

export const RefTestModel = getModelForClass(RefTest);

export class RefTestArrayTypes {
  @prop({ ref: RefTestString, type: String })
  public array?: mongoose.Types.Array<Ref<RefTestString>>;
}

export const RefTestArrayTypesModel = getModelForClass(RefTestArrayTypes);
