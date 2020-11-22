import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CategoryInterceptor } from './interceptors/category.interceptor';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities/category.entity';
import { HandlerParams } from './validators/handler-params';
import { Observable } from 'rxjs';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('category')
@Controller('category')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(CategoryInterceptor)
export class CategoryController {
  /**
   * Class constructor
   * @param _categoryService
   */
  constructor(private readonly _categoryService: CategoryService) {
  }

  /**
   * Handler to answer to GET /category route
   *
   * @returns Observable<CategoryEntity[] | void>
   */
  @ApiOkResponse({ description: 'Returns an array of category', type: CategoryEntity, isArray: true })
  @ApiNoContentResponse({ description: 'No category exists in database' })
  @Get()
  findAll(): Observable<CategoryEntity[] | void> {
    return this._categoryService.findAll();
  }

  /**
   * Handler to answer to GET /category/random route
   *
   * @returns Observable<CategoryEntity | void>
   */
  @ApiOkResponse({ description: 'Returns one category randomly', type: CategoryEntity })
  @ApiNoContentResponse({ description: 'No category exists in database' })
  @Get('random')
  findRandom(): Observable<CategoryEntity | void> {
    return this._categoryService.findRandom();
  }

  /**
   * Handler to answer to GET /category/:id route
   *
   * @param {HandlerParams} params list of route params to take category id
   *
   * @returns Observable<CategoryEntity>
   */
  @ApiOkResponse({ description: 'Returns the category for the given "id"', type: CategoryEntity })
  @ApiNotFoundResponse({ description: 'Category with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the category in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':id')
  findOne(@Param() params: HandlerParams): Observable<CategoryEntity> {
    return this._categoryService.findOne(params.id);
  }

  /**
   * Handler to answer to POST /category route
   *
   * @param createCategoryDto data to create
   *
   * @returns Observable<CategoryEntity>
   */
  @ApiCreatedResponse({ description: 'The category has been successfully created', type: CategoryEntity })
  @ApiConflictResponse({ description: 'The category already exists in the database' })
  @ApiBadRequestResponse({ description: 'Payload provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiBody({ description: 'Payload to create a new category', type: CreateCategoryDto })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Observable<CategoryEntity> {
    return this._categoryService.create(createCategoryDto);
  }

  /**
   * Handler to answer to PUT /category/:id route
   *
   * @param {HandlerParams} params list of route params to take category id
   * @param updateCategoryDto data to update
   *
   * @returns Observable<CategoryEntity>
   */
  @ApiOkResponse({ description: 'The category has been successfully updated', type: CategoryEntity })
  @ApiNotFoundResponse({ description: 'Category with the given "id" doesn\'t exist in the database' })
  @ApiConflictResponse({ description: 'The category already exists in the database' })
  @ApiBadRequestResponse({ description: 'Parameter and/or payload provided are not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the category in the database',
    type: String,
    allowEmptyValue: false,
  })
  @ApiBody({ description: 'Payload to update a category', type: UpdateCategoryDto })
  @Put(':id')
  update(@Param() params: HandlerParams, @Body() updateCategoryDto: UpdateCategoryDto): Observable<CategoryEntity> {
    return this._categoryService.update(params.id, updateCategoryDto);
  }

  /**
   * Handler to answer to DELETE /category/:id route
   *
   * @param {HandlerParams} params list of route params to take category id
   *
   * @returns Observable<void>
   */
  @ApiNoContentResponse({ description: 'The category has been successfully deleted' })
  @ApiNotFoundResponse({ description: 'Category with the given "id" doesn\'t exist in the database' })
  @ApiBadRequestResponse({ description: 'Parameter provided is not good' })
  @ApiUnprocessableEntityResponse({ description: 'The request can\'t be performed in the database' })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the category in the database',
    type: String,
    allowEmptyValue: false,
  })
  @Delete(':id')
  delete(@Param() params: HandlerParams): Observable<void> {
    return this._categoryService.delete(params.id);
  }
}
