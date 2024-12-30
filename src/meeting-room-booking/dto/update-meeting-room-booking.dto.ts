import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMeetingRoomBookingDto {
    @IsString()
    readonly fullname: string;
    @IsString()
    readonly event: string;
    @IsString()
    readonly startdate: string;
    @IsString()
    readonly enddate: string;
    @IsString()
    readonly meetname: string;
}
