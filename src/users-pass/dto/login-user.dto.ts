import { Exclude } from 'class-transformer';

@Exclude()
export class LoginUserDto {
     username: string;
     password: string;
}
