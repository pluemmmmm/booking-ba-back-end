import { Injectable } from '@nestjs/common';
import { CreateMeetingRoomBookingDto } from './dto/create-meeting-room-booking.dto';
import { UpdateMeetingRoomBookingDto } from './dto/update-meeting-room-booking.dto';

@Injectable()
export class MeetingRoomBookingService {
  create(createMeetingRoomBookingDto: CreateMeetingRoomBookingDto) {
    return 'This action adds a new meetingRoomBooking';
  }

  findAll() {
    return `This action returns all meetingRoomBooking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meetingRoomBooking`;
  }

  update(id: number, updateMeetingRoomBookingDto: UpdateMeetingRoomBookingDto) {
    return `This action updates a #${id} meetingRoomBooking`;
  }

  remove(id: number) {
    return `This action removes a #${id} meetingRoomBooking`;
  }
}
