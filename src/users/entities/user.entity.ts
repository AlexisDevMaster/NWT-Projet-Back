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

  @ApiProperty({ name: 'verified', description: 'Is User is Verified', example: 0 })
  @Expose()
  @Type(() => Boolean)
  verified: boolean;

  @ApiProperty({ name: 'subscriptions', description: 'User subscriptions', 'type': [UserSubscriptionsEntity],  example: [{ username:"username",  }]  })
  @Expose()
  @Type(() => UserSubscriptionsEntity)
  subscriptions: UserSubscriptionsEntity[];

  @ApiProperty({ name: 'likes', description: 'Video like, disliked, or not', 'type': [UserLikesEntity], example: [{ url:"/url/to/video", isLiked:0 }]})
  @Expose()
  @Type(() => UserLikesEntity)
  likes: UserLikesEntity[];



  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
