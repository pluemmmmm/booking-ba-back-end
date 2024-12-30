import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    readonly userid: string;
    @IsString()
    readonly userpass: string;
    @IsString()
    readonly flowtype: string;
    @IsString()
    readonly username: string;
    @IsString()
    readonly usertype: string;
}
