import { expectType, expectAssignable, expectError } from 'tsd-lite';
import * as typegoose from '../../../src/typegoose';
import { isDocument, isRefType, prop } from '../../../src/typegoose';
import { BeAnObject, BeAnyObject, IObjectWithTypegooseFunction } from '../../../src/types';

// decorators return type
expectType<PropertyDecorator>(typegoose.prop());
expectType<ClassDecorator>(typegoose.index({}));
expectType<ClassDecorator>(typegoose.modelOptions({}));
expectType<ClassDecorator>(typegoose.plugin(() => void 0));
expectType<ClassDecorator>(typegoose.pre('save', () => void 0));
expectType<ClassDecorator>(typegoose.post('save', () => void 0));
expectType<ClassDecorator>(
  typegoose.queryMethod(function () {
    return this;
  })
);

// non mongoose related function return types
expectType<void>(typegoose.setGlobalOptions({}));
expectType<void>(typegoose.setLogLevel('DEBUG'));

// mongoose related function return types
class TestClass {
  @prop()
  public dummy?: string;
}

const TestClassModel = typegoose.getModelForClass(TestClass);

expectType<typegoose.ReturnModelType<typeof TestClass>>(typegoose.getModelForClass(TestClass));
expectType<typegoose.ReturnModelType<typeof TestClass>>(typegoose.getDiscriminatorModelForClass(TestClassModel, TestClass));
expectType<typegoose.mongoose.Schema<typegoose.DocumentType<InstanceType<typeof TestClass>>>>(typegoose.buildSchema(TestClass));
expectType<typegoose.ReturnModelType<typeof TestClass>>(typegoose.addModelToTypegoose(TestClassModel, TestClass));

function testAutoInferRef() {
  class AutoObjectId {
    public _id!: typegoose.mongoose.Types.ObjectId;
  }

  class AutoString {
    public _id!: string;
  }

  class AutoNumber {
    public _id!: number;
  }

  class AutoBuffer {
    public _id!: typegoose.mongoose.Types.Buffer;
  }

  class AutoRef {
    @typegoose.prop()
    public objectid: typegoose.Ref<AutoObjectId>;

    @typegoose.prop()
    public string: typegoose.Ref<AutoString>;

    @typegoose.prop()
    public number: typegoose.Ref<AutoNumber>;

    @typegoose.prop()
    public buffer: typegoose.Ref<AutoBuffer>;
  }

  const AutoRefModel = typegoose.getModelForClass(AutoRef);
  const doc = new AutoRefModel({});

  expectType<typegoose.Ref<AutoObjectId, typegoose.mongoose.Types.ObjectId>>(doc.objectid);
  expectType<typegoose.Ref<AutoString, string>>(doc.string);
  expectType<typegoose.Ref<AutoNumber, number>>(doc.number);
  expectType<typegoose.Ref<AutoBuffer, typegoose.mongoose.Types.Buffer>>(doc.buffer);

  if (isDocument(doc.objectid)) {
    expectType<typegoose.DocumentType<AutoObjectId>>(doc.objectid);
  } else {
    expectType<typegoose.mongoose.Types.ObjectId>(doc.objectid);
  }

  if (isDocument(doc.string)) {
    expectType<typegoose.DocumentType<AutoString>>(doc.string);
  } else {
    expectType<string>(doc.string);
  }

  if (isDocument(doc.number)) {
    expectType<typegoose.DocumentType<AutoNumber>>(doc.number);
  } else {
    expectType<number>(doc.number);
  }

  if (isDocument(doc.buffer)) {
    expectType<typegoose.DocumentType<AutoBuffer>>(doc.buffer);
  } else {
    expectType<typegoose.mongoose.Types.Buffer>(doc.buffer);
  }
}

testAutoInferRef();

async function typeguards() {
  class TypeguardsClass {
    @typegoose.prop()
    public refObjectId?: typegoose.Ref<TypeguardsClass>;

    @typegoose.prop()
    public refString?: typegoose.Ref<TypeguardsClass, string>;

    @typegoose.prop()
    public refObjectIdArray?: typegoose.Ref<TypeguardsClass>[];

    @typegoose.prop()
    public refStringArray?: typegoose.Ref<TypeguardsClass, string>[];
  }

  const TypeguardsClassModel = typegoose.getModelForClass(TypeguardsClass);

  const someNewDoc = new TypeguardsClassModel();

  // top-level tests
  {
    if (typegoose.isDocument(someNewDoc)) {
      expectAssignable<typegoose.DocumentType<TypeguardsClass>>(someNewDoc);
    } else {
      // this type is currently wrong, typescript cannot remove the case because the input is not restricted enough
      expectAssignable<unknown>(someNewDoc);
    }

    if (typegoose.isRefType(someNewDoc, typegoose.mongoose.Types.ObjectId)) {
      // this should never happen at runtime, but I don't know the proper types to set for "isRefType", and so invalid types are here
    } else {
      // same here
    }
  }

  // nested tests
  {
    // isDocument
    {
      if (typegoose.isDocument(someNewDoc.refObjectId)) {
        expectType<typegoose.DocumentType<TypeguardsClass>>(someNewDoc.refObjectId);
      } else {
        expectType<typegoose.mongoose.Types.ObjectId | undefined>(someNewDoc.refObjectId);
      }

      if (typegoose.isDocument(someNewDoc.refString)) {
        expectAssignable<typegoose.DocumentType<TypeguardsClass>>(someNewDoc.refString);
      } else {
        expectType<string | undefined>(someNewDoc.refString);
      }
    }

    // isDocumentArray
    {
      if (typegoose.isDocumentArray(someNewDoc.refObjectIdArray)) {
        expectType<typegoose.DocumentType<TypeguardsClass>[]>(someNewDoc.refObjectIdArray);
      } else {
        // currently has to be multiple "| undefined" because of https://github.com/typegoose/typegoose/issues/730
        expectType<typegoose.Ref<TypeguardsClass, typegoose.mongoose.Types.ObjectId>[] | undefined>(someNewDoc.refObjectIdArray);
      }

      if (typegoose.isDocumentArray(someNewDoc.refStringArray)) {
        expectType<typegoose.DocumentType<TypeguardsClass>[]>(someNewDoc.refStringArray);
      } else {
        expectType<typegoose.Ref<TypeguardsClass, string>[] | undefined>(someNewDoc.refStringArray);
      }
    }

    // isRefType
    {
      if (typegoose.isRefType(someNewDoc.refObjectId, typegoose.mongoose.Types.ObjectId)) {
        expectType<typegoose.mongoose.Types.ObjectId>(someNewDoc.refObjectId);
      } else {
        expectType<typegoose.DocumentType<TypeguardsClass> | undefined>(someNewDoc.refObjectId);
      }

      if (typegoose.isRefType(someNewDoc.refString, String)) {
        expectType<string>(someNewDoc.refString);
      } else {
        expectType<typegoose.DocumentType<TypeguardsClass> | undefined>(someNewDoc.refString);
      }
    }

    // isRefTypeArray
    {
      if (typegoose.isRefTypeArray(someNewDoc.refObjectIdArray, typegoose.mongoose.Types.ObjectId)) {
        expectType<typegoose.mongoose.Types.ObjectId[]>(someNewDoc.refObjectIdArray);
      } else {
        // currently has to be multiple "| undefined" because of https://github.com/typegoose/typegoose/issues/730
        expectType<typegoose.Ref<TypeguardsClass, typegoose.mongoose.Types.ObjectId>[] | undefined>(someNewDoc.refObjectIdArray);
      }

      if (typegoose.isRefTypeArray(someNewDoc.refStringArray, String)) {
        expectType<string[]>(someNewDoc.refStringArray);
      } else {
        expectType<typegoose.Ref<TypeguardsClass, string>[] | undefined>(someNewDoc.refStringArray);
      }
    }
  }

  const someFoundDoc = await TypeguardsClassModel.findOne().exec();

  // top-level tests
  {
    if (typegoose.isDocument(someFoundDoc)) {
      expectAssignable<typegoose.DocumentType<TypeguardsClass>>(someFoundDoc);
    } else {
      // this type is currently wrong, typescript cannot remove the case because the input is not restricted enough
      expectAssignable<unknown>(someFoundDoc);
    }

    if (typegoose.isRefType(someFoundDoc, typegoose.mongoose.Types.ObjectId)) {
      // this should never happen at runtime, but I don't know the proper types to set for "isRefType", and so invalid types are here
    } else {
      // same here
    }
  }

  // test primitives
  isDocument(null);
  isDocument(undefined);
  isDocument('string');
  isRefType(null, String);
  isRefType(undefined, String);
  isRefType('string', String);

  // test errors
  expectError<Parameters<typeof isDocument>[0]>({});
}

typeguards();

async function testDocumentType() {
  const someNewDoc = new TestClassModel();

  expectType<typegoose.mongoose.HydratedDocument<TestClass, IObjectWithTypegooseFunction & BeAnyObject, BeAnObject>>(someNewDoc);

  const someCreatedDoc = await TestClassModel.create();

  expectType<typegoose.mongoose.HydratedDocument<TestClass, IObjectWithTypegooseFunction & BeAnyObject, BeAnObject>[]>(someCreatedDoc);

  const someFoundDoc = await TestClassModel.findOne();

  expectType<typegoose.mongoose.HydratedDocument<TestClass, IObjectWithTypegooseFunction & BeAnyObject, BeAnObject> | null>(someFoundDoc);

  expectType<typegoose.mongoose.Types.ObjectId>(someNewDoc._id);
}

testDocumentType();

async function gh732() {
  class SomeClass {
    @typegoose.prop()
    public someoptionalProp?: string;

    @typegoose.prop({ required: true })
    public somerequiredProp!: string;
  }

  const SomeClassModel = typegoose.getModelForClass(SomeClass);

  const doc = await SomeClassModel.create({ someoptionalProp: 'helloopt', somerequiredProp: 'helloreq' });

  expectType<typegoose.mongoose.HydratedDocument<SomeClass, IObjectWithTypegooseFunction & BeAnyObject, BeAnObject>>(doc);

  const toobj = doc.toObject();
  const tojson = doc.toJSON();

  expectType<
    SomeClass & { _id: typegoose.mongoose.Types.ObjectId } & Required<{
        _id: typegoose.mongoose.Types.ObjectId;
      }>
  >(toobj);
  expectType<typegoose.mongoose.FlattenMaps<SomeClass & { _id: typegoose.mongoose.Types.ObjectId }>>(tojson);
}

gh732();

function postHookErrorOption() {
  @typegoose.post<TestErrorOption>(
    'count',
    function (...args) {
      expectType<NativeError>(args[0]);
      expectType<any>(args[1]);
      expectType<typegoose.mongoose.CallbackWithoutResultAndOptionalError>(args[2]);
    },
    { errorHandler: true }
  )
  @typegoose.post<TestErrorOption>(
    'deleteOne',
    function (...args) {
      expectType<NativeError>(args[0]);
      expectType<any>(args[1]);
      expectType<typegoose.mongoose.CallbackWithoutResultAndOptionalError>(args[2]);
    },
    { errorHandler: true }
  )
  @typegoose.post(
    'aggregate',
    function (...args) {
      expectType<NativeError>(args[0]);
      expectType<any[]>(args[1]);
      expectType<typegoose.mongoose.CallbackWithoutResultAndOptionalError>(args[2]);
    },
    { errorHandler: true }
  )
  @typegoose.post<typeof TestErrorOption>(
    'insertMany',
    function (...args) {
      expectType<NativeError>(args[0]);
      expectType<any>(args[1]);
      expectType<typegoose.mongoose.CallbackWithoutResultAndOptionalError>(args[2]);
    },
    { errorHandler: true }
  )
  class TestErrorOption {}
}

postHookErrorOption();

function preHookExplicitDocumentQuery() {
  @typegoose.pre<TestExplicitOption>(
    'save',
    function () {
      expectType<typegoose.mongoose.HydratedDocument<typegoose.DocumentType<TestExplicitOption>>>(this);
    },
    { document: true }
  )
  @typegoose.pre(
    'updateOne',
    function () {
      expectType<boolean>(this.isNew);
    },
    { document: true, query: false }
  )
  @typegoose.pre(
    'updateOne',
    function () {
      this.find();
    },
    { document: false, query: true }
  )
  class TestExplicitOption {}
}

preHookExplicitDocumentQuery();
