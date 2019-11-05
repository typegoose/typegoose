import { plugins } from './internal/data';
import { getName } from './internal/utils';
import { Func } from './types';

/**
 * Add a Middleware-Plugin
 * @param mongoosePlugin The Plugin to plug-in
 * @param options Options for the Plugin, if any
 */
export function plugin(mongoosePlugin: Func, options?: any) {
  return (target: any) => {
    const name: string = getName(target);

    options = typeof options !== 'object' ? {} : options; // ensure it is an object, even if empty

    /* istanbul ignore else */
    if (!plugins.has(name)) {
      plugins.set(name, []);
    }
    plugins.get(name).push({ mongoosePlugin, options });
  };
}
