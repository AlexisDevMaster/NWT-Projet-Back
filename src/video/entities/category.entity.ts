import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CategoryEntity {

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
