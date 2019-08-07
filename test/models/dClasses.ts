import { GridFS } from '../../src/defaultClasses';
import { defaultClasses, getModelForClass, modelOptions, prop } from '../../src/typegoose';

export class TestTimeStamps extends defaultClasses.TimeStamps {
  @prop({ required: true })
  public someValue: string;
}

export const TestTimeStampsModel = getModelForClass(TestTimeStamps);

class GridFSMetadata {
  @prop({ default: 'hello' })
  public sometestvalue: string;
}

@modelOptions({ gridFS: { bucketName: 'TestGridFS' } })
export class TestGridFS extends GridFS {
  @prop({ default: {} })
  public metadata: GridFSMetadata;
}
