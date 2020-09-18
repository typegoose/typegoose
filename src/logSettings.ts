import * as logger from 'loglevel';
export { logger };

export const setLogLevel = logger.setLevel;
export const LogLevels = logger.levels;
logger.setDefaultLevel(LogLevels.WARN);
