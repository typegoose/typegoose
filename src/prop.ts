import { DecoratorKeys, PropType } from './internal/constants';
import * as utils from './internal/utils';
import { logger } from './logSettings';
import type {
  ArrayPropOptions,
  BasePropOptions,
  DecoratedPropertyMetadata,
  DecoratedPropertyMetadataMap,
  MapPropOptions,
  PropOptionsForNumber,
  PropOptionsForString,
  VirtualOptions,
} from './types';

/**
 * Set Property Options for the property below
 * @param options Options
 * @param kind Overwrite auto-inferred kind
 * @example
 * ```ts
 * class ClassName {
 *   @prop()
 *   public someProp?: string;
 *
 *   @prop({ type: () => [String] })
 *   public someArrayProp?: string[];
 *
 *   @prop({ type: () => String })
 *   public someMapProp?: Map<string, string>;
 * }
 * ```
 */
function prop(
  options?: BasePropOptions | ArrayPropOptions | MapPropOptions | PropOptionsForNumber | PropOptionsForString | VirtualOptions,
  kind?: PropType
): PropertyDecorator {
  return (target: any, key: string | symbol) => {
    options = options ?? {};

    const existingMapForTarget = Reflect.getOwnMetadata(DecoratorKeys.PropCache, target) as DecoratedPropertyMetadataMap;

    if (utils.isNullOrUndefined(existingMapForTarget)) {
      Reflect.defineMetadata(DecoratorKeys.PropCache, new Map<string, DecoratedPropertyMetadata>(), target);
    }

    const mapForTarget = existingMapForTarget ?? (Reflect.getOwnMetadata(DecoratorKeys.PropCache, target) as DecoratedPropertyMetadataMap);

    mapForTarget.set(key, { options, target, key, whatis: kind });

    logger.debug('Added "%s.%s" to the Decorator Cache', utils.getName(target.constructor), key);
  };
}

export { prop };

// Export it PascalCased
export { prop as Prop };
