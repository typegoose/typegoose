import { getModelForClass, isDocument, post, pre, prop } from '../../src/typegoose';

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
    doc.forEach((v) => (v.material = 'REGEXP_POST'));
  } else if (isDocument(doc)) {
    doc.material = 'REGEXP_POST';
  }
})
export class Hook {
  @prop({ required: true })
  public material!: string;

  @prop()
  public shape?: string;
}

@post<HookArray>(['find', 'findOne'], async (docs) => {
  if (Array.isArray(docs)) {
    await Promise.all(
      docs.map(async (v) => {
        v.testArray.push('hello');
        await v.save();
      })
    );
  } else if (isDocument(docs)) {
    docs.testArray.push('hello');
    await docs.save();
  }
})
export class HookArray {
  @prop({ required: true, type: String })
  public testArray!: string[];
}

@pre<BaseHook>('save', function (next) {
  this.hooksMessages.push('Base');
  next();
})
@post<BaseHook>('findOne', async (doc, next) => {
  doc.hooksMessages.push('Post Base');
  next();
})
export class BaseHook {
  @prop({ type: String, default: [] })
  public hooksMessages!: string[];
}

@pre<ExtendedHook>('save', function (next) {
  this.hooksMessages.push('Actual');
  next();
})
@post<ExtendedHook>('findOne', async (doc, next) => {
  doc.hooksMessages.push('Post Actual');
  next();
})
class ExtendedHook extends BaseHook { }

export const HookModel = getModelForClass(Hook);
export const HookArrayModel = getModelForClass(HookArray);
export const ExtendedHookModel = getModelForClass(ExtendedHook);
