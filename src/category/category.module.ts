import { Logger, Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category, CategorySchema } from './schemas/category.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryDao } from './dao/category.dao';

@Module({
  imports: [ MongooseModule.forFeature([ { name: Category.name, schema: CategorySchema } ]) ],
  controllers: [ CategoryController ],
  providers: [ CategoryService, Logger, CategoryDao ],
})
export class CategoryModule {
}
