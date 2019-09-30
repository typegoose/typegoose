import { isArray } from 'util';
import { arrayProp, getModelForClass, isDocument, post, pre, prop } from '../../src/typegoose';

@pre<Hook>('save', function () {
  if (this.isModified('shape')) {
    this.shape = 'newShape';
  } else {
    this.shape = 'oldShape';
  }
})
@pre<Hook>(/^update/, function () {
  if (isArray(this)) {
    this.forEach(async (v) => await v.update({ shape: 'REGEXP_PRE' })); // i know this is inefficient
  } else {
    this.update({ shape: 'REGEXP_PRE' });
  }
})
@post<Hook>(/^find/, (doc) => {
  if (isArray(doc)) {
    doc.forEach((v) => v.material = 'REGEXP_POST');
  } else if (isDocument(doc)) {
    doc.material = 'REGEXP_POST';
  }
})
export class Hook {
  @prop({ required: true })
  public material: string;

  @prop()
  public shape?: string;
}

@post<HookArray>(['find', 'findOne'], async (docs) => {
  if (isArray(docs)) {
    await Promise.all(docs.map(async (v) => {
      v.testArray.push('hello');
      await v.save();
    }));
  } else if (isDocument(docs)) {
    docs.testArray.push('hello');
    await docs.save();
  }
})
export class HookArray {
  @arrayProp({ required: true, items: String })
  public testArray: string[];
}

export const HookModel = getModelForClass(Hook);
export const HookArrayModel = getModelForClass(HookArray);
