import { instanceMethod, prop } from '../../src/typegoose';

export class JobType {
  @prop({ required: true })
  public field: string;

  @prop({ required: true })
  public salery: number;
}

export class Job {
  @prop()
  public title?: string;

  @prop()
  public position?: string;

  @prop({ required: true, default: Date.now })
  public startedAt?: Date;

  @prop({ _id: false })
  public jobType?: JobType;

  @instanceMethod
  public titleInUppercase?() {
    return this.title.toUpperCase();
  }
}
