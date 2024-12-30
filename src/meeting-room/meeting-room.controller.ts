import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MeetingRoomService } from './meeting-room.service';
import { CreateMeetingRoomDto } from './dto/create-meeting-room.dto';
import { UpdateMeetingRoomDto } from './dto/update-meeting-room.dto';

@Controller('meetingRoom')
export class MeetingRoomController {
  constructor(private readonly meetingRoomService: MeetingRoomService) {}

  @Get()
  async findAll() {
    return await this.meetingRoomService.findAll();
  }

  @Post('addRoom')
  async addRoom(@Body() createMeetingRoomDto: CreateMeetingRoomDto) {
    return await this.meetingRoomService.addRoom(createMeetingRoomDto);
  }

  @Delete('deleteRoom')
  async deleteRoom(@Query('id') id: string) {
    return await this.meetingRoomService.deleteRoom(id);
  }
}
