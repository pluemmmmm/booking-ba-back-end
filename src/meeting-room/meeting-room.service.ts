import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateMeetingRoomDto } from './dto/create-meeting-room.dto';
import { UpdateMeetingRoomDto } from './dto/update-meeting-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MeetingRoom } from './entities/meeting-room.entity';

@Injectable()
export class MeetingRoomService {
  constructor(
    @InjectModel('MeetingRoom') private readonly meetingRoomModel: Model<MeetingRoom>,
  ) {}

  async findAll() {
    try {
      return await this.meetingRoomModel.find().exec();
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

async addRoom(createMeetingRoomDto: CreateMeetingRoomDto) {
    try {
      const newRoom = new this.meetingRoomModel(createMeetingRoomDto);
      return await newRoom.save();
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async deleteRoom(id: string) {
    try {
      await this.meetingRoomModel.deleteOne({ _id: id }).exec();
      return { 
        message: 'Delete Room Success', 
        type: true 
      };
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }
}
