import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { CategoryEntity } from '../../category/entities/category.entity';

@Exclude()
export class VideoEntity {

  @ApiProperty({ name: 'title', description: 'Name of the category', example: 'Gaming' })
  @Expose()
  @Type(() => String)
  title: string;

  @ApiProperty({ name: 'time', description: 'Thumbnail URL', example: 'https://randomuser.me/portraits/men/55.jpg' })
  @Expose()
  @Type(() => Date)
  time: Date;

  @ApiProperty({ name: 'upload_date', description: 'Upload date of the video', example: '2020-01-01' })
  @Expose()
  @Type(() => Date)
  upload_date: Date;

  @ApiProperty({ name: 'nb_like', description: 'Number of like', example: '800' })
  @Expose()
  @Type(() => Number)
  nb_like: number;

  @ApiProperty({ name: 'nb_dislike', description: 'Number of dislike', example: '800' })
  @Expose()
  @Type(() => Number)
  nb_dislike: number;

  @ApiProperty({ name: 'author', description: 'Name of the author', example: 'Admin' })
  @Expose()
  @Type(() => String)
  author: string;

  @ApiProperty({ name: 'description', description: 'Description of the author', example: '...' })
  @Expose()
  @Type(() => String)
  description: string;

  @ApiProperty({ name: 'path', description: 'Path of the video', example: '...' })
  @Expose()
  @Type(() => String)
  path: string;

  @ApiProperty({ name: 'thumbnail_path', description: 'Thumbnail_path of the video', example: '...' })
  @Expose()
  @Type(() => String)
  thumbnail_path: string;

  @ApiProperty({ name: 'nb_view', description: 'Number of view', example: '1562' })
  @Expose()
  @Type(() => Number)
  nb_view: number;

  @ApiProperty({ name: 'url', description: 'Url of the video', example: '...' })
  @Expose()
  @Type(() => String)
  url: string;

  @ApiProperty({ name: 'categories', description: 'Categories' })
  @Expose()
  @Type(() => CategoryEntity)
  categories: CategoryEntity[];

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<VideoEntity>) {
    Object.assign(this, partial);
  }
}
