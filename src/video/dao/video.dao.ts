import { Injectable, Logger } from '@nestjs/common';
import { Model, MongooseDocument } from 'mongoose';
import { Video } from '../schemas/video.schema';
import { InjectModel } from '@nestjs/mongoose';
import { from, Observable } from 'rxjs';
import { find, map } from 'rxjs/operators';
import { CreateVideoDto } from '../dto/create-video.dto';
import { UpdateVideoDto } from '../dto/update-video.dto';

@Injectable()
export class VideoDao {
  /**
   * Class constructor
   *
   * @param _videoModel
   */
  constructor(@InjectModel(Video.name) private readonly _videoModel: Model<Video>) {
  }

  /**
   * Call mongoose method, call toJSON on each result and returns Video[] or undefined
   *
   * @return {Observable<Video[] | void>}
   */
  find(): Observable<Video[] | void> {
    return from(this._videoModel.find({}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }

  /**
   * Returns one video of the list matching id in parameter
   *
   * @param {string} id of the video in the db
   *
   * @return {Observable<Video | void>}
   */
  findById(id: string): Observable<Video | void> {
    return from(this._videoModel.findById(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  /**
   * Check if video already exists with index and add it in video list
   *
   * @param {CreateVideoDto} video to create
   *
   * @return {Observable<Video>}
   */
  save(video: CreateVideoDto): Observable<Video> {
    return from(new this._videoModel(video).save())
      .pipe(
        map((doc: MongooseDocument) => doc.toJSON()),
      );
  }

  /**
   * Update a video in video list
   *
   * @param {string} id
   * @param {UpdateVideoDto} video
   *
   * @return {Observable<Video | void>}
   */
  findByIdAndUpdate(id: string, video: UpdateVideoDto): Observable<Video | void> {
    return from(this._videoModel.findByIdAndUpdate(id, video, { new: true, runValidators: true }))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  /**
   * Delete a video in video list
   *
   * @param {string} id
   *
   * @return {Observable<Video | void>}
   */
  findByIdAndRemove(id: string): Observable<Video | void> {
    return from(this._videoModel.findByIdAndRemove(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }
}
