import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsString()
    readonly userid: string;
    @IsString()
    readonly userpass: string;
}