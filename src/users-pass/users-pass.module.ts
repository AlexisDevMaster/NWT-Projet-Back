import { Module } from '@nestjs/common';
import { UsersPassService } from './users-pass.service';

@Module({
  providers: [UsersPassService],
  exports: [UsersPassService],
})
export class UsersPassModule {}
