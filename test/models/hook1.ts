import { defaultClasses, arrayProp, getModelForClass, isDocument, post, pre, prop } from '../../src/typegoose';
import { InheritanceHook as HookClassToInherit } from './hook2';

@pre<Hook>('save', function () {
  if (this.isModified('shape')) {
    this.shape = 'newShape';
  } else {
    this.shape = 'oldShape';
  }
})
@pre<Hook>(/^update/, function () {
  if (Array.isArray(this)) {
    this.forEach(async (v) => await v.update({ shape: 'REGEXP_PRE' })); // i know this is inefficient
  } else {
    this.update({ shape: 'REGEXP_PRE' });
  }
})
@post<Hook>(/^find/, (doc) => {
  if (Array.isArray(doc)) {
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
  if (Array.isArray(docs)) {
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

@pre<InheritanceHook>('save', function (next) {
  this.hooksMessages.push('Actual');
  next();
})
@post<InheritanceHook>('findOne', async (doc, next) => {
  doc.hooksMessages.push('Post Actual');
  next();
})
class InheritanceHook extends HookClassToInherit { }

export const HookModel = getModelForClass(Hook);
export const HookArrayModel = getModelForClass(HookArray);
export const InheritedHookModel = getModelForClass(InheritanceHook);
