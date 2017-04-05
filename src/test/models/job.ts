import { Typegoose, prop } from '../../typegoose';

export class Job extends Typegoose {
  @prop()
  title?: string;

  @prop()
  position?: string;

  @prop({ required: true, default: Date.now })
  startedAt: Date;
}
