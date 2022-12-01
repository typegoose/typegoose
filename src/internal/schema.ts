import * as mongoose from 'mongoose';
import { logger } from '../logSettings';
import { buildSchema } from '../typegoose';
import type {
  AnyParamConstructor,
  DecoratedPropertyMetadataMap,
  IBuildSchemaOptions,
  IHooksArray,
  IIndexArray,
  IModelOptions,
  IPluginsArray,
  NestedDiscriminatorsMap,
  QueryMethodMap,
  VirtualPopulateMap,
} from '../types';
import { DecoratorKeys } from './constants';
import { constructors } from './data';
import { NoDiscriminatorFunctionError, PathNotInSchemaError } from './errors';
import { processProp } from './processProp';
import {
  assertion,
  assertionIsClass,
  assignGlobalModelOptions,
  getCachedSchema,
  getName,
  isNullOrUndefined,
  mergeSchemaOptions,
} from './utils';

/**
 * Internal Schema Builder for Classes
 * This Function should not be used directly outside of typegoose internals, use "buildSchema" from typegoose.ts directly
 * @param cl The Class to build a Model from
 * @param origSch A Schema to clone and extend onto
 * @param opt Overwrite SchemaOptions (Merged with Decorator Options)
 * @param isFinalSchema Set if this Schema is the final (top-level) to build, only when "true" are discriminators, hooks, virtuals, etc applied
 * @param overwriteOptions Overwrite ModelOptions for Name Generation (Not Merged with Decorator)
 * @param extraOptions Extra options to affect what needs to be done
 * @returns Returns the Build Schema
 * @private
 */
export function _buildSchema<U extends AnyParamConstructor<any>>(
  cl: U,
  origSch?: mongoose.Schema<any>,
  opt?: mongoose.SchemaOptions,
  isFinalSchema: boolean = true,
  overwriteOptions?: IModelOptions,
  extraOptions?: IBuildSchemaOptions
) {
  assertionIsClass(cl);

  assignGlobalModelOptions(cl); // to ensure global options are applied to the current class

  // Options sanity check
  opt = mergeSchemaOptions(isNullOrUndefined(opt) || typeof opt !== 'object' ? {} : opt, cl);

  const finalName = getName(cl, overwriteOptions);

  logger.debug('_buildSchema Called for %s with options:', finalName, opt);

  /** Simplify the usage */
  const Schema = mongoose.Schema;
  const ropt: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, cl) ?? {};
  const schemaOptions = Object.assign({}, ropt?.schemaOptions ?? {}, opt);

  const decorators = Reflect.getMetadata(DecoratorKeys.PropCache, cl.prototype) as DecoratedPropertyMetadataMap;

  if (!isNullOrUndefined(decorators)) {
    for (const decorator of decorators.values()) {
      processProp({ ...decorator, cl: cl });
    }
  }

  let sch: mongoose.Schema;

  {
    const schemaReflectTarget = getCachedSchema(cl);

    if (!(origSch instanceof Schema)) {
      sch = new Schema(schemaReflectTarget, schemaOptions);
    } else {
      sch = origSch.clone();
      sch.add(schemaReflectTarget);
    }
  }

  sch.loadClass(cl);

  // in the block below are all the things that need to be done for each class, not just the final schema
  // for example when using "getOwnMetadata" over "getMetadata" (and having a clone in there)
  {
    /** Get Metadata for indices */
    const indices: IIndexArray[] = Reflect.getOwnMetadata(DecoratorKeys.Index, cl);
    const buildIndexes = typeof extraOptions?.buildIndexes === 'boolean' ? extraOptions?.buildIndexes : true;

    if (Array.isArray(indices) && buildIndexes) {
      for (const index of indices) {
        logger.debug('Applying Index:', index);
        sch.index(index.fields, index.options);
      }
    }
  }

  if (isFinalSchema) {
    /** Get Metadata for Nested Discriminators */
    const disMap: NestedDiscriminatorsMap = Reflect.getMetadata(DecoratorKeys.NestedDiscriminators, cl);

    if (disMap instanceof Map) {
      for (const [key, discriminators] of disMap) {
        logger.debug('Applying Nested Discriminators for:', key, discriminators);

        const path = sch.path(key) as mongoose.Schema.Types.DocumentArray | undefined;
        // TODO: add test for this error
        assertion(!isNullOrUndefined(path), () => new PathNotInSchemaError(finalName, key));
        // TODO: add test for this error
        assertion(typeof path.discriminator === 'function', () => new NoDiscriminatorFunctionError(finalName, key));

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
        // "as any" is used here because mongoose explicitly types out many methods, but the input type (from IHooksArray) is a combination of multiple types
        preHooks.forEach((obj) => callCorrectSignature(sch, 'pre', obj));
      }

      /** Get Metadata for PreHooks */
      const postHooks: IHooksArray[] = Reflect.getMetadata(DecoratorKeys.HooksPost, cl);

      if (Array.isArray(postHooks)) {
        // "as any" is used here because mongoose explicitly types out many methods, but the input type (from IHooksArray) is a combination of multiple types
        postHooks.forEach((obj) => callCorrectSignature(sch, 'post', obj));
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

    /** Get Metadata for Query Methods */
    const queryMethods: QueryMethodMap = Reflect.getMetadata(DecoratorKeys.QueryMethod, cl);

    if (queryMethods instanceof Map) {
      for (const [funcName, func] of queryMethods) {
        logger.debug('Applying Query Method:', funcName, func);
        sch.query[funcName] = func;
      }
    }

    /** Get Metadata for indices */
    const plugins: IPluginsArray[] = Reflect.getMetadata(DecoratorKeys.Plugins, cl);

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

/** Simple helper type for "fnToCall" in {@link callCorrectSignature} */
type GenericPrePostFn = (p1: any, p2: any, p3?: any) => any;

/**
 * Helper function to call the correct signature for a given "fnToCall" (pre / post hooks)
 * @param fnToCall The function to call (sch.pre / sch.post)
 * @param obj The object to call as arguments with
 */
function callCorrectSignature(sch: mongoose.Schema, fn: 'pre' | 'post', obj: IHooksArray): void {
  // we have to bind "sch", otherwise "this" will not be defined in the "pre / post" functions
  const fnToCall: GenericPrePostFn = (fn === 'pre' ? sch.pre : sch.post).bind(sch);

  if (!isNullOrUndefined(obj.options)) {
    return fnToCall(obj.methods, obj.options, obj.func);
  }

  return fnToCall(obj.methods, obj.func);
}
