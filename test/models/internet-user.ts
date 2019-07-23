import { mapProp, prop, Typegoose } from '../../src/typegoose';

export class SideNote {
  @prop()
  public content: string;

  @prop()
  public link?: string;
}

enum ProjectValue {
  WORKING = 'working',
  UNDERDEVELOPMENT = 'underdevelopment',
  BROKEN = 'broken',
}

class InternetUser extends Typegoose {
  @mapProp({ of: String, mapDefault: {} })
  public socialNetworks?: Map<string, string>;

  @mapProp({ of: SideNote })
  public sideNotes?: Map<string, SideNote>;

  @mapProp({ of: String, enum: ProjectValue })
  public projects: Map<string, ProjectValue>;
}

export const model = new InternetUser().getModelForClass(InternetUser);
