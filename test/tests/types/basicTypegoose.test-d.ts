/* eslint-disable @typescript-eslint/no-unused-vars */
import { expect } from 'tstyche';
import * as typegoose from '../../../src/typegoose';
import { isDocument, isRefType, prop } from '../../../src/typegoose';
import { BeAnObject, DefaultIdVirtual, IObjectWithTypegooseFunction } from '../../../src/types';

// decorators return type
expect(typegoose.prop()).type.toBe<PropertyDecorator>();
expect(typegoose.index({})).type.toBe<ClassDecorator>();
expect(typegoose.modelOptions({})).type.toBe<ClassDecorator>();
expect(typegoose.plugin(() => void 0)).type.toBe<ClassDecorator>();
expect(typegoose.pre('save', () => void 0)).type.toBe<ClassDecorator>();
expect(typegoose.post('save', () => void 0)).type.toBe<ClassDecorator>();
expect(
  typegoose.queryMethod(function () {
    return this;
  })
).type.toBe<ClassDecorator>();

// non mongoose related function return types
expect(typegoose.setGlobalOptions({})).type.toBeVoid();
expect(typegoose.setLogLevel('DEBUG')).type.toBeVoid();

// mongoose related function return types
class TestClass {
  @prop()
  public dummy?: string;
}

const TestClassModel = typegoose.getModelForClass(TestClass);

expect(typegoose.getModelForClass(TestClass)).type.toBe<typegoose.ReturnModelType<typeof TestClass>>();
expect(typegoose.getDiscriminatorModelForClass(TestClassModel, TestClass)).type.toBe<typegoose.ReturnModelType<typeof TestClass>>();
expect(typegoose.buildSchema(TestClass)).type.toBe<typegoose.mongoose.Schema<typegoose.DocumentType<InstanceType<typeof TestClass>>>>();
expect(typegoose.addModelToTypegoose(TestClassModel, TestClass)).type.toBe<typegoose.ReturnModelType<typeof TestClass>>();

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

  expect(doc.objectid).type.toBe<typegoose.Ref<AutoObjectId, typegoose.mongoose.Types.ObjectId>>();
  expect(doc.string).type.toBe<typegoose.Ref<AutoString, string>>();
  expect(doc.number).type.toBe<typegoose.Ref<AutoNumber, number>>();
  expect(doc.buffer).type.toBe<typegoose.Ref<AutoBuffer, typegoose.mongoose.Types.Buffer>>();

  if (isDocument(doc.objectid)) {
    expect(doc.objectid).type.toBe<typegoose.DocumentType<AutoObjectId>>();
  } else {
    expect(doc.objectid).type.toBe<typegoose.mongoose.Types.ObjectId>();
  }

  if (isDocument(doc.string)) {
    expect(doc.string).type.toBe<typegoose.DocumentType<AutoString>>();
  } else {
    expect(doc.string).type.toBeString();
  }

  if (isDocument(doc.number)) {
    expect(doc.number).type.toBe<typegoose.DocumentType<AutoNumber>>();
  } else {
    expect(doc.number).type.toBeNumber();
  }

  if (isDocument(doc.buffer)) {
    expect(doc.buffer).type.toBe<typegoose.DocumentType<AutoBuffer>>();
  } else {
    expect(doc.buffer).type.toBe<typegoose.mongoose.Types.Buffer>();
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
      expect(someNewDoc).type.toBeAssignableTo<typegoose.DocumentType<TypeguardsClass>>();
    } else {
      // this type is currently wrong, typescript cannot remove the case because the input is not restricted enough
      expect<unknown>().type.toBeAssignableWith(someNewDoc);
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
        expect(someNewDoc.refObjectId).type.toBe<typegoose.DocumentType<TypeguardsClass>>();
      } else {
        expect(someNewDoc.refObjectId).type.toBe<typegoose.mongoose.Types.ObjectId | undefined>();
      }

      if (typegoose.isDocument(someNewDoc.refString)) {
        expect(someNewDoc.refString).type.toBeAssignableTo<typegoose.DocumentType<TypeguardsClass>>();
      } else {
        expect(someNewDoc.refString).type.toBe<string | undefined>();
      }
    }

    // isDocumentArray
    {
      if (typegoose.isDocumentArray(someNewDoc.refObjectIdArray)) {
        expect(someNewDoc.refObjectIdArray).type.toBe<typegoose.DocumentType<TypeguardsClass>[]>();
      } else {
        // currently has to be multiple "| undefined" because of https://github.com/typegoose/typegoose/issues/730
        expect(someNewDoc.refObjectIdArray).type.toBe<typegoose.Ref<TypeguardsClass, typegoose.mongoose.Types.ObjectId>[] | undefined>();
      }

      if (typegoose.isDocumentArray(someNewDoc.refStringArray)) {
        expect(someNewDoc.refStringArray).type.toBe<typegoose.DocumentType<TypeguardsClass>[]>();
      } else {
        expect(someNewDoc.refStringArray).type.toBe<typegoose.Ref<TypeguardsClass, string>[] | undefined>();
      }
    }

    // isRefType
    {
      if (typegoose.isRefType(someNewDoc.refObjectId, typegoose.mongoose.Types.ObjectId)) {
        expect(someNewDoc.refObjectId).type.toBe<typegoose.mongoose.Types.ObjectId>();
      } else {
        expect(someNewDoc.refObjectId).type.toBe<typegoose.DocumentType<TypeguardsClass> | undefined>();
      }

      if (typegoose.isRefType(someNewDoc.refString, String)) {
        expect(someNewDoc.refString).type.toBeString();
      } else {
        expect(someNewDoc.refString).type.toBe<typegoose.DocumentType<TypeguardsClass> | undefined>();
      }
    }

    // isRefTypeArray
    {
      if (typegoose.isRefTypeArray(someNewDoc.refObjectIdArray, typegoose.mongoose.Types.ObjectId)) {
        expect(someNewDoc.refObjectIdArray).type.toBe<typegoose.mongoose.Types.ObjectId[]>();
      } else {
        // currently has to be multiple "| undefined" because of https://github.com/typegoose/typegoose/issues/730
        expect(someNewDoc.refObjectIdArray).type.toBe<typegoose.Ref<TypeguardsClass, typegoose.mongoose.Types.ObjectId>[] | undefined>();
      }

      if (typegoose.isRefTypeArray(someNewDoc.refStringArray, String)) {
        expect(someNewDoc.refStringArray).type.toBe<string[]>();
      } else {
        expect(someNewDoc.refStringArray).type.toBe<typegoose.Ref<TypeguardsClass, string>[] | undefined>();
      }
    }
  }

  const someFoundDoc = await TypeguardsClassModel.findOne().exec();

  // top-level tests
  {
    if (typegoose.isDocument(someFoundDoc)) {
      expect(someFoundDoc).type.toBeAssignableTo<typegoose.DocumentType<TypeguardsClass>>();
    } else {
      // this type is currently wrong, typescript cannot remove the case because the input is not restricted enough
      expect(someFoundDoc).type.toBeAssignableTo<unknown>();
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
  expect<Parameters<typeof isDocument>[0]>().type.not.toBeAssignableWith({});
}

typeguards();

async function testDocumentType() {
  const someNewDoc = new TestClassModel();

  expect(someNewDoc).type.toBe<
    typegoose.mongoose.HydratedDocument<TestClass, IObjectWithTypegooseFunction & DefaultIdVirtual, BeAnObject, DefaultIdVirtual>
  >();

  const someCreatedDoc = await TestClassModel.create({});

  expect(someCreatedDoc).type.toBe<
    typegoose.mongoose.HydratedDocument<TestClass, IObjectWithTypegooseFunction & DefaultIdVirtual, BeAnObject, DefaultIdVirtual>
  >();

  const someFoundDoc = await TestClassModel.findOne();

  expect(someFoundDoc).type.toBe<typegoose.mongoose.HydratedDocument<
    TestClass,
    IObjectWithTypegooseFunction & DefaultIdVirtual,
    BeAnObject,
    DefaultIdVirtual
  > | null>();

  expect(someNewDoc._id).type.toBe<typegoose.mongoose.Types.ObjectId>();
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

  expect(doc).type.toBe<
    typegoose.mongoose.HydratedDocument<SomeClass, IObjectWithTypegooseFunction & DefaultIdVirtual, BeAnObject, DefaultIdVirtual>
  >();

  const toobj = doc.toObject();
  const tojson = doc.toJSON();

  expect(toobj).type.toBe<
    SomeClass & { _id: typegoose.mongoose.Types.ObjectId } & Required<{
        _id: typegoose.mongoose.Types.ObjectId;
      }> & { __v: number }
  >();
  expect(tojson).type.toBe<typegoose.mongoose.Default__v<SomeClass & { _id: typegoose.mongoose.Types.ObjectId }>>();
}

gh732();

function postHookErrorOption() {
  @typegoose.post<TestErrorOption>(
    'countDocuments',
    function (...args) {
      expect(args[0]).type.toBe<NativeError>();
      expect(args[1]).type.toBeAny();
      expect(args[2]).type.toBe<typegoose.mongoose.CallbackWithoutResultAndOptionalError>();
    },
    { errorHandler: true }
  )
  @typegoose.post<TestErrorOption>(
    'deleteOne',
    function (...args) {
      expect(args[0]).type.toBe<NativeError>();
      expect(args[1]).type.toBeAny();
      expect(args[2]).type.toBe<typegoose.mongoose.CallbackWithoutResultAndOptionalError>();
    },
    { errorHandler: true }
  )
  @typegoose.post(
    'aggregate',
    function (...args) {
      expect(args[0]).type.toBe<NativeError>();
      expect(args[1]).type.toBe<any[]>();
      expect(args[2]).type.toBe<typegoose.mongoose.CallbackWithoutResultAndOptionalError>();
    },
    { errorHandler: true }
  )
  @typegoose.post<typeof TestErrorOption>(
    'insertMany',
    function (...args) {
      expect(args[0]).type.toBe<NativeError>();
      expect(args[1]).type.toBeAny();
      expect(args[2]).type.toBe<typegoose.mongoose.CallbackWithoutResultAndOptionalError>();
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
      expect(this).type.toBe<typegoose.mongoose.HydratedDocument<typegoose.DocumentType<TestExplicitOption>>>();
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

  expect<Pick<Root, keyof Root>>().type.toBe<{
    ref?: typegoose.types.Ref<Nested, typegoose.mongoose.Types.ObjectId> | undefined;
    test: (v: string) => void;
    primitive?: string | undefined;
    primitiveArr?: string[] | undefined;
    nest?: Nested | undefined;
    nestArr?: Nested[] | undefined;
    refArr?: typegoose.types.Ref<Nested>[] | undefined;
    testy: string;
  }>();

  expect<typegoose.types.FilterOutFunctionKeys<Root>>().type.toBe<{
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
    expect(this).type.toBe<
      typegoose.mongoose.QueryWithHelpers<
        typegoose.DocumentType<QueryMethodsClass, FindHelpers> | null,
        typegoose.DocumentType<QueryMethodsClass, FindHelpers>,
        FindHelpers,
        QueryMethodsClass
      >
    >();

    return this.find({ name });
  }

  function findByLastname(this: typegoose.types.QueryHelperThis<typeof QueryMethodsClass, FindHelpers>, lastname: string) {
    expect(this).type.toBe<
      typegoose.mongoose.QueryWithHelpers<
        typegoose.DocumentType<QueryMethodsClass, FindHelpers> | null,
        typegoose.DocumentType<QueryMethodsClass, FindHelpers>,
        FindHelpers,
        QueryMethodsClass
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

  expect(found).type.toBe<typegoose.types.DocumentType<QueryMethodsClass, FindHelpers>[]>();

  const found2 = await QueryMethodsModel.find().findByName('hello');

  expect(found2).type.toBe<typegoose.types.DocumentType<QueryMethodsClass, FindHelpers>[]>();
}

queryhelpers();

function initHook814() {
  @typegoose.pre('init', (doc) => {
    expect(this).type.toBe<typegoose.DocumentType<any>>();
    expect(doc).type.toBe<unknown>();
  })
  @typegoose.post('init', (doc) => {
    expect(this).type.toBe<any>();
    expect(doc).type.toBe<typegoose.mongoose.HydratedDocument<typegoose.DocumentType<unknown>>>();
  })
  class BasicNoOptions {
    @typegoose.prop()
    public something?: string;
  }

  @typegoose.pre<typegoose.DocumentType<OverwriteFirstGeneric>>('init', function hook(doc) {
    expect(this).type.toBe<typegoose.DocumentType<OverwriteFirstGeneric>>();
    expect(doc).type.toBe<unknown>();
  })
  @typegoose.post<typegoose.DocumentType<OverwriteFirstGeneric>>('init', function hook(doc) {
    expect(this).type.toBe<typegoose.DocumentType<OverwriteFirstGeneric>>();
    expect(doc).type.toBe<typegoose.DocumentType<OverwriteFirstGeneric>>();
  })
  class OverwriteFirstGeneric {
    @typegoose.prop()
    public something?: string;
  }

  @typegoose.pre<typegoose.DocumentType<OverwriteBothGenerics>, OverwriteBothGenerics>('init', function hook(doc) {
    expect(this).type.toBe<typegoose.DocumentType<OverwriteBothGenerics>>();
    expect(doc).type.toBe<OverwriteBothGenerics>();
  })
  @typegoose.post<unknown, typegoose.DocumentType<OverwriteFirstGeneric>>('init', function hook(doc) {
    expect(this).type.toBe<typegoose.DocumentType<OverwriteFirstGeneric>>();
    expect(doc).type.toBe<typegoose.DocumentType<OverwriteFirstGeneric>>();
  })
  class OverwriteBothGenerics {
    @typegoose.prop()
    public something?: string;
  }
}

initHook814();

function modelOptionsGenerics() {
  @typegoose.modelOptions<typeof Test>({
    schemaOptions: {
      toObject: {
        transform(doc, ret, options) {
          expect(doc).type.toBe<typegoose.DocumentType<Test>>();
          expect(ret).type.toBeAssignableTo<Test>();
        },
      },
    },
  })
  class Test {
    @prop()
    public prop1?: string;

    @prop({ required: true })
    public test1!: number;
  }
}

modelOptionsGenerics();
