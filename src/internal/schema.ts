import * as mongoose from 'mongoose';

import { logger } from '../logSettings';
import { _buildPropMetadata } from '../prop';
import { AnyParamConstructor, DecoratedPropertyMetadataMap, EmptyVoidFn, IIndexArray, IModelOptions, ISchemaHook } from '../types';
import { DecoratorKeys } from './constants';
import { constructors, hooks, plugins, schemas, virtuals } from './data';
import { NoValidClass } from './errors';
import { assignGlobalModelOptions, getName, isNullOrUndefined, mergeSchemaOptions } from './utils';

/**
 * Private schema builder out of class props
 * -> If you discover this, dont use this function, use Typegoose.buildSchema!
 * @param cl The not initialized Class
 * @param sch Already Existing Schema?
 * @param opt Options to override
 * @returns Returns the Build Schema
 * @private
 */
export function _buildSchema<T, U extends AnyParamConstructor<T>>(cl: U, sch?: mongoose.Schema, opt?: mongoose.SchemaOptions) {
  if (typeof cl !== 'function') {
    throw new NoValidClass(cl);
  }

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
    sch.add(schemas.get(name));
  }

  sch.loadClass(cl);

  if (hooks.has(name)) {
    const hook = hooks.get(name);
    hook.pre.forEach(obj => {
      const schemaHooks = ((sch as any).s.hooks._pres.get(obj.method) ?? []) as ISchemaHook[];
      if (schemaHooks.find(({ fn }) => fn == obj.func)) {
        return;
      }
      sch.pre(obj.method, obj.func as EmptyVoidFn);
    });

    hook.post.forEach(obj => {
      const schemaHooks = ((sch as any).s.hooks._posts.get(obj.method) ?? []) as ISchemaHook[];
      if (schemaHooks.find(({ fn }) => fn == obj.func)) {
        return;
      }
      sch.post(obj.method, obj.func);
    });
  }

  if (plugins.has(name)) {
    for (const plugin of plugins.get(name)) {
      logger.debug('Applying Plugin:', plugin);
      sch.plugin(plugin.mongoosePlugin, plugin.options);
    }
  }

  /** Simplify the usage */
  if (virtuals.has(name)) {
    for (const [key, options] of virtuals.get(name)) {
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

  // this method is to get the typegoose name of the model/class if it is user-handled (like buildSchema, then manually mongoose.model)
  sch.method('typegooseName', () => {
    return name;
  });

  // add the class to the constructors map
  constructors.set(name, cl);

  return sch;
}
