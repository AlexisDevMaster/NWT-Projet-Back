import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CategoryEntity {

  @ApiProperty({ name: 'id', description: 'Unique identifier in the database', example: '5763cd4dc378a38ecd387737' })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({ name: 'title', description: 'Title of the category', example: 'Gaming' })
  @Expose()
  @Type(() => String)
  title: string;

  @ApiProperty({ name: 'thumbnail', description: 'Thumbnail URL', example: 'https://randomuser.me/portraits/men/55.jpg' })
  @Expose()
  @Type(() => String)
  thumbnail: string;

  @ApiProperty({ name: 'url', description: 'URL of the category', example: 'gaming' })
  @Expose()
  @Type(() => String)
  url: string;

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<CategoryEntity>) {
    Object.assign(this, partial);
  }
}
