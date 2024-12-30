import { IsString } from 'class-validator';

export class UpdateBookingDto {
    @IsString()
    readonly event: string;
    @IsString()
    readonly phone: string;
}
