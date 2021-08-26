import * as mongoose from 'mongoose';
import { logger } from '../logSettings';
import { buildSchema } from '../typegoose';
import type {
  AnyParamConstructor,
  DecoratedPropertyMetadataMap,
  IHooksArray,
  IIndexArray,
  IModelOptions,
  IPluginsArray,
  NestedDiscriminatorsMap,
  QueryMethodMap,
  VirtualPopulateMap,
} from '../types';
import { DecoratorKeys } from './constants';
import { constructors, schemas } from './data';
import { processProp } from './processProp';
import { assertion, assertionIsClass, assignGlobalModelOptions, getName, isNullOrUndefined, mergeSchemaOptions } from './utils';

/**
 * Private schema builder out of class props
 * -> If you discover this, don't use this function, use Typegoose.buildSchema!
 * @param cl The not initialized Class
 * @param sch Already Existing Schema?
 * @param opt Options to override
 * @param isFinalSchema If it's the final schema to be built (defaults to `true`).
 * @returns Returns the Build Schema
 * @private
 */
export function _buildSchema<U extends AnyParamConstructor<any>>(
  cl: U,
  sch?: mongoose.Schema<any>,
  opt?: mongoose.SchemaOptions,
  isFinalSchema: boolean = true,
  overwriteOptions?: IModelOptions
) {
  assertionIsClass(cl);

  assignGlobalModelOptions(cl); // to ensure global options are applied to the current class

  // Options sanity check
  opt = mergeSchemaOptions(isNullOrUndefined(opt) || typeof opt !== 'object' ? {} : opt, cl);

  /** used, because when trying to resolve an child, the overwriteOptions for that child are not available */
  const className = getName(cl);
  const finalName = getName(cl, overwriteOptions);

  logger.debug('_buildSchema Called for %s with options:', finalName, opt);

  /** Simplify the usage */
  const Schema = mongoose.Schema;
  const ropt: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, cl) ?? {};
  const schemaOptions = Object.assign({}, ropt?.schemaOptions ?? {}, opt);

  const decorators = Reflect.getMetadata(DecoratorKeys.PropCache, cl.prototype) as DecoratedPropertyMetadataMap;

  if (!isNullOrUndefined(decorators)) {
    for (const decorator of decorators.values()) {
      processProp(decorator);
    }
  }

  if (!schemas.has(className)) {
    schemas.set(className, {});
  }

  if (!(sch instanceof Schema)) {
    sch = new Schema(schemas.get(className), schemaOptions);
  } else {
    sch = sch.clone();
    sch.add(schemas.get(className)!);
  }

  sch.loadClass(cl);

  if (isFinalSchema) {
    /** Get Metadata for Nested Discriminators */
    const disMap: NestedDiscriminatorsMap = Reflect.getMetadata(DecoratorKeys.NestedDiscriminators, cl);

    if (disMap instanceof Map) {
      for (const [key, discriminators] of disMap) {
        logger.debug('Applying Nested Discriminators for:', key, discriminators);

        const path = sch.path(key) as mongoose.Schema.Types.DocumentArray;
        assertion(!isNullOrUndefined(path), new Error(`Path "${key}" does not exist on Schema of "${finalName}"`));
        assertion(
          typeof path.discriminator === 'function',
          new Error(`There is no function called "discriminator" on schema-path "${key}" on Schema of "${finalName}"`)
        );

        for (const { type: child, value: childName } of discriminators) {
          const childSch = getName(child) === finalName ? sch : buildSchema(child);

          const discriminatorKey = childSch.get('discriminatorKey');

          if (!!discriminatorKey && childSch.path(discriminatorKey)) {
            // skip this check, otherwise "extends DiscriminatorBase" would not be allowed (discriminators cannot have the discriminator key defined multiple times)
            (childSch.paths[discriminatorKey] as any).options.$skipDiscriminatorCheck = true;
          }

          path.discriminator(getName(child), childSch, childName);
        }
      }
    }

    // Hooks
    {
      /** Get Metadata for PreHooks */
      const preHooks: IHooksArray[] = Reflect.getMetadata(DecoratorKeys.HooksPre, cl);

      if (Array.isArray(preHooks)) {
        preHooks.forEach((obj) => sch!.pre(obj.method, obj.func));
      }

      /** Get Metadata for PreHooks */
      const postHooks: IHooksArray[] = Reflect.getMetadata(DecoratorKeys.HooksPost, cl);

      if (Array.isArray(postHooks)) {
        postHooks.forEach((obj) => sch!.post(obj.method, obj.func));
      }
    }

    /** Get Metadata for Virtual Populates */
    const virtuals: VirtualPopulateMap = Reflect.getMetadata(DecoratorKeys.VirtualPopulate, cl);

    if (virtuals instanceof Map) {
      for (const [key, options] of virtuals) {
        logger.debug('Applying Virtual Populates:', key, options);
        sch.virtual(key, options);
      }
    }

    /** Get Metadata for indices */
    const indices: IIndexArray<any>[] = Reflect.getMetadata(DecoratorKeys.Index, cl);

    if (Array.isArray(indices)) {
      for (const index of indices) {
        logger.debug('Applying Index:', index);
        sch.index(index.fields, index.options);
      }
    }

    /** Get Metadata for Query Methods */
    const queryMethods: QueryMethodMap = Reflect.getMetadata(DecoratorKeys.QueryMethod, cl);

    if (queryMethods instanceof Map) {
      for (const [funcName, func] of queryMethods) {
        logger.debug('Applying Query Method:', funcName, func);
        sch.query[funcName] = func;
      }
    }

    /** Get Metadata for indices */
    const plugins: IPluginsArray<any>[] = Reflect.getMetadata(DecoratorKeys.Plugins, cl);

    if (Array.isArray(plugins)) {
      for (const plugin of plugins) {
        logger.debug('Applying Plugin:', plugin);
        sch.plugin(plugin.mongoosePlugin, plugin.options);
      }
    }

    // this method is to get the typegoose name of the model/class if it is user-handled (like buildSchema, then manually mongoose.model)
    sch.method('typegooseName', () => {
      return finalName;
    });
  }

  // add the class to the constructors map
  constructors.set(finalName, cl);

  return sch;
}
