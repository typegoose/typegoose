import { GridFSBucket } from 'mongodb';
import * as mongoose from 'mongoose';
import { buildSchemas, hooks, plugins, schemas, virtuals } from './data';
import { IModelOptions } from './typegoose';
import { EmptyVoidFn, NoParamConstructor } from './types';

/**
 * Private schema builder out of class props
 * -> If you discover this, dont use this function, use Typegoose.buildSchema!
 * @param cl The not initialized Class
 * @param name The Name to save the Schema Under (Mostly Constructor.name)
 * @param sch Already Existing Schema?
 * @returns Returns the Build Schema
 * @private
 */
export function _buildSchema<T, U extends NoParamConstructor<T>>(
  cl: U,
  sch?: mongoose.Schema,
  opt: mongoose.SchemaOptions = {}
): mongoose.Schema {
  const name = cl.name;
  if (buildSchemas.get(name)) {
    return buildSchemas.get(name);
  }

  /** Simplify the usage */
  const Schema = mongoose.Schema;
  const {
    existingConnection,
    schemaOptions: ropt,
    gridFS: gridFSOptions
  }: IModelOptions = Reflect.getMetadata('typegoose:options', cl) || {};
  const schemaOptions = Object.assign(ropt || {}, opt);

  if (!schemas.get(name)) {
    schemas.set(name, {});
  }

  if (cl.name === 'GridFS') {
    gridFSOptions.bucketName = gridFSOptions.bucketName ? gridFSOptions.bucketName : cl.name;
    schemaOptions.collection = `${gridFSOptions.bucketName}.files`;
  }

  if (!sch) {
    sch = new Schema(schemas.get(name), schemaOptions);
  } else {
    sch.add(schemas.get(name));
  }

  sch.loadClass(cl);

  if (cl.name === 'GridFS') {
    console.log('GridFS');
    const connection = existingConnection ? existingConnection : mongoose.connection;
    sch.statics.bucket = new GridFSBucket(connection.db, gridFSOptions);

    return sch;
  }

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
  const indices = Reflect.getMetadata('typegoose:indices', cl) || [];
  for (const index of indices) {
    sch.index(index.fields, index.options);
  }

  return sch;
}
