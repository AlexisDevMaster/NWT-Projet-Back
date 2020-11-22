import { Logger, Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { Video, VideoSchema } from './schemas/video.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoDao } from './dao/video.dao';

@Module({
  imports: [ MongooseModule.forFeature([ { name: Video.name, schema: VideoSchema } ]) ],
  controllers: [ VideoController ],
  providers: [ VideoService, Logger, VideoDao ],
})
export class VideoModule {
}
