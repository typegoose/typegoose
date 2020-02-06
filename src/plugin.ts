import { plugins } from './internal/data';
import { getName } from './internal/utils';
import { Func } from './types';

/**
 * Add a Middleware-Plugin
 * @param mongoosePlugin The Plugin to plug-in
 * @param options Options for the Plugin, if any
 */
export function plugin<T extends any[] | any>(mongoosePlugin: Func, options?: T) {
  // dont check if options is an object, because any plugin could make it anything
  return (target: any) => {
    const name: string = getName(target);

    /* istanbul ignore else */
    if (!plugins.has(name)) {
      plugins.set(name, []);
    }
    plugins.get(name).push({ mongoosePlugin, options });
  };
}
