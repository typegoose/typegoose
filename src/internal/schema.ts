import * as mongoose from 'mongoose';

import { logger } from '../logSettings';
import { _buildPropMetadata } from '../prop';
import type {
  AnyParamConstructor,
  DecoratedPropertyMetadataMap,
  IHooksArray,
  IIndexArray,
  IModelOptions,
  IPluginsArray,
  QueryMethodMap,
  VirtualPopulateMap
} from '../types';
import { DecoratorKeys } from './constants';
import { constructors, schemas } from './data';
import { assertionIsClass, assignGlobalModelOptions, getName, isNullOrUndefined, mergeSchemaOptions } from './utils';

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
  sch?: mongoose.Schema,
  opt?: mongoose.SchemaOptions,
  isFinalSchema: boolean = true
) {
  assertionIsClass(cl);

  assignGlobalModelOptions(cl); // to ensure global options are applied to the current class

  // Options sanity check
  opt = mergeSchemaOptions(isNullOrUndefined(opt) || typeof opt !== 'object' ? {} : opt, cl);

  const name = getName(cl);

  logger.debug('_buildSchema Called for %s with options:', name, opt);

  /** Simplify the usage */
  const Schema = mongoose.Schema;
  const ropt: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, cl) ?? {};
  const schemaOptions = Object.assign(ropt?.schemaOptions ?? {}, opt);

  const decorators = Reflect.getMetadata(DecoratorKeys.PropCache, cl.prototype) as DecoratedPropertyMetadataMap;

  if (!isNullOrUndefined(decorators)) {
    for (const decorator of decorators.values()) {
      _buildPropMetadata(decorator);
    }
  }

  if (!schemas.has(name)) {
    schemas.set(name, {});
  }

  if (!(sch instanceof Schema)) {
    sch = new Schema(schemas.get(name), schemaOptions);
  } else {
    sch = sch.clone();
    sch.add(schemas.get(name)!);
  }

  sch.loadClass(cl);

  if (isFinalSchema) {
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
    /** Simplify the usage */
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
      return name;
    });
  }

  // add the class to the constructors map
  constructors.set(name, cl);

  return sch;
}
