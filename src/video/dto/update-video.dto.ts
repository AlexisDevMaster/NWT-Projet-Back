import {
  IsDate, IsInstance, IsInt,
  IsNotEmpty, IsNumber,
  IsOptional,
  IsString, ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PersonAddressDto } from '../../people/dto/person-address.dto';
import { Type } from 'class-transformer';

export class UpdateVideoDto {
  @ApiProperty({ name: 'title', description: 'Name of the category', example: 'Gaming' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ name: 'time', description: 'Thumbnail URL', example: 'https://randomuser.me/portraits/men/55.jpg' })
  @IsDate()
  @IsNotEmpty()
  time: Date;

  @ApiProperty({ name: 'upload_date', description: 'Upload date of the video', example: '2020-01-01' })
  @IsDate()
  @IsNotEmpty()
  upload_date: Date;

  @ApiProperty({ name: 'nb_like', description: 'Number of like', example: '800' })
  @IsNumber()
  @IsNotEmpty()
  nb_like: number;

  @ApiProperty({ name: 'nb_dislike', description: 'Number of dislike', example: '800' })
  @IsNumber()
  @IsNotEmpty()
  nb_dislike: number;

  @ApiProperty({ name: 'author', description: 'Name of the author', example: 'Admin' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ name: 'description', description: 'Description of the author', example: '...' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({ name: 'path', description: 'Path of the video', example: '...' })
  @IsString()
  @IsNotEmpty()
  path: string;

  @ApiProperty({ name: 'thumbnail_path', description: 'Thumbnail_path of the video', example: '...' })
  @IsString()
  @IsNotEmpty()
  thumbnail_path: string;

  @ApiProperty({ name: 'nb_view', description: 'Number of view', example: '1562' })
  @IsNumber()
  @IsNotEmpty()
  nb_view: number;

  @ApiProperty({ name: 'url', description: 'Url of the video', example: '...' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ name: 'categories', description: 'Categories' })
  @IsInstance(PersonAddressDto)
  @ValidateNested()
  @Type(() => PersonAddressDto)
  categories: PersonAddressDto[];

}
