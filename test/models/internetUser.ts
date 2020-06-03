import { getModelForClass, prop } from '../../src/typegoose';

export class SideNote {
  @prop()
  public content?: string;

  @prop()
  public link?: string;
}

export enum ProjectValue {
  WORKING = 'working',
  UNDERDEVELOPMENT = 'underdevelopment',
  BROKEN = 'broken'
}

export class InternetUser {
  @prop({ type: String, default: {} })
  public socialNetworks?: Map<string, string>;

  @prop({ type: SideNote, _id: false })
  public sideNotes?: Map<string, SideNote>;

  @prop({ type: String, enum: ProjectValue })
  public projects?: Map<string, ProjectValue>;
}

export const InternetUserModel = getModelForClass(InternetUser);
