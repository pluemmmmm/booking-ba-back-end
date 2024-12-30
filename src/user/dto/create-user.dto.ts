import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    readonly userid: string;
    @IsString()
    readonly userpass: string;
    @IsString()
    readonly username: string;
    @IsString()
    readonly usertype: string;
}
