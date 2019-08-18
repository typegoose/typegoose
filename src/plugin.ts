import { plugins } from './data';
import { Func } from './types';

/**
 * Add a Middleware-Plugin
 * @param mongoosePlugin The Plugin to plug-in
 * @param options Options for the Plugin, if any
 */
export function plugin(mongoosePlugin: Func, options?: any) {
  return (constructor: any) => {
    const name: string = constructor.name;
    /* istanbul ignore else */
    if (!plugins.get(name)) {
      plugins.set(name, []);
    }
    plugins.get(name).push({ mongoosePlugin, options });
  };
}
