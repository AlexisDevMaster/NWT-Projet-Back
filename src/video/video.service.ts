import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoEntity } from './entities/video.entity';
import { VideoDao } from './dao/video.dao';

@Injectable()
export class VideoService {
  /**
   * Class constructor
   *
   * @param {VideoDao} _videoDao instance of the DAO
   */
  constructor(private readonly _videoDao: VideoDao) {
  }

  /**
   * Returns all existing video in the list
   *
   * @returns {Observable<VideoEntity[] | void>}
   */
  findAll(): Observable<VideoEntity[] | void> {
    return this._videoDao.find()
      .pipe(
        map(_ => !!_ ? _.map(__ => new VideoEntity(__)) : undefined),
      );
  }

  /**
   * Returns randomly one video of the list
   *
   * @returns {Observable<VideoEntity | void>}
   */
  findRandom(): Observable<VideoEntity | void> {
    return this._videoDao.find()
      .pipe(
        map(_ => !!_ ? _[ Math.round(Math.random() * _.length) ] : undefined),
        map(_ => !!_ ? new VideoEntity(_) : undefined),
      );
  }

  /**
   * Returns one video of the list matching id in parameter
   *
   * @param {string} id of the video
   *
   * @returns {Observable<VideoEntity>}
   */
  findOne(id: string): Observable<VideoEntity> {
    return this._videoDao.findById(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ?
            of(new VideoEntity(_)) :
            throwError(new NotFoundException(`Video with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Returns one video of the list matching id in parameter
   *
   * @param {string} url of the video
   *
   * @returns {Observable<VideoEntity>}
   */
  findOneByUrl(url: string): Observable<VideoEntity> {
    return this._videoDao.findByUrl(url)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ?
            of(new VideoEntity(_)) :
            throwError(new NotFoundException(`Video with url '${url}' not found`)),
        ),
      );
  }

  /**
   * Check if video already exists and add it in video list
   *
   * @param video to create
   *
   * @returns {Observable<VideoEntity>}
   */
  create(video: CreateVideoDto): Observable<VideoEntity> {
    return this._addVideo(video)
      .pipe(
        mergeMap(_ => this._videoDao.save(_)),
        catchError(e =>
          e.code === 11000 ?
            throwError(
              new ConflictException(`Video with title '${video.title}' and url '${video.url}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        map(_ => new VideoEntity(_)),
      );
  }

  /**
   * Update a video in video list
   *
   * @param {string} id of the video to update
   * @param video data to update
   *
   * @returns {Observable<VideoEntity>}
   */
  update(id: string, video: UpdateVideoDto): Observable<VideoEntity> {
    return this._videoDao.findByIdAndUpdate(id, video)
      .pipe(
        catchError(e =>
          e.code === 11000 ?
            throwError(
              new ConflictException(`Video with title '${video.title}' and url '${video.url}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        mergeMap(_ =>
          !!_ ?
            of(new VideoEntity(_)) :
            throwError(new NotFoundException(`Video with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Deletes one video in video list
   *
   * @param {string} id of the video to delete
   *
   * @returns {Observable<void>}
   */
  delete(id: string): Observable<void> {
    return this._videoDao.findByIdAndRemove(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ?
            of(undefined) :
            throwError(new NotFoundException(`Video with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Add video with good data in video list
   *
   * @param video to add
   *
   * @returns {Observable<CreateVideoDto>}
   *
   * @private
   */
  private _addVideo(video: CreateVideoDto): Observable<CreateVideoDto> {
    return of(video)
      .pipe(
        map(_ =>
          Object.assign(_, {
            birthDate: this._parseDate('20/09/1991'),
            photo: 'https://randomuser.me/api/portraits/lego/6.jpg',
          }),
        ),
      );
  }

  /**
   * Function to parse date and return timestamp
   *
   * @param {string} date to parse
   *
   * @returns {number} timestamp
   *
   * @private
   */
  private _parseDate(date: string): number {
    const dates = date.split('/');
    return (new Date(dates[ 2 ] + '/' + dates[ 1 ] + '/' + dates[ 0 ]).getTime());
  }
}
