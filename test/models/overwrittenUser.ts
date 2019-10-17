import { modelOptions, prop } from '../../src/typegoose';

@modelOptions({ schemaOptions: { collection: 'Users' } })
export class OverwrittenUser {
  @prop()
  public nickName: string;
}
