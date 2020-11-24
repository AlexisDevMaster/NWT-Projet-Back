import { UserSubscriptionDto } from './user-subscription.dto';
import {
  IsInstance,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserLikesDto } from './user-likes.dto';

export class CreateUserDto {
  @ApiProperty({ name: 'username', description: 'Username', example: 'Mclaughlin' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ name: 'verified', description: 'Is User is Verified', example: true })
  @IsString()
  @IsNotEmpty()
  verified: boolean;

  @ApiProperty({ name: 'likes', description: 'Video like, disliked, or not' })
  @IsInstance(UserLikesDto, {
    each: true
  })
  @ValidateNested({
    each: true
  })
  @Type(() => UserLikesDto)
  @IsOptional()
  likes: UserLikesDto[];

  @ApiProperty({ name: 'subscriptions', description: 'User subscriptions' })
  @IsInstance(UserSubscriptionDto, {
    each: true
  })
  @ValidateNested({
    each: true
  })
  @Type(() => UserSubscriptionDto)
  @IsOptional()
  subscriptions: UserSubscriptionDto[];
}
