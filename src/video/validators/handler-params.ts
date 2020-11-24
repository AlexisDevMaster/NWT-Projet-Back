import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class HandlerParams {
  @IsMongoId()
  @IsNotEmpty()
  id: string;

}
