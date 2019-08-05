import { getModelForClass, post, pre, prop, Typegoose } from '../../src/typegoose';

@pre<Dummy>('save', function (next) {
  this.text = 'saved';

  next();
})
// eslint-disable-next-line only-arrow-functions (need `this` in hook)
@pre<Dummy>('updateMany', async function () {
  this._update.text = 'updateManied';
})
@post<Dummy>('find', (result) => {
  result[0].text = 'changed in post find hook';
})
@post<Dummy>('findOne', (result) => {
  result.text = 'changed in post findOne hook';
})
export class Dummy extends Typegoose {
  @prop()
  public text: string;
}

export const model = getModelForClass(Dummy);
