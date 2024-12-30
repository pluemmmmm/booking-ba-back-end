import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserTypeDto {
    @IsString()
    readonly usertype: string;
}
