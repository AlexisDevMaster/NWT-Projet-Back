import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
@Exclude()
export class UserEntity {
  @ApiProperty({ name: 'id', description: 'Unique identifier in the database', example: '5763cd4dc378a38ecd387737' })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({ name: 'username', description: 'Username', example: 'Admin' })
  @Expose()
  @Type(() => String)
  username: string;

  @ApiProperty({ name: 'password', description: 'Password', example: '****' })
  @Expose()
  @Type(() => String)
  password: string;

  @ApiProperty({ name: 'verified', description: 'Is User is verified', example: '****' })
  @Expose()
  @Type(() => Boolean)
  verified: boolean;

  /**
   * Class constructor
   *
   * @param partial data to insert in object instance
   */
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
