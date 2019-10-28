import { isNullOrUndefined } from 'util';
import { DecoratorKeys } from './internal/constants';
import { childs, globalOptions } from './internal/data';
import { assignMetadata, getName } from './internal/utils';
import { logger } from './logSettings';
import { IModelOptions } from './types';

function assignToParrentClass(target: any) {
  const parent = Object.getPrototypeOf(target.prototype).constructor;
  const parentName = getName(parent);
  if (!childs.has(parentName)) {
    childs.set(parentName, []);
  }
  const childClasses = childs.get(parentName);
  if (childClasses.indexOf(target) === -1) {
    childClasses.push(target);
  }
  if (parent !== Object) {
    assignToParrentClass(parent);
  }
}

/**
 * Define Options for the Class
 * @param options Options
 * @example Example:
 * ```
 *  @modelOptions({ schemaOptions: { timestamps: true } })
 *  class Name {}
 *
 *  // Note: The default Class "TimeStamps" can be used for type infomation and options already set
 * ```
 */
export function modelOptions(options: IModelOptions) {
  return (target: any) => {
    if (isNullOrUndefined(Reflect.getMetadata(DecoratorKeys.ModelOptions, target))) {
      logger.info('Assigning global Schema Options to "%s"', getName(target));
      for (const key of Object.keys(globalOptions)) {
        options[key] = Object.assign({}, globalOptions[key], options[key]);
      }
    }
    assignToParrentClass(target);
    assignMetadata(DecoratorKeys.ModelOptions, options, target);
  };
}
