import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty({ name: 'title', description: 'Title of the Category', example: 'Memes' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ name: 'thumbnail', description: 'Thumbnail URL', example: 'https://randomuser.me/portraits/men/55.jpg' })
  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @ApiProperty({ name: 'url', description: 'URL of the category', example: 'memes' })
  @IsString()
  @IsNotEmpty()
  url: string;
}
