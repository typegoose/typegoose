import { getModelForClass, prop } from '../../src/typegoose';

export enum SelectStrings {
  test1 = 'testing 1 should not default include',
  test2 = 'testing 2 should default include',
  test3 = 'testing 3 should not default include'
}

// Note: "select: true" is just to test if it works, and doesn't give an error
export class Select {
  @prop({ required: true, default: SelectStrings.test1, select: false })
  public test1!: string;

  @prop({ required: true, default: SelectStrings.test2, select: true })
  public test2!: string;

  @prop({ required: true, default: SelectStrings.test3, select: false })
  public test3!: string;
}

export const SelectModel = getModelForClass(Select);
