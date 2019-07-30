import { use } from 'chai';
import * as cap from 'chai-as-promised';

import { suite as BigUserTest } from './tests/biguser.test';
import { suite as IndexTests } from './tests/db_index.test';
import { suite as GCFDTest } from './tests/getClassForDocument.test';
import { suite as HookTest } from './tests/hooks.test';
import { suite as ShouldAddTest } from './tests/shouldAdd.test';
import { suite as StringValidatorTests } from './tests/stringValidator.test';
import { suite as TypeguardsTest } from './tests/typeguards.test';

import { connect, disconnect } from './utils/mongooseConnect';

use(cap);

describe('Typegoose', () => {
  before(() => connect());
  after(() => disconnect());

  describe('BigUser', BigUserTest.bind(this));

  describe('Hooks', HookTest.bind(this));

  describe('Type guards', TypeguardsTest.bind(this));

  describe('Should add', ShouldAddTest.bind(this));

  describe('Indexes', IndexTests.bind(this));

  describe('String Validators', StringValidatorTests.bind(this));

  describe('getClassForDocument()', GCFDTest.bind(this));
});
