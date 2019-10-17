import { modelOptions, prop } from '../../src/typegoose';
import { IModelOptions } from '../../src/types';

const options = {
  schemaOptions: {
    collection: 'OverwriteUser'
  }
} as IModelOptions;

@modelOptions(options)
export class NormalUser {
  @prop()
  public name: string;
}

@modelOptions(options)
export class OverwrittenUser {
  @prop()
  public nickName: string;
}
