import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsersPassController } from './users-pass.controller';
import { UsersPassService } from './users-pass.service';
import { UserLoginSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserLoginSchema}]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false })
  ],
  exports: [UsersPassService],
  controllers: [UsersPassController],
  providers: [UsersPassService]
})
export class UsersPassModule {}
