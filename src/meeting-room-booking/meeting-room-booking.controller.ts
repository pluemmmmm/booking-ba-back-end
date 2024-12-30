import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MeetingRoomBookingService } from './meeting-room-booking.service';
import { CreateMeetingRoomBookingDto } from './dto/create-meeting-room-booking.dto';
import { UpdateMeetingRoomBookingDto } from './dto/update-meeting-room-booking.dto';

@Controller('meeting-room-booking')
export class MeetingRoomBookingController {
  constructor(private readonly meetingRoomBookingService: MeetingRoomBookingService) {}

  @Post()
  create(@Body() createMeetingRoomBookingDto: CreateMeetingRoomBookingDto) {
    return this.meetingRoomBookingService.create(createMeetingRoomBookingDto);
  }

  @Get()
  findAll() {
    return this.meetingRoomBookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.meetingRoomBookingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMeetingRoomBookingDto: UpdateMeetingRoomBookingDto) {
    return this.meetingRoomBookingService.update(+id, updateMeetingRoomBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.meetingRoomBookingService.remove(+id);
  }
}
