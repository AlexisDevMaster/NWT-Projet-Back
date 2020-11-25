import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UsersDao } from './dao/users.dao';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(private readonly _usersDao: UsersDao) {
  }

  /**
   * Returns one user of the list matching id in parameter
   *
   *
   * @returns {Observable<UserEntity>}
   * @param id
   */
  findOne(id: string): Observable<UserEntity> {
    return this._usersDao.findById(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ?
            of(new UserEntity(_)) :
            throwError(new NotFoundException(`Users with username '${id}' not found`)),
        ),
      );
  }

  /**
   * Returns one user of the list matching username in parameter
   *
   *
   * @returns {Observable<UserEntity>}
   * @param username
   */
  findOneByUsername(username: string): Observable<UserEntity> {
    return this._usersDao.findByUsername(username)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ?
            of(new UserEntity(_)) :
            throwError(new NotFoundException(`Users with username '${username}' not found`)),
        ),
      );
  }

  /**
   * Returns all existing users in the list
   *
   * @returns {Observable<UserEntity[] | void>}
   */
  findAll(): Observable<UserEntity[] | void> {
    return this._usersDao.find()
      .pipe(
        map(_ => !!_ ? _.map(__ => new UserEntity(__)) : undefined),
      );
  }

  /**
   * Returns randomly one user of the list
   *
   * @returns {Observable<UserEntity | void>}
   */
  findRandom(): Observable<UserEntity | void> {
    return this._usersDao.find()
      .pipe(
        map(_ => !!_ ? _[ Math.round(Math.random() * _.length) ] : undefined),
        map(_ => !!_ ? new UserEntity(_) : undefined),
      );
  }

  /**
   * Check if user already exists and add it in users list
   *
   * @param user to create
   *
   * @returns {Observable<UserEntity>}
   */
  create(user: CreateUserDto): Observable<UserEntity> {
    return this._addUser(user)
      .pipe(
        mergeMap(_ => this._usersDao.save(_)),
        catchError(e =>
          e.code === 11000 ?
            throwError(
              new ConflictException(`Users with username '${user.username}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        map(_ => new UserEntity(_)),
      );
  }

  /**
   * Update a user in users list
   *
   * @param {string} id of the user to update
   * @param user data to update
   *
   * @returns {Observable<UserEntity>}
   */
  update(id: string, user: UpdateUserDto): Observable<UserEntity> {
    return this._usersDao.findByIdAndUpdate(id, user)
      .pipe(
        catchError(e =>
          e.code === 11000 ?
            throwError(
              new ConflictException(`Users with username '${user.username}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        mergeMap(_ =>
          !!_ ?
            of(new UserEntity(_)) :
            throwError(new NotFoundException(`Users with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Deletes one user in users list
   *
   * @param {string} id of the user to delete
   *
   * @returns {Observable<void>}
   */
  delete(id: string): Observable<void> {
    return this._usersDao.findByIdAndRemove(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ?
            of(undefined) :
            throwError(new NotFoundException(`User with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Add user with good data in users list
   *
   * @param user to add
   *
   * @returns {Observable<CreateUserDto>}
   *
   * @private
   */
  private _addUser(user: CreateUserDto): Observable<CreateUserDto> {
    return of(user)
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
