import {
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ name: 'name', description: 'Name of the category', example: 'Gaming' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ name: 'thumbnail', description: 'Thumbnail URL', example: 'https://randomuser.me/portraits/men/55.jpg' })
  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @ApiProperty({ name: 'url', description: 'URL of the category', example: 'gaming' })
  @IsString()
  @IsNotEmpty()
  url: string;

}
