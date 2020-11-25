import { Module } from '@nestjs/common';
import { HelloModule } from './hello/hello.module';
import { PeopleModule } from './people/people.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import * as Config from 'config';
import { VideoModule } from './video/video.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { UsersPassModule } from './users-pass/users-pass.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    HelloModule,
    PeopleModule,
    CategoryModule,
    VideoModule,
    MongooseModule.forRoot(Config.get<string>('mongodb.uri'), Config.get<MongooseModuleOptions>('mongodb.options')),
    UsersModule,
    UsersPassModule,
    AuthModule
  ],
  controllers: [ AppController ],

})
export class AppModule {
}
