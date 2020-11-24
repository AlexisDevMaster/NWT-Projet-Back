import {
  IsDate, IsDateString, IsInstance, IsInt,
  IsNotEmpty, IsNumber,
  IsOptional,
  IsString, ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CategoryDto } from './category.dto';

export class UpdateVideoDto {
  @ApiProperty({ name: 'title', description: 'Title of the video', example: 'Gaming' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ name: 'time', description: 'Time of the video', example: '2020-01-02T00:26:08.000Z' })
  @IsDateString()
  @IsOptional()
  time?: Date;

  @ApiProperty({ name: 'upload_date', description: 'Upload date of the video', example: '2020-01-02T00:26:08.000Z' })
  @IsDateString()
  @IsOptional()
  upload_date?: Date;

  @ApiProperty({ name: 'nb_like', description: 'Number of like', example: 800 })
  @IsNumber()
  @IsOptional()
  nb_like?: number;

  @ApiProperty({ name: 'nb_dislike', description: 'Number of dislike', example: 800 })
  @IsNumber()
  @IsOptional()
  nb_dislike?: number;

  @ApiProperty({ name: 'author', description: 'Name of the author', example: 'Admin' })
  @IsString()
  @IsOptional()
  author?: string;

  @ApiProperty({ name: 'description', description: 'Description of the author', example: '...' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ name: 'path', description: 'Path of the video', example: '...' })
  @IsString()
  @IsOptional()
  path?: string;

  @ApiProperty({ name: 'type', description: 'Path of the video', example: 'video/mp4' })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({ name: 'thumbnail_path', description: 'Thumbnail_path of the video', example: '...' })
  @IsString()
  @IsOptional()
  thumbnail_path?: string;

  @ApiProperty({ name: 'nb_view', description: 'Number of view', example: 1562 })
  @IsNumber()
  @IsOptional()
  nb_view?: number;

  @ApiProperty({ name: 'url', description: 'Url of the video', example: '...' })
  @IsString()
  @IsOptional()
  url?: string;

  @ApiProperty({ name: 'categories', description: 'Categories' , type: [CategoryDto]})
  @IsInstance(CategoryDto, {
    each: true
  })
  @ValidateNested({
    each: true
  })
  @Type(() => CategoryDto)
  @IsOptional()
  categories?: CategoryDto[];

}
