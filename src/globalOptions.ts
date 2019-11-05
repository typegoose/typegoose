import * as assert from 'assert';

import { globalOptions } from './internal/data';
import { logger } from './logSettings';
import { IGlobalOptions } from './types';

/**
 * Set Typegoose's global Options
 */
export function setGlobalOptions(options: IGlobalOptions) {
  assert(typeof options === 'object', new TypeError('"options" argument needs to be an object!'));

  logger.info('"setGlobalOptions" got called with', options);

  for (const key of Object.keys(options)) {
    globalOptions[key] = Object.assign({}, globalOptions[key], options[key]);
  }
}
