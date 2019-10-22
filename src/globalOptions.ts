import { globalOptions, IGlobalOptions } from './internal/data';
import { logger } from './logSettings';

/**
 * Set Typegoose's global Options
 */
export function setGlobalOptions(options: IGlobalOptions) {
  if (typeof options !== 'object') {
    throw new TypeError('"options" argument needs to be an object!');
  }

  logger.info('"setGlobalOptions" got called with', options);

  for (const key of Object.keys(options)) {
    globalOptions[key] = Object.assign({}, globalOptions[key], options[key]);
  }
}
