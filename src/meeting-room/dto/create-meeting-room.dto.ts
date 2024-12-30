import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMeetingRoomDto {
    @IsString()
    readonly meetname: string;
}
