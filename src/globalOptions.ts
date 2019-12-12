import { globalOptions } from './internal/data';
import { logger } from './logSettings';
import { IGlobalOptions, Severity } from './types';

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

  logger.info('new Global Options:', options);
}

/**
 * Parse Typegoose Environment Variables and apply them
 */
export function parseENV(): void {
  logger.info('"parseENV" got called');

  if (process.env.TG_USE_NEW_ENUM?.length > 0) {
    logger.warn('TG_USE_NEW_ENUM & useNewEnum got deprecated, see changelog 6.2 for more');
  }

  const options: IGlobalOptions = {
    globalOptions: {
      // useNewEnum: process.env.TG_USE_NEW_ENUM?.length > 0
    },
    options: {
      allowMixed: process.env.TG_ALLOW_MIXED in Severity ? mapValueToSeverity(process.env.TG_ALLOW_MIXED) : globalOptions.options.allowMixed
    }
  };

  setGlobalOptions(options);
}

/**
 * Maps strings to the number
 * -> This function is specificly build for "Severity"-Enum
 * @throws {Error} if not in range of the "Severity"-Enum
 * @example
 * ```ts
 * mapValueToSeverity("WARN") === 1
 * mapValueToSeverity("1") === 1
 * // now internal use
 * mapValueToSeverity(1) === 1
 * ```
 * @param value The value to check for
 */
function mapValueToSeverity(value: string | number): Severity {
  if (!(value in Severity)) {
    throw new Error(`"value" is not in range of "Severity"! (got: ${value})`);
  }
  if (typeof value === 'number') {
    return value;
  }

  return mapValueToSeverity(Severity[value]);
}
