import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDataModule } from './user-data/user-data.module';
import { MeetingRoomBookingModule } from './meeting-room-booking/meeting-room-booking.module';
import { MeetingRoomModule } from './meeting-room/meeting-room.module';
import { UserTypeModule } from './user-type/user-type.module';
import { BookingModule } from './booking/booking.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://pluemmmmmmmmmm:084map340@cluster0.0p57u4f.mongodb.net/booking?retryWrites=true&w=majority',
    ),
    UserDataModule,
    MeetingRoomBookingModule,
    MeetingRoomModule,
    UserTypeModule,
    BookingModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
