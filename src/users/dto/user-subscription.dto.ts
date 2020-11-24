import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserSubscriptionDto {

  @ApiProperty({ name: 'username', description: 'Username of the video author', example: 'Admin' })
  @IsString()
  @IsNotEmpty()
  username: string;

}
