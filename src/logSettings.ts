import * as _logger from 'loglevel';

// this has to be re-defined as otherwise jest is not able to mock any function
// when "esModuleInterop: true" and "_logger" is not default imported
// and "_logger" cannot be default imported as that would make all projects using typegoose require to set "allowSyntheticDefaultImports"
export const logger = {
  warn: _logger.warn,
  error: _logger.error,
  info: _logger.info,
  debug: _logger.debug,
  setLogLevel: _logger.setLevel,
  LogLevels: _logger.levels,
  setDefaultLevel: _logger.setDefaultLevel,
  _logger: _logger,
};

export const setLogLevel = logger.setLogLevel;
export const LogLevels = logger.LogLevels;
logger.setDefaultLevel(logger.LogLevels.WARN);
