import { ConflictException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { CategoryDao } from './dao/category.dao';

@Injectable()
export class CategoryService {
  /**
   * Class constructor
   *
   * @param {CategoryDao} _categoryDao instance of the DAO
   */
  constructor(private readonly _categoryDao: CategoryDao) {
  }

  /**
   * Returns all existing category in the list
   *
   * @returns {Observable<CategoryEntity[] | void>}
   */
  findAll(): Observable<CategoryEntity[] | void> {
    return this._categoryDao.find()
      .pipe(
        map(_ => !!_ ? _.map(__ => new CategoryEntity(__)) : undefined),
      );
  }

  /**
   * Returns randomly one category of the list
   *
   * @returns {Observable<CategoryEntity | void>}
   */
  findRandom(): Observable<CategoryEntity | void> {
    return this._categoryDao.find()
      .pipe(
        map(_ => !!_ ? _[ Math.round(Math.random() * _.length) ] : undefined),
        map(_ => !!_ ? new CategoryEntity(_) : undefined),
      );
  }

  /**
   * Returns one category of the list matching id in parameter
   *
   * @param {string} id of the category
   *
   * @returns {Observable<CategoryEntity>}
   */
  findOne(id: string): Observable<CategoryEntity> {
    return this._categoryDao.findById(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ?
            of(new CategoryEntity(_)) :
            throwError(new NotFoundException(`Category with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Check if category already exists and add it in category list
   *
   * @param category to create
   *
   * @returns {Observable<CategoryEntity>}
   */
  create(category: CreateCategoryDto): Observable<CategoryEntity> {
    return this._addCategory(category)
      .pipe(
        mergeMap(_ => this._categoryDao.save(_)),
        catchError(e =>
          e.code === 11000 ?
            throwError(
              new ConflictException(`Category with name '${category.name}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        map(_ => new CategoryEntity(_)),
      );
  }

  /**
   * Update a category in category list
   *
   * @param {string} id of the category to update
   * @param category data to update
   *
   * @returns {Observable<CategoryEntity>}
   */
  update(id: string, category: UpdateCategoryDto): Observable<CategoryEntity> {
    return this._categoryDao.findByIdAndUpdate(id, category)
      .pipe(
        catchError(e =>
          e.code === 11000 ?
            throwError(
              new ConflictException(`Category with name '${category.name}' and firstname '${category.name}' already exists`),
            ) :
            throwError(new UnprocessableEntityException(e.message)),
        ),
        mergeMap(_ =>
          !!_ ?
            of(new CategoryEntity(_)) :
            throwError(new NotFoundException(`Category with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Deletes one category in category list
   *
   * @param {string} id of the category to delete
   *
   * @returns {Observable<void>}
   */
  delete(id: string): Observable<void> {
    return this._categoryDao.findByIdAndRemove(id)
      .pipe(
        catchError(e => throwError(new UnprocessableEntityException(e.message))),
        mergeMap(_ =>
          !!_ ?
            of(undefined) :
            throwError(new NotFoundException(`Category with id '${id}' not found`)),
        ),
      );
  }

  /**
   * Add category with good data in category list
   *
   * @param category to add
   *
   * @returns {Observable<CreateCategoryDto>}
   *
   * @private
   */
  private _addCategory(category: CreateCategoryDto): Observable<CreateCategoryDto> {
    return of(category)
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
