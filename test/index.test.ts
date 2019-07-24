import { use } from 'chai';
import * as cap from 'chai-as-promised';

import { suite as BigUserTest } from './tests/biguser.test';
import { suite as GCFDTest } from './tests/getClassForDocument.test';
import { suite as HookTest } from './tests/hooks.test';
import { suite as SelectTests } from './tests/select.test';
import { suite as ShouldAddTest } from './tests/shouldAdd.test';
import { suite as StringValidatorTests } from './tests/stringValidator.test';
import { connect, disconnect } from './utils/mongooseConnect';

use(cap);

describe('Typegoose', () => {
  before(() => connect());
  after(() => disconnect());

  describe('Hooks', HookTest.bind(this));

  describe('Should add', ShouldAddTest.bind(this));

  describe('Property Option {select}', SelectTests.bind(this));

  describe('String Validators', StringValidatorTests.bind(this));

  describe('BigUser', BigUserTest.bind(this));

  describe('getClassForDocument()', GCFDTest.bind(this));
});
