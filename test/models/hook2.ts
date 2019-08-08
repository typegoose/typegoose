import { getModelForClass, post, pre, prop } from '../../src/typegoose';

@pre<Dummy>('save', function (next) {
  this.text = 'saved';

  next();
})
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
