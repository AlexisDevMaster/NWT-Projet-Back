import { IsMongoId, IsNotEmpty } from 'class-validator';

export class HandlerParamsUsername {
  @IsNotEmpty()
  username: string;

}
