import {
  IsDate, IsDateString, IsInstance,
  IsNotEmpty, IsNumber, IsOptional,
  IsString, ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CategoryDto } from '../../category/dto/category.dto';

export class CreateVideoDto {
  @ApiProperty({ name: 'title', description: 'Name of the video', example: 'Gaming' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ name: 'time', description: 'Time of the video', example: '2020-01-02T00:26:08.000Z' })
  @IsDateString()
  @IsNotEmpty()
  time: Date;

  @ApiProperty({ name: 'upload_date', description: 'Upload date of the video', example: '2020-01-02T00:26:08.000Z' })
  @IsDateString()
  @IsNotEmpty()
  upload_date: Date;

  @ApiProperty({ name: 'nb_like', description: 'Number of like', example: 800 })
  @IsNumber()
  @IsNotEmpty()
  nb_like: number;

  @ApiProperty({ name: 'nb_dislike', description: 'Number of dislike', example: 800 })
  @IsNumber()
  @IsNotEmpty()
  nb_dislike: number;

  @ApiProperty({ name: 'author', description: 'Name of the author', example: 'Admin' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ name: 'description', description: 'Description of the author', example: '...' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ name: 'path', description: 'Path of the video', example: '...' })
  @IsString()
  @IsNotEmpty()
  path: string;

  @ApiProperty({ name: 'type', description: 'Type of the video', example: 'video/mp4' })
  @IsString()
  @IsNotEmpty()
  type: string;


  @ApiProperty({ name: 'thumbnail_path', description: 'Thumbnail_path of the video', example: '...' })
  @IsString()
  @IsNotEmpty()
  thumbnail_path: string;

  @ApiProperty({ name: 'nb_view', description: 'Number of view', example: 1562 })
  @IsNumber()
  @IsNotEmpty()
  nb_view: number;

  @ApiProperty({ name: 'url', description: 'Url of the video', example: '...' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ name: 'categories', description: 'Categories' })
  @IsInstance(CategoryDto, {
    each: true
  })
  @ValidateNested({
    each: true
  })
  @Type(() => CategoryDto)
  @IsOptional()
  categories: CategoryDto[];

}
