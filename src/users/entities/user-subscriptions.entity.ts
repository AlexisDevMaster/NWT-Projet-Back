import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UserSubscriptionsEntity {

  @ApiProperty({ name: 'username', description: 'Username of the video author', example: 'Admin' })
  @Expose()
  username: string;

}
