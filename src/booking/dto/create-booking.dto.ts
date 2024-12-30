import { IsString } from "class-validator";

export class CreateBookingDto {
    @IsString()
    readonly fullname: string;
    @IsString()
    readonly event: string;
    @IsString()
    readonly startDate: Date;
    @IsString()
    readonly endDate: Date;
    @IsString()
    readonly meetName: string;
    @IsString()
    readonly phone: string;
}
