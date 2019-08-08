import { plugins } from './data';

/**
 * Add a Middleware-Plugin
 * @param mongoosePlugin The Plugin to plug-in
 * @param options Options for the Plugin, if any
 */
export function plugin(mongoosePlugin: any, options?: any) {
  return (constructor: any) => {
    const name: string = constructor.name;
    /* istanbul ignore else */
    if (!plugins.get(name)) {
      plugins.set(name, []);
    }
    plugins.get(name).push({ mongoosePlugin, options });
  };
}
