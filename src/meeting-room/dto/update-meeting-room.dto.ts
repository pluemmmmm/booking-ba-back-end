import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMeetingRoomDto {
    @IsString()
    readonly meetname: string;
}
