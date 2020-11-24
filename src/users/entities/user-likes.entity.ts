import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UserLikesEntity {
  @ApiProperty({ name: 'url', description: 'Url of the video', example: 'mario-memes' })
  @Expose()
  url: string;

  @ApiProperty({ name: 'isLiked', description: 'Boolean control if the video is liked or not', example: 0 })
  @Expose()
  isLiked: number;

}
