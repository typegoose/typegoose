import { prop } from '../../typegoose';

export class JobType {
  @prop({ required: true })
  field: string;

  @prop({ required: true })
  salery: number;
}

export class Job {
  @prop()
  title?: string;

  @prop()
  position?: string;

  @prop({ required: true, default: Date.now })
  startedAt?: Date;

  @prop()
  jobType?: JobType;
}
