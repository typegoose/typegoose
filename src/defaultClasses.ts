import { GridFSBucket } from 'mongodb';
import { modelOptions } from './optionsProp';
import { arrayProp, prop } from './prop';
import { DocumentType } from './types';

@modelOptions({
  schemaOptions: { toJSON: { virtuals: true }, toObject: { virtuals: true } },
  gridFS: { chunkSizeBytes: 255 * 1024 }
})
export abstract class GridFS {
  @prop({ index: true })
  public length: number;

  @prop({ index: true })
  public chunkSize: number;

  @prop({ index: true })
  public uploadDate: Date;

  @prop({ index: true, trim: true })
  public md5: string;

  @prop({ index: true, trim: true })
  public filename: string;

  @prop({ index: true, trim: true })
  public contentType: string;

  @arrayProp({ index: true, trim: true, items: String })
  public aliases: string[];

  @prop({ default: {} })
  public metadata: object;

  public get createdAt() {
    return this.uploadDate;
  }
  public get updatedAt() {
    return this.uploadDate;
  }

  public static bucket: GridFSBucket;

  public openUploadStream() {
    // return cl.bucket;
    // @ts-ignore
    const bucket: GridFSBucket = this.constructor.bucket;

    return bucket.openUploadStream(this.filename, {
      aliases: this.aliases,
      metadata: this.metadata,
      contentType: this.contentType,
      chunkSizeBytes: this.chunkSize
    });
  }

  public openDownloadStream<T extends GridFS>(this: DocumentType<T>, options?: {
    start: number,
    end: number
  }) {
    // @ts-ignore
    const bucket: GridFSBucket = this.constructor.bucket;

    return bucket.openDownloadStream(this._id, options); // somehow .id and ._id are diffrent here
  }

  public openUploadStreamWithId<T extends GridFS>(this: DocumentType<T>) {
    // @ts-ignore
    const bucket: GridFSBucket = this.constructor.bucket;

    return bucket.openUploadStreamWithId(this._id, this.filename, {
      aliases: this.aliases,
      metadata: this.metadata,
      contentType: this.contentType,
      chunkSizeBytes: this.chunkSize
    });
  }

  public async rename<T extends GridFS>(this: DocumentType<T>) {
    // @ts-ignore
    const bucket: GridFSBucket = this.constructor.bucket;

    return new Promise((res, rej) => {
      bucket.rename(this._id, this.filename, (err) => {
        if (err) {
          rej(err);
        }
        res();
      });
    });
  }

  public async delete<T extends GridFS>(this: DocumentType<T>) {
    // @ts-ignore
    const bucket: GridFSBucket = this.constructor.bucket;

    return new Promise((res, rej) => {
      bucket.delete(this._id, (err) => {
        if (err) {
          rej(err);
        }
        res();
      });
    });
  }
}
// new GridFSBucket(mongoose.connection.db);

@modelOptions({ schemaOptions: { timestamps: true } })
export abstract class TimeStamps {
  public createdAt!: Readonly<Date>;
  public updatedAt!: Readonly<Date>;
}
