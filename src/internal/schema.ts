import * as mongoose from 'mongoose';

import { isNullOrUndefined } from 'util';
import { AnyParamConstructor, EmptyVoidFn, IModelOptions } from '../types';
import { DecoratorKeys } from './constants';
import { buildSchemas, decoratorCache, hooks, plugins, schemas, virtuals } from './data';
import { NoValidClass } from './errors';
import { getName } from './utils';

/**
 * Apply Options to an existing Schema
 * @param sch
 * @param opt
 */
function applyOptions(sch: mongoose.Schema, opt: mongoose.SchemaOptions) {
  for (const [key, value] of Object.entries(opt)) {
    sch.set(key as keyof mongoose.SchemaOptions, value);
  }
}

/**
 * Private schema builder out of class props
 * -> If you discover this, dont use this function, use Typegoose.buildSchema!
 * @param cl The not initialized Class
 * @param name The Name to save the Schema Under (Mostly Constructor.name)
 * @param sch Already Existing Schema?
 * @returns Returns the Build Schema
 * @private
 */
export function _buildSchema<T, U extends AnyParamConstructor<T>>(
  cl: U,
  sch?: mongoose.Schema,
  opt: mongoose.SchemaOptions = {}
) {
  if (typeof cl !== 'function') {
    throw new NoValidClass(cl);
  }

  // Option sanity check
  opt = isNullOrUndefined(opt) || typeof opt !== 'object' ? {} : opt;

  const name = getName(cl);
  if (buildSchemas.get(name)) {
    // this below are leftovers of trying to get "_id: false" to work
    // if (Object.keys(opt).length > 0) {
    //   const fsch = buildSchemas.get(name).clone();
    //   applyOptions(fsch, opt);

    //   return fsch;
    // }

    return buildSchemas.get(name);
  }

  /** Simplify the usage */
  const Schema = mongoose.Schema;
  const { schemaOptions: ropt }: IModelOptions = Reflect.getMetadata(DecoratorKeys.ModelOptions, cl) || {};
  const schemaOptions = Object.assign(ropt || {}, opt);

  const { '1': { decorators } } = [...decoratorCache.entries()].find((v) => v[1].class === cl) ||
    { 1: { decorators: null } };

  if (!isNullOrUndefined(decorators)) {
    for (const decorator of decorators.values()) {
      decorator();
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
    applyOptions(sch, opt);
  }

  sch.loadClass(cl);

  const hook = hooks.get(name);
  if (hook) {
    hook.pre.forEach((func, method) => {
      sch.pre(method as string, func as EmptyVoidFn);
      // ^ look at https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37333
    });

    hook.post.forEach((v, k) => sch.post(k, v));
  }

  if (plugins.get(name)) {
    for (const plugin of plugins.get(name)) {
      sch.plugin(plugin.mongoosePlugin, plugin.options);
    }
  }

  /** Simplify the usage */
  const getterSetters = virtuals.get(name);
  if (getterSetters) {
    for (const [key, virtual] of getterSetters) {
      sch.virtual(key, virtual);
    }
  }

  /** Get Metadata for indices */
  const indices: any[] = Reflect.getMetadata(DecoratorKeys.Index, cl) || [];
  for (const index of indices) {
    sch.index(index.fields, index.options);
  }

  buildSchemas.set(name, sch);

  return sch;
}
