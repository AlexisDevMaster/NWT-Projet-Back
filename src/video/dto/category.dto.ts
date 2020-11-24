import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {

  @ApiProperty({ name: 'url', description: 'URL of the category', example: 'memes' })
  @IsString()
  @IsNotEmpty()
  url: string;
}
