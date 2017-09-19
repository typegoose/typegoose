import { prop } from '../../typegoose';

export class Job {
  @prop()
  title?: string;

  @prop()
  position?: string;

  @prop({ required: true, default: Date.now })
  startedAt?: Date;
}
