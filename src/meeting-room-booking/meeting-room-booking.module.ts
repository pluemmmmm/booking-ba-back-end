import { Module } from '@nestjs/common';
import { MeetingRoomBookingService } from './meeting-room-booking.service';
import { MeetingRoomBookingController } from './meeting-room-booking.controller';

@Module({
  controllers: [MeetingRoomBookingController],
  providers: [MeetingRoomBookingService],
})
export class MeetingRoomBookingModule {}
