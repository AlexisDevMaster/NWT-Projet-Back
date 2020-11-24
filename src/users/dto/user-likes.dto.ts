import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLikesDto {
  @ApiProperty({ name: 'url', description: 'Url of the video', example: 'mario-memes' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ name: 'isLiked', description: 'Boolean control if the video is liked or not', example: 0 })
  @IsNumber()
  @IsNotEmpty()
  isLiked: number;
}
