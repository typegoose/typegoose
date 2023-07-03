import { DecoratorKeys } from './internal/constants';
import { logger } from './logSettings';
import type { Func, IPluginsArray } from './types';
import { wrapClassDecorator } from './wrapDecorator';

/**
 * Add a mongoose Middleware-Plugin
 * @param mongoosePlugin The Plugin to plug-in
 * @param options Options for the Plugin, if any
 * @example Example:
 * ```ts
 * @plugin(pluginFunctionHere, { optionsHere: true })
 * class ClassName {}
 * ```
 */
export function plugin<TFunc extends Func, TParams = Parameters<TFunc>[1]>(
  mongoosePlugin: TFunc,
  options?: TParams
): /* ReturnType<typeof wrapClassDecorator> */ any {
  // don't check if options is an object, because any plugin could make it anything
  return wrapClassDecorator(({ metadata, className }) => {
    logger.info('Adding plugin "%s" to "%s" with options: "%o"', mongoosePlugin?.name || '<anonymous>', className, options);
    const plugins: IPluginsArray[] = Array.from((metadata.getMetadata(DecoratorKeys.Plugins) as IPluginsArray[] | undefined) ?? []);
    plugins.push({ mongoosePlugin, options });
    metadata.defineMetadata(DecoratorKeys.Plugins, plugins);
  });
}

// Export it PascalCased
export { plugin as Plugins };
