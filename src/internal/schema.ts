import * as mongoose from 'mongoose';

import { logger } from '../logSettings';
import { _buildPropMetadata } from '../prop';
import { AnyParamConstructor, DecoratedPropertyMetadataMap, EmptyVoidFn, IIndexArray, IModelOptions } from '../types';
import { DecoratorKeys } from './constants';
import { hooks, plugins, schemas, virtuals } from './data';
import { NoValidClass } from './errors';
import { getName, isNullOrUndefined, mergeSchemaOptions } from './utils';

/**
 * Private schema builder out of class props
 * -> If you discover this, dont use this function, use Typegoose.buildSchema!
 * @param cl The not initialized Class
 * @param sch Already Existing Schema?
 * @param opt Options to override
 * @returns Returns the Build Schema
 * @private
 */
export function _buildSchema<T, U extends AnyParamConstructor<T>>(
  cl: U,
  sch?: mongoose.Schema,
  opt?: mongoose.SchemaOptions
) {
  if (typeof cl !== 'function') {
    throw new NoValidClass(cl);
  }

  // Options sanity check
  opt = mergeSchemaOptions(isNullOrUndefined(opt) || typeof opt !== 'object' ? {} : opt, cl);

  const name = getName(cl);

  logger.debug('_buildSchema Called for %s with options:', name, opt);

  /** Simplify the usage */
  const Schema = mongoose.Schema;
  const { schemaOptions: ropt }: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, cl) || {};
  const schemaOptions = Object.assign(ropt || {}, opt);

  const decorators = Reflect.getMetadata(DecoratorKeys.PropCache, cl.prototype) as DecoratedPropertyMetadataMap;

  if (!isNullOrUndefined(decorators)) {
    for (const decorator of decorators.values()) {
      _buildPropMetadata(decorator);
    }
  }

  if (!schemas.get(name)) {
    schemas.set(name, {});
  }

  if (!(sch instanceof Schema)) {
    sch = new Schema(schemas.get(name), schemaOptions);
  } else {
    sch = sch.clone();
    sch.add(schemas.get(name));
  }

  sch.loadClass(cl);

  const hook = hooks.get(name);
  if (!isNullOrUndefined(hook)) {
    hook.pre.forEach((obj) => {
      sch.pre(obj.method, obj.func as EmptyVoidFn);
    });

    hook.post.forEach((obj) => sch.post(obj.method, obj.func));
  }

  if (plugins.get(name)) {
    for (const plugin of plugins.get(name)) {
      logger.debug('Applying Plugin:', plugin);
      sch.plugin(plugin.mongoosePlugin, plugin.options);
    }
  }

  /** Simplify the usage */
  const virtualPopulates = virtuals.get(name);
  if (!isNullOrUndefined(virtualPopulates)) {
    for (const [key, options] of virtualPopulates) {
      logger.debug('Applying Virtual Populates:', key, options);
      sch.virtual(key, options);
    }
  }

  /** Get Metadata for indices */
  const indices: IIndexArray<any>[] = Reflect.getMetadata(DecoratorKeys.Index, cl) || [];
  if (!isNullOrUndefined(indices) && Array.isArray(indices)) {
    for (const index of indices) {
      logger.debug('Applying Index:', index);
      sch.index(index.fields, index.options);
    }
  }

  return sch;
}
