import { Exclude } from 'class-transformer';

@Exclude()
export class CreateUserDto {
    readonly username: string;
    readonly password: string;
}
