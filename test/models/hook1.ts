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
    this.forEach(async (v) => await v.update({ shape: 'REGEXP_PRE' })); // I know this is inefficient
  } else {
    this.updateOne({ shape: 'REGEXP_PRE' });
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

@pre<BaseHook>('save', function () {
  this.hooksMessages.push('Base');
})
@post<BaseHook>('findOne', async (doc) => {
  doc.hooksMessages.push('Post Base');
})
export class BaseHook {
  @prop({ type: String, default: [] })
  public hooksMessages!: string[];
}

@pre<ExtendedHook>('save', function () {
  this.hooksMessages.push('Actual');
})
@post<ExtendedHook>('findOne', async (doc) => {
  doc.hooksMessages.push('Post Actual');
})
class ExtendedHook extends BaseHook {}

export const HookModel = getModelForClass(Hook);
export const HookArrayModel = getModelForClass(HookArray);
export const ExtendedHookModel = getModelForClass(ExtendedHook);
