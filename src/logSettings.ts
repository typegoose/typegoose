import * as _logger from 'loglevel';

// this has to be re-defined as otherwise jest is not able to mock any function
// when "esModuleInterop: true" and "_logger" is not default imported
// and "_logger" cannot be default imported as that would make all projects using typegoose require to set "allowSyntheticDefaultImports"
export const logger = {
  // "loglevel" here referred as "_logger" is self-modifying, so a getter function is necessary to actually get logs
  // otherwise we only get the default "noop" function forever
  warn: (...args) => _logger.warn.apply(undefined, args),
  error: (...args) => _logger.error.apply(undefined, args),
  info: (...args) => _logger.info.apply(undefined, args),
  debug: (...args) => _logger.debug.apply(undefined, args),
  setLogLevel: _logger.setLevel,
  LogLevels: _logger.levels,
  setDefaultLevel: _logger.setDefaultLevel,
  _logger: _logger,
};

export const setLogLevel = logger.setLogLevel;
export const LogLevels = logger.LogLevels;
logger.setDefaultLevel(logger.LogLevels.WARN);
