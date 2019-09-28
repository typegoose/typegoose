import * as mongoose from 'mongoose';

import { isNullOrUndefined } from 'util';
import { AnyParamConstructor, EmptyVoidFn, IModelOptions } from '../types';
import { DecoratorKeys } from './constants';
import { decoratorCache, hooks, plugins, schemas, virtuals } from './data';
import { NoValidClass } from './errors';
import { getName, mergeSchemaOptions } from './utils';

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
  }

  sch.loadClass(cl);

  const hook = hooks.get(name);
  if (hook) {
    hook.pre.forEach((obj) => {
      sch.pre(obj.method as string, obj.func as EmptyVoidFn);
      // ^ look at https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37333
    });

    hook.post.forEach((obj) => sch.post(obj.method, obj.func));
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

  return sch;
}
