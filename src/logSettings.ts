import * as log from 'loglevel';
export { log as logger };

export const setLogLevel = log.setLevel;
export const LogLevels = log.levels;
log.setDefaultLevel(LogLevels.WARN);
