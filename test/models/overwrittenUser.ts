import { modelOptions, prop, types } from '../../src/typegoose.js';

const options = {
  schemaOptions: {
    collection: 'OverwriteUser',
  },
} as types.IModelOptions;

@modelOptions(options)
export class NormalUser {
  @prop()
  public name?: string;
}

@modelOptions(options)
export class OverwrittenUser {
  @prop()
  public nickName?: string;
}
