import { IsNotEmpty } from 'class-validator';

export class HandlerParamsUrl {
  @IsNotEmpty()
  url: string;
}
