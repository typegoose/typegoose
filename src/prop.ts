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
import { wrapPropertyDecorator } from './wrapDecorator';

/**
 * Set Property Options for the property below
 * @param options The Options to Set
 * @param kind Overwrite auto-inferred PropType
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
): /* ReturnType<typeof wrapPropertyDecorator> */ any {
  return wrapPropertyDecorator(({ metadata, name: key, className }) => {
    options = options ?? {};

    const existingMapForTarget = metadata.getOwnMetadata(DecoratorKeys.PropCache) as DecoratedPropertyMetadataMap;

    if (utils.isNullOrUndefined(existingMapForTarget)) {
      metadata.defineMetadata(DecoratorKeys.PropCache, new Map<string, DecoratedPropertyMetadata>());
    }

    const mapForTarget = existingMapForTarget ?? (metadata.getOwnMetadata(DecoratorKeys.PropCache) as DecoratedPropertyMetadataMap);

    mapForTarget.set(key, { options, target: class {}, key, propType: kind });

    logger.debug('Added "%s.%s" to the Decorator Cache', className, key);
  });
}

export { prop };

// Export it PascalCased
export { prop as Prop };
