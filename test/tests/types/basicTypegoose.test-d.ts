import { expect } from 'tstyche';
import * as typegoose from '../../../src/typegoose';
import { isDocument, isRefType, prop } from '../../../src/typegoose';
import { BeAnObject, BeAnyObject, IObjectWithTypegooseFunction } from '../../../src/types';

// decorators return type
expect(typegoose.prop()).type.toEqual<PropertyDecorator>();
expect(typegoose.index({})).type.toEqual<ClassDecorator>();
expect(typegoose.modelOptions({})).type.toEqual<ClassDecorator>();
expect(typegoose.plugin(() => void 0)).type.toEqual<ClassDecorator>();
expect(typegoose.pre('save', () => void 0)).type.toEqual<ClassDecorator>();
expect(typegoose.post('save', () => void 0)).type.toEqual<ClassDecorator>();
expect(
  typegoose.queryMethod(function () {
    return this;
  })
).type.toEqual<ClassDecorator>();

// non mongoose related function return types
expect(typegoose.setGlobalOptions({})).type.toBeVoid();
expect(typegoose.setLogLevel('DEBUG')).type.toBeVoid();

// mongoose related function return types
class TestClass {
  @prop()
  public dummy?: string;
}

const TestClassModel = typegoose.getModelForClass(TestClass);

expect(typegoose.getModelForClass(TestClass)).type.toEqual<typegoose.ReturnModelType<typeof TestClass>>();
expect(typegoose.getDiscriminatorModelForClass(TestClassModel, TestClass)).type.toEqual<typegoose.ReturnModelType<typeof TestClass>>();
expect(typegoose.buildSchema(TestClass)).type.toEqual<typegoose.mongoose.Schema<typegoose.DocumentType<InstanceType<typeof TestClass>>>>();
expect(typegoose.addModelToTypegoose(TestClassModel, TestClass)).type.toEqual<typegoose.ReturnModelType<typeof TestClass>>();

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

  expect(doc.objectid).type.toEqual<typegoose.Ref<AutoObjectId, typegoose.mongoose.Types.ObjectId>>();
  expect(doc.string).type.toEqual<typegoose.Ref<AutoString, string>>();
  expect(doc.number).type.toEqual<typegoose.Ref<AutoNumber, number>>();
  expect(doc.buffer).type.toEqual<typegoose.Ref<AutoBuffer, typegoose.mongoose.Types.Buffer>>();

  if (isDocument(doc.objectid)) {
    expect(doc.objectid).type.toEqual<typegoose.DocumentType<AutoObjectId>>();
  } else {
    expect(doc.objectid).type.toEqual<typegoose.mongoose.Types.ObjectId>();
  }

  if (isDocument(doc.string)) {
    expect(doc.string).type.toEqual<typegoose.DocumentType<AutoString>>();
  } else {
    expect(doc.string).type.toBeString();
  }

  if (isDocument(doc.number)) {
    expect(doc.number).type.toEqual<typegoose.DocumentType<AutoNumber>>();
  } else {
    expect(doc.number).type.toBeNumber();
  }

  if (isDocument(doc.buffer)) {
    expect(doc.buffer).type.toEqual<typegoose.DocumentType<AutoBuffer>>();
  } else {
    expect(doc.buffer).type.toEqual<typegoose.mongoose.Types.Buffer>();
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
      expect<typegoose.DocumentType<TypeguardsClass>>().type.toBeAssignable(someNewDoc);
    } else {
      // this type is currently wrong, typescript cannot remove the case because the input is not restricted enough
      expect<unknown>().type.toBeAssignable(someNewDoc);
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
        expect(someNewDoc.refObjectId).type.toEqual<typegoose.DocumentType<TypeguardsClass>>();
      } else {
        expect(someNewDoc.refObjectId).type.toEqual<typegoose.mongoose.Types.ObjectId | undefined>();
      }

      if (typegoose.isDocument(someNewDoc.refString)) {
        expect<typegoose.DocumentType<TypeguardsClass>>().type.toBeAssignable(someNewDoc.refString);
      } else {
        expect(someNewDoc.refString).type.toEqual<string | undefined>();
      }
    }

    // isDocumentArray
    {
      if (typegoose.isDocumentArray(someNewDoc.refObjectIdArray)) {
        expect(someNewDoc.refObjectIdArray).type.toEqual<typegoose.DocumentType<TypeguardsClass>[]>();
      } else {
        // currently has to be multiple "| undefined" because of https://github.com/typegoose/typegoose/issues/730
        expect(someNewDoc.refObjectIdArray).type.toEqual<typegoose.Ref<TypeguardsClass, typegoose.mongoose.Types.ObjectId>[] | undefined>();
      }

      if (typegoose.isDocumentArray(someNewDoc.refStringArray)) {
        expect(someNewDoc.refStringArray).type.toEqual<typegoose.DocumentType<TypeguardsClass>[]>();
      } else {
        expect(someNewDoc.refStringArray).type.toEqual<typegoose.Ref<TypeguardsClass, string>[] | undefined>();
      }
    }

    // isRefType
    {
      if (typegoose.isRefType(someNewDoc.refObjectId, typegoose.mongoose.Types.ObjectId)) {
        expect(someNewDoc.refObjectId).type.toEqual<typegoose.mongoose.Types.ObjectId>();
      } else {
        expect(someNewDoc.refObjectId).type.toEqual<typegoose.DocumentType<TypeguardsClass> | undefined>();
      }

      if (typegoose.isRefType(someNewDoc.refString, String)) {
        expect(someNewDoc.refString).type.toBeString();
      } else {
        expect(someNewDoc.refString).type.toEqual<typegoose.DocumentType<TypeguardsClass> | undefined>();
      }
    }

    // isRefTypeArray
    {
      if (typegoose.isRefTypeArray(someNewDoc.refObjectIdArray, typegoose.mongoose.Types.ObjectId)) {
        expect(someNewDoc.refObjectIdArray).type.toEqual<typegoose.mongoose.Types.ObjectId[]>();
      } else {
        // currently has to be multiple "| undefined" because of https://github.com/typegoose/typegoose/issues/730
        expect(someNewDoc.refObjectIdArray).type.toEqual<typegoose.Ref<TypeguardsClass, typegoose.mongoose.Types.ObjectId>[] | undefined>();
      }

      if (typegoose.isRefTypeArray(someNewDoc.refStringArray, String)) {
        expect(someNewDoc.refStringArray).type.toEqual<string[]>();
      } else {
        expect(someNewDoc.refStringArray).type.toEqual<typegoose.Ref<TypeguardsClass, string>[] | undefined>();
      }
    }
  }

  const someFoundDoc = await TypeguardsClassModel.findOne().exec();

  // top-level tests
  {
    if (typegoose.isDocument(someFoundDoc)) {
      expect<typegoose.DocumentType<TypeguardsClass>>().type.toBeAssignable(someFoundDoc);
    } else {
      // this type is currently wrong, typescript cannot remove the case because the input is not restricted enough
      expect<unknown>().type.toBeAssignable(someFoundDoc);
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
  expect<Parameters<typeof isDocument>[0]>().type.not.toBeAssignable({});
}

typeguards();

async function testDocumentType() {
  const someNewDoc = new TestClassModel();

  expect(someNewDoc).type.toEqual<typegoose.mongoose.HydratedDocument<TestClass, IObjectWithTypegooseFunction & BeAnyObject, BeAnObject>>();

  const someCreatedDoc = await TestClassModel.create();

  expect(someCreatedDoc).type.toEqual<
    typegoose.mongoose.HydratedDocument<TestClass, IObjectWithTypegooseFunction & BeAnyObject, BeAnObject>[]
  >();

  const someFoundDoc = await TestClassModel.findOne();

  expect(someFoundDoc).type.toEqual<typegoose.mongoose.HydratedDocument<
    TestClass,
    IObjectWithTypegooseFunction & BeAnyObject,
    BeAnObject
  > | null>();

  expect(someNewDoc._id).type.toEqual<typegoose.mongoose.Types.ObjectId>();
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

  expect(doc).type.toEqual<typegoose.mongoose.HydratedDocument<SomeClass, IObjectWithTypegooseFunction & BeAnyObject, BeAnObject>>();

  const toobj = doc.toObject();
  const tojson = doc.toJSON();

  expect(toobj).type.toEqual<
    SomeClass & { _id: typegoose.mongoose.Types.ObjectId } & Required<{
        _id: typegoose.mongoose.Types.ObjectId;
      }>
  >();
  expect(tojson).type.toEqual<typegoose.mongoose.FlattenMaps<SomeClass & { _id: typegoose.mongoose.Types.ObjectId }>>();
}

gh732();

function postHookErrorOption() {
  @typegoose.post<TestErrorOption>(
    'count',
    function (...args) {
      expect(args[0]).type.toEqual<NativeError>();
      expect(args[1]).type.toBeAny();
      expect(args[2]).type.toEqual<typegoose.mongoose.CallbackWithoutResultAndOptionalError>();
    },
    { errorHandler: true }
  )
  @typegoose.post<TestErrorOption>(
    'deleteOne',
    function (...args) {
      expect(args[0]).type.toEqual<NativeError>();
      expect(args[1]).type.toBeAny();
      expect(args[2]).type.toEqual<typegoose.mongoose.CallbackWithoutResultAndOptionalError>();
    },
    { errorHandler: true }
  )
  @typegoose.post(
    'aggregate',
    function (...args) {
      expect(args[0]).type.toEqual<NativeError>();
      expect(args[1]).type.toEqual<any[]>();
      expect(args[2]).type.toEqual<typegoose.mongoose.CallbackWithoutResultAndOptionalError>();
    },
    { errorHandler: true }
  )
  @typegoose.post<typeof TestErrorOption>(
    'insertMany',
    function (...args) {
      expect(args[0]).type.toEqual<NativeError>();
      expect(args[1]).type.toBeAny();
      expect(args[2]).type.toEqual<typegoose.mongoose.CallbackWithoutResultAndOptionalError>();
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
      expect(this).type.toEqual<typegoose.mongoose.HydratedDocument<typegoose.DocumentType<TestExplicitOption>>>();
    },
    { document: true }
  )
  @typegoose.pre(
    'updateOne',
    function () {
      expect(this.isNew).type.toBeBoolean();
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

function discriminatorWithDifferentId() {
  class Base {
    @prop({ type: () => String, required: true })
    _id!: string;
  }

  class Child extends Base {
    someProb!: string;
  }

  const BaseModel = typegoose.getModelForClass(Base);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ChildModel = typegoose.getDiscriminatorModelForClass(BaseModel, Child);
}

discriminatorWithDifferentId();

function testFilterFunctionsType() {
  class Nested {
    @prop()
    public test?: string;
  }

  class Root {
    @prop()
    public primitive?: string;

    @prop({ type: String })
    public primitiveArr?: string[];

    public test(v: string) {
      console.log('hello', v);
    }

    get testy() {
      return 'hello';
    }

    set testy(v) {
      return;
    }

    public static stest(v: string) {
      console.log('stest', v);
    }

    @prop()
    public nest?: Nested;

    @prop()
    public ref?: typegoose.Ref<Nested>;

    @prop({ type: () => Nested })
    public nestArr?: Nested[];

    @prop({ ref: () => Nested })
    public refArr?: typegoose.Ref<Nested>[];
  }

  expect<Pick<Root, keyof Root>>().type.toEqual<{
    ref?: typegoose.types.Ref<Nested, typegoose.mongoose.Types.ObjectId> | undefined;
    test: (v: string) => void;
    primitive?: string | undefined;
    primitiveArr?: string[] | undefined;
    nest?: Nested | undefined;
    nestArr?: Nested[] | undefined;
    refArr?: typegoose.types.Ref<Nested>[] | undefined;
    testy: string;
  }>();

  expect<typegoose.types.FilterOutFunctionKeys<Root>>().type.toEqual<{
    ref?: typegoose.types.Ref<Nested, typegoose.mongoose.Types.ObjectId> | undefined;
    // test: (v: string) => void;
    primitive?: string | undefined;
    primitiveArr?: string[] | undefined;
    nest?: Nested | undefined;
    nestArr?: Nested[] | undefined;
    refArr?: typegoose.types.Ref<Nested>[] | undefined;
    testy: string;
  }>();
}

testFilterFunctionsType();

async function queryhelpers() {
  interface FindHelpers {
    findByName: typegoose.types.AsQueryMethod<typeof findByName>;
    findByLastname: typegoose.types.AsQueryMethod<typeof findByLastname>;
  }

  function findByName(this: typegoose.types.QueryHelperThis<typeof QueryMethodsClass, FindHelpers>, name: string) {
    expect(this).type.toEqual<
      typegoose.mongoose.QueryWithHelpers<
        typegoose.DocumentType<QueryMethodsClass, FindHelpers> | null,
        typegoose.DocumentType<QueryMethodsClass, FindHelpers>,
        FindHelpers
      >
    >();

    return this.find({ name });
  }

  function findByLastname(this: typegoose.types.QueryHelperThis<typeof QueryMethodsClass, FindHelpers>, lastname: string) {
    expect(this).type.toEqual<
      typegoose.mongoose.QueryWithHelpers<
        typegoose.DocumentType<QueryMethodsClass, FindHelpers> | null,
        typegoose.DocumentType<QueryMethodsClass, FindHelpers>,
        FindHelpers
      >
    >();

    return this.find({ lastname });
  }

  @typegoose.queryMethod(findByName)
  @typegoose.queryMethod(findByLastname)
  class QueryMethodsClass {
    @prop({ required: true })
    public name: string;

    @prop({ required: true })
    public lastname: string;
  }

  const QueryMethodsModel = typegoose.getModelForClass<typeof QueryMethodsClass, FindHelpers>(QueryMethodsClass);

  const doc = await QueryMethodsModel.create({ name: 'hello', lastname: 'world' });

  expect(doc.name).type.toBeString();
  expect(doc.lastname).type.toBeString();

  const found = await QueryMethodsModel.find().findByName('hello').findByLastname('world').orFail().exec();

  expect(found[0].name).type.toBeString();
  expect(found[0].lastname).type.toBeString();

  expect(found).type.toEqual<typegoose.types.DocumentType<QueryMethodsClass, FindHelpers>[]>();

  const found2 = await QueryMethodsModel.find().findByName('hello');

  expect(found2).type.toEqual<typegoose.types.DocumentType<QueryMethodsClass, FindHelpers>[]>();
}

queryhelpers();
