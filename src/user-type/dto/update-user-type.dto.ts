import { IsNotEmpty, IsString } from 'class-validator';


export class UpdateUserTypeDto {
    @IsString()
    readonly usertype: string;
}
