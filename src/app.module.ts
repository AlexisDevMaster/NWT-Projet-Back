import { Module } from '@nestjs/common';
import { HelloModule } from './hello/hello.module';
import { PeopleModule } from './people/people.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';


import * as Config from 'config';
import { VideoModule } from './video/video.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    HelloModule,
    PeopleModule,
    CategoryModule,
    VideoModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri'), Config.get<MongooseModuleOptions>('mongodb.options')),
    AuthModule,
    UsersModule
  ],
})
export class AppModule {
}
