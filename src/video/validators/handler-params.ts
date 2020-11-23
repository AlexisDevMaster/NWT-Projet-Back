import { IsMongoId, IsNotEmpty } from 'class-validator';

export class HandlerParams {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsMongoId()
  @IsNotEmpty()
  url: string;
}
