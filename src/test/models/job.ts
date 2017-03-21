import { Typegoose, prop, subdoc } from '../../typegoose';

export class Job extends Typegoose {
  @prop
  title?: string;

  @prop
  position?: string;
}
