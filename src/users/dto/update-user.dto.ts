import {
  IsInstance,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserLikesDto } from './user-likes.dto';
import { UserSubscriptionDto } from './user-subscription.dto';

export class UpdateUserDto {

  @ApiProperty({ name: 'username', description: 'Username', example: 'Mclaughlin' })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ name: 'verified', description: 'Is User is Verified', example: true })
  @IsString()
  @IsOptional()
  verified?: boolean;

  @ApiProperty({ name: 'likes', description: 'Videos like or disliked' })
  @IsInstance(UserLikesDto, {
    each: true
  })
  @ValidateNested({
    each: true
  })
  @Type(() => UserLikesDto)
  @IsOptional()
  likes?: UserLikesDto[];

  @ApiProperty({ name: 'subscriptions', description: 'User subscriptions' })
  @IsInstance(UserSubscriptionDto, {
    each: true
  })
  @ValidateNested({
    each: true
  })
  @Type(() => UserSubscriptionDto)
  @IsOptional()
  subscriptions?: UserSubscriptionDto[];

}
