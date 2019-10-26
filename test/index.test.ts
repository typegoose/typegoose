import { use } from 'chai';
import * as cap from 'chai-as-promised';
import 'source-map-support/register';

import { buildSchema, getModelForClass, prop, setGlobalOptions, setLogLevel } from '../src/typegoose';
import { connect, disconnect } from './utils/mongooseConnect';

setGlobalOptions({ // to have this initaly set
  globalOptions: {
    useNewEnum: true
  }
});

import { schemas } from '../src/internal/data';
import { getClassForSchema } from '../src/internal/utils';
import { suite as ArrayValidatorTests } from './tests/arrayValidator.test';
import { suite as BigUserTest } from './tests/biguser.test';
import { suite as customNameTests } from './tests/customName.test';
import { suite as IndexTests } from './tests/dbIndex.test';
import { suite as DefaultClassesTests } from './tests/dClasses.test';
import { suite as ErrorTests } from './tests/errors.test';
import { suite as GCFDTest } from './tests/getClassForDocument.test';
import { suite as GlobalTest } from './tests/globalOptions.test';
import { suite as HookTest } from './tests/hooks.test';
import { suite as Inheritance } from './tests/inheritance.test';
import { suite as OverwrittenModels } from './tests/overwrittenModel.test';
import { suite as RefTest } from './tests/ref.test';
import { suite as ShouldAddTest } from './tests/shouldAdd.test';
import { suite as ShouldRunTests } from './tests/shouldRun.test';
import { suite as StringValidatorTests } from './tests/stringValidator.test';
import { suite as TypeguardsTest } from './tests/typeguards.test';

/*
 * // use this style
 * import { suite as ShouldAddTest } from './shouldAdd.test'
 * ...
 * describe('Should add', ShouldAddTest.bind(this));
 * ...
 */

use(cap);

describe('Typegoose', () => {
  before(connect);
  after(disconnect);
  beforeEach(() => {
    setGlobalOptions({ // to always have this option & to overwrite what "setGlobalOptions" tests set
      globalOptions: {
        useNewEnum: true
      }
    });
  });

  describe('Global Options', GlobalTest.bind(this));

  describe('BigUser', BigUserTest.bind(this));

  describe('Hooks', HookTest.bind(this));

  describe('Type guards', TypeguardsTest.bind(this));

  describe('Should add', ShouldAddTest.bind(this));

  describe('Indexes', IndexTests.bind(this));

  describe('String Validators', StringValidatorTests.bind(this));

  describe('Array Validators', ArrayValidatorTests.bind(this));

  describe('getClassForDocument()', GCFDTest.bind(this));

  describe('Should Error', ErrorTests.bind(this));

  describe('Default Classes', DefaultClassesTests.bind(this));

  describe('Should just Run', ShouldRunTests.bind(this));

  describe('Ref tests', RefTest.bind(this));

  describe('inheritance', Inheritance.bind(this));

  describe('customName', customNameTests.bind(this));

  describe('Overwritten Model', OverwrittenModels.bind(this));

  // it.only('TEST', async () => {
  after(() => {
    setLogLevel('DEBUG');
    class Sub {
      @prop()
      public test: string;
    }

    class Parent {
      @prop()
      public testy: Sub;
    }

    const model = getModelForClass(Parent);
    const doc = new model({ testy: { test: 'hi' } });
    // console.log()
    console.log(buildSchema(Parent));
    console.log(schemas);
    console.log(getClassForSchema((doc.schema.path('testy') as any).schema));
  });
});
