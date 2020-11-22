import { Injectable, Logger } from '@nestjs/common';
import { Model, MongooseDocument } from 'mongoose';
import { Category } from '../schemas/category.schema';
import { InjectModel } from '@nestjs/mongoose';
import { from, Observable } from 'rxjs';
import { find, map } from 'rxjs/operators';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoryDao {
  /**
   * Class constructor
   *
   * @param _categoryModel
   */
  constructor(@InjectModel(Category.name) private readonly _categoryModel: Model<Category>) {
  }

  /**
   * Call mongoose method, call toJSON on each result and returns Category[] or undefined
   *
   * @return {Observable<Category[] | void>}
   */
  find(): Observable<Category[] | void> {
    return from(this._categoryModel.find({}))
      .pipe(
        map((docs: MongooseDocument[]) => (!!docs && docs.length > 0) ? docs.map(_ => _.toJSON()) : undefined),
      );
  }

  /**
   * Returns one category of the list matching id in parameter
   *
   * @param {string} id of the category in the db
   *
   * @return {Observable<Category | void>}
   */
  findById(id: string): Observable<Category | void> {
    return from(this._categoryModel.findById(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  /**
   * Check if category already exists with index and add it in category list
   *
   * @param {CreateCategoryDto} category to create
   *
   * @return {Observable<Category>}
   */
  save(category: CreateCategoryDto): Observable<Category> {
    return from(new this._categoryModel(category).save())
      .pipe(
        map((doc: MongooseDocument) => doc.toJSON()),
      );
  }

  /**
   * Update a category in category list
   *
   * @param {string} id
   * @param {UpdateCategoryDto} category
   *
   * @return {Observable<Category | void>}
   */
  findByIdAndUpdate(id: string, category: UpdateCategoryDto): Observable<Category | void> {
    return from(this._categoryModel.findByIdAndUpdate(id, category, { new: true, runValidators: true }))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }

  /**
   * Delete a category in category list
   *
   * @param {string} id
   *
   * @return {Observable<Category | void>}
   */
  findByIdAndRemove(id: string): Observable<Category | void> {
    return from(this._categoryModel.findByIdAndRemove(id))
      .pipe(
        map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
      );
  }
}
