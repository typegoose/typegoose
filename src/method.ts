/* istanbul ignore file */
import { deprecate } from 'util';

/**
 * Set the function below as a Static Method
 * Note: you need to add static before the name
 * @deprecated
 */
export const staticMethod = deprecate(
  (_1, _2) => undefined,
  '"" is deprecated, look at README#Migrate to 6.0.0'
);

/**
 * Set the function below as an Instance Method
 * @deprecated
 */
export const instanceMethod = deprecate(
  (_1, _2) => undefined,
  '"" is deprecated, look at README#Migrate to 6.0.0'
);
