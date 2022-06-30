import { expectType, expectAssignable } from 'tsd-lite';
import * as typegoose from '../../../src/typegoose';
import { BeAnObject, IObjectWithTypegooseFunction } from '../../../src/types';

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

// non mongosoe related function return types
expectType<void>(typegoose.setGlobalOptions({}));
expectType<void>(typegoose.setLogLevel('DEBUG'));

// mongoose related function return types
class TestClass {}

const TestClassModel = typegoose.getModelForClass(TestClass);

expectType<typegoose.ReturnModelType<typeof TestClass>>(typegoose.getModelForClass(TestClass));
expectType<typegoose.ReturnModelType<typeof TestClass>>(typegoose.getDiscriminatorModelForClass(TestClassModel, TestClass));
expectType<typegoose.mongoose.Schema<typegoose.DocumentType<InstanceType<typeof TestClass>>>>(typegoose.buildSchema(TestClass));
expectType<typegoose.ReturnModelType<typeof TestClass>>(typegoose.addModelToTypegoose(TestClassModel, TestClass));

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
      expectType<never>(someNewDoc);
    }

    if (typegoose.isRefType(someNewDoc, typegoose.mongoose.Types.ObjectId)) {
      // this should never happen at runtime, but i dont know the proper types to set for "isRefType", and so invalid types are here
    } else {
      // same here
    }
  }

  // nested tests
  {
    // isDocument
    {
      if (typegoose.isDocument(someNewDoc.refObjectId)) {
        expectAssignable<typegoose.DocumentType<TypeguardsClass>>(someNewDoc.refObjectId);
      } else {
        expectType<typegoose.Ref<TypeguardsClass, typegoose.mongoose.Types.ObjectId> | undefined>(someNewDoc.refObjectId);
      }

      if (typegoose.isDocument(someNewDoc.refString)) {
        expectAssignable<typegoose.DocumentType<TypeguardsClass>>(someNewDoc.refString);
      } else {
        expectType<typegoose.Ref<TypeguardsClass, string> | undefined>(someNewDoc.refString);
      }
    }

    // isDocumentArray
    {
      if (typegoose.isDocumentArray(someNewDoc.refObjectIdArray)) {
        expectAssignable<typegoose.DocumentType<TypeguardsClass>[]>(someNewDoc.refObjectIdArray);
      } else {
        // currently has to be multiple "| undefined" because of https://github.com/typegoose/typegoose/issues/730
        expectType<(typegoose.Ref<TypeguardsClass, typegoose.mongoose.Types.ObjectId> | undefined)[] | undefined>(
          someNewDoc.refObjectIdArray
        );
      }

      if (typegoose.isDocumentArray(someNewDoc.refStringArray)) {
        expectAssignable<typegoose.DocumentType<TypeguardsClass>[]>(someNewDoc.refStringArray);
      } else {
        expectType<typegoose.Ref<TypeguardsClass, string>[] | undefined>(someNewDoc.refStringArray);
      }
    }

    // isRefType
    {
      if (typegoose.isRefType(someNewDoc.refObjectId, typegoose.mongoose.Types.ObjectId)) {
        expectType<typegoose.mongoose.Types.ObjectId>(someNewDoc.refObjectId);
      } else {
        expectType<TypeguardsClass | undefined>(someNewDoc.refObjectId);
      }

      if (typegoose.isRefType(someNewDoc.refString, String)) {
        expectType<string>(someNewDoc.refString);
      } else {
        expectType<TypeguardsClass | undefined>(someNewDoc.refString);
      }
    }

    // isRefTypeArray
    {
      if (typegoose.isRefTypeArray(someNewDoc.refObjectIdArray, typegoose.mongoose.Types.ObjectId)) {
        expectType<typegoose.mongoose.Types.ObjectId[]>(someNewDoc.refObjectIdArray);
      } else {
        // currently has to be multiple "| undefined" because of https://github.com/typegoose/typegoose/issues/730
        expectType<typegoose.Ref<TypeguardsClass, typegoose.mongoose.Types.ObjectId | undefined>[] | undefined>(
          someNewDoc.refObjectIdArray
        );
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
      expectType<null>(someFoundDoc);
    }

    if (typegoose.isRefType(someFoundDoc, typegoose.mongoose.Types.ObjectId)) {
      // this should never happen at runtime, but i dont know the proper types to set for "isRefType", and so invalid types are here
    } else {
      // same here
    }
  }
}

typeguards();

async function testDocumentType() {
  const someNewDoc = new TestClassModel();

  expectType<typegoose.mongoose.Document<any, BeAnObject, any> & TestClass & IObjectWithTypegooseFunction & { _id: any }>(someNewDoc);

  const someCreatedDoc = await TestClassModel.create();

  expectType<(typegoose.mongoose.Document<any, BeAnObject, any> & TestClass & IObjectWithTypegooseFunction & { _id: any })[]>(
    someCreatedDoc
  );

  const someFoundDoc = await TestClassModel.findOne();

  expectType<(typegoose.mongoose.Document<any, BeAnObject, any> & TestClass & IObjectWithTypegooseFunction & { _id: any }) | null>(
    someFoundDoc
  );
}

testDocumentType();
