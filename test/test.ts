import { use } from 'chai';
import * as cap from 'chai-as-promised';

import { suite as ArrayValidatorTests } from './tests/arrayValidator.test';

import { connect, disconnect } from './utils/mongooseConnect';

use(cap);

describe('Typegoose', () => {
  before(connect);
  after(disconnect);

  describe('Array Validators', ArrayValidatorTests.bind(this));
});
