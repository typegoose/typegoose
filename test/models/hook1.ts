import { isArray } from 'util';
import { DocumentType, post, pre, prop, Typegoose } from '../../src/typegoose';

@pre<Hook>('save', function () {
  if (this.isModified('shape')) {
    this.shape = 'newShape';
  } else {
    this.shape = 'oldShape';
  }
})
@pre<Hook>(/^update/, function () {
  if (isArray(this)) {
    this.forEach((v) => v.update({ shape: 'REGEXP_PRE' })); // i know this is inefficient
  } else {
    this.update({ shape: 'REGEXP_PRE' });
  }
})
@post<Hook>(/^find/, (doc: DocumentType<Hook> | DocumentType<Hook>[]) => {
  if (isArray(doc)) {
    doc.forEach((v) => v.material = 'REGEXP_POST');
  } else {
    doc.material = 'REGEXP_POST';
  }
})
export class Hook extends Typegoose {
  @prop({ required: true })
  public material: string;

  @prop()
  public shape?: string;
}

export const model = new Hook().getModelForClass(Hook);
