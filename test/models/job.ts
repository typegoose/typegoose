import { modelOptions, prop } from '../../src/typegoose';

@modelOptions({ schemaOptions: { _id: false } })
export class JobType {
  @prop({ required: true })
  public field!: string;

  @prop({ required: true })
  public salery!: number;
}

@modelOptions({ schemaOptions: { _id: false } })
export class Job {
  @prop()
  public title?: string;

  @prop()
  public position?: string;

  @prop({ required: true, default: Date.now })
  public startedAt?: Date;

  @prop({ _id: false })
  public jobType?: JobType;

  public titleInUppercase() {
    return this.title?.toUpperCase();
  }

  constructor(opts?: Partial<Job>) {
    if (opts) {
      Object.assign(this, opts);
    }
  }
}
