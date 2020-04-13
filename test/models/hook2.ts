import { getModelForClass, post, pre, prop, arrayProp } from '../../src/typegoose';

@pre<Dummy>('save', function (next) {
  this.text = 'saved';

  next();
})
// eslint-disable-next-line only-arrow-functions (need `this` in hook)
@pre<Dummy>('updateMany', async function (this: any) {
  this._update.text = 'updateManied';
})
@post<Dummy>('find', (result) => {
  result[0].text = 'changed in post find hook';
})
@post<Dummy>('findOne', (result) => {
  result.text = 'changed in post findOne hook';
})
export class Dummy {
  @prop()
  public text: string;
}

export const model = getModelForClass(Dummy);

@pre<InheritanceHook>('save', function (next) {
  console.log('[H] base hook');
  this.hooksMessages.push('Base');
  next();
})
@post<InheritanceHook>('findOne', async (doc, next) => {
  doc.hooksMessages.push('Post Base');
  next();
})
export class InheritanceHook {
  @arrayProp({ items: String, default: [] })
  public hooksMessages = [];
}
