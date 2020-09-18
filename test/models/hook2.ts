import { getModelForClass, post, pre, prop } from '../../src/typegoose';

@pre<Hook2>('save', function (next) {
  this.text = 'saved';

  next();
})
// eslint-disable-next-line only-arrow-functions (need `this` in hook)
@pre<Hook2>('updateMany', async function (this: any) {
  this._update.text = 'updateManied';
})
@post<Hook2>('find', (result) => {
  result[0].text = 'changed in post find hook';
})
@post<Hook2>('findOne', (result) => {
  result.text = 'changed in post findOne hook';
})
export class Hook2 {
  @prop()
  public text?: string;
}

export const Hook2Model = getModelForClass(Hook2);
