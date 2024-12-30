import { Module } from '@nestjs/common';
import { MeetingRoomService } from './meeting-room.service';
import { MeetingRoomController } from './meeting-room.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetingRoom, MeetingRoomSchema } from './entities/meeting-room.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: 'MeetingRoom', schema: MeetingRoomSchema }]),
  ],
  controllers: [MeetingRoomController],
  providers: [MeetingRoomService],
  exports: [MeetingRoomService],
})
export class MeetingRoomModule {}
