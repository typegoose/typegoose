import { use } from 'chai';
import * as cap from 'chai-as-promised';

import { suite as BigUserTest } from './tests/biguser.test';
import { suite as customNameTests } from './tests/customName.test';
import { suite as IndexTests } from './tests/dbIndex.test';
import { suite as DefaultClassesTests } from './tests/dClasses.test';
import { suite as ErrorTests } from './tests/errors.test';
import { suite as GCFDTest } from './tests/getClassForDocument.test';
import { suite as HookTest } from './tests/hooks.test';
import { suite as Inheritance } from './tests/inheritance.test';
import { suite as OverwrittenModels } from './tests/overwrittenModel.test';
import { suite as RefTest } from './tests/ref.test';
import { suite as ShouldAddTest } from './tests/shouldAdd.test';
import { suite as ShouldRunTests } from './tests/shouldRun.test';
import { suite as StringValidatorTests } from './tests/stringValidator.test';
import { suite as TypeguardsTest } from './tests/typeguards.test';

import { connect, disconnect } from './utils/mongooseConnect';

use(cap);

describe('Typegoose', () => {
  before(connect);
  after(disconnect);

  describe('BigUser', BigUserTest.bind(this));

  describe('Hooks', HookTest.bind(this));

  describe('Type guards', TypeguardsTest.bind(this));

  describe('Should add', ShouldAddTest.bind(this));

  describe('Indexes', IndexTests.bind(this));

  describe('String Validators', StringValidatorTests.bind(this));

  describe('getClassForDocument()', GCFDTest.bind(this));

  describe('Should Error', ErrorTests.bind(this));

  describe('Default Classes', DefaultClassesTests.bind(this));

  describe('Should just Run', ShouldRunTests.bind(this));

  describe('Ref tests', RefTest.bind(this));

  describe('inheritance', Inheritance.bind(this));

  describe('customName', customNameTests.bind(this));

  describe('Overwritten Model', OverwrittenModels.bind(this));
});
