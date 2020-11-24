import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserSubscriptionsEntity } from './user-subscriptions.entity';
import { UserLikesEntity } from './user-likes.entity';

@Exclude()
export class UserEntity {
  @ApiProperty({ name: 'id', description: 'Unique identifier in the database', example: '5763cd4dc378a38ecd387737' })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({ name: 'username', description: 'Username', example: 'Admin' })
  @Expose()
  @Type(() => String)
  username: string;

  @ApiProperty({ name: 'isVerified', description: 'Is User is Verified', example: 0 })
  @Expose()
  @Type(() => Number)
  isVerified: number;

  @ApiProperty({ name: 'subscriptions', description: 'User subscriptions' })
  @Expose()
  @Type(() => UserSubscriptionsEntity)
  subscriptions: UserSubscriptionsEntity[];

  @ApiProperty({ name: 'likes', description: 'Video like, disliked, or not' })
  @Expose()
  @Type(() => UserLikesEntity)
  categories: UserLikesEntity[];



  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
