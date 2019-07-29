import { plugins } from './data';

/**
 * Add a Middleware-Plugin
 * @param mongoosePlugin The Plugin to plug-in
 * @param options Options for the Plugin, if any
 */
export function plugin(mongoosePlugin: any, options?: any) {
  return (constructor: any) => {
    const name: string = constructor.name;
    if (!plugins[name]) {
      plugins[name] = [];
    }
    plugins[name].push({ mongoosePlugin, options });
  };
}
