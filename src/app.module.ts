import { Module } from '@nestjs/common';
import { HelloModule } from './hello/hello.module';
import { PeopleModule } from './people/people.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';


import * as Config from 'config';

@Module({
  imports: [
    HelloModule,
    PeopleModule,
    CategoryModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri'), Config.get<MongooseModuleOptions>('mongodb.options')),
  ],
})
export class AppModule {
}
