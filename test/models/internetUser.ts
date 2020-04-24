import { getModelForClass, mapProp, prop } from '../../src/typegoose';

export class SideNote {
  @prop()
  public content: string;

  @prop()
  public link?: string;
}

export enum ProjectValue {
  WORKING = 'working',
  UNDERDEVELOPMENT = 'underdevelopment',
  BROKEN = 'broken'
}

class InternetUser {
  @mapProp({ of: String, default: {} })
  public socialNetworks?: Record<string, string>;

  @mapProp({ of: SideNote, _id: false })
  public sideNotes?: Record<string, SideNote>;

  @mapProp({ of: String, enum: ProjectValue })
  public projects: Record<string, ProjectValue>;
}

export const InternetUserModel = getModelForClass(InternetUser);
