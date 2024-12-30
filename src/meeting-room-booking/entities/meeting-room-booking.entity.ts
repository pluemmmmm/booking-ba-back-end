import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

Schema()
export class MeetingRoomBooking extends Document{
    @Prop({ required: true, unique: true })
  fullname: string;

  @Prop({ required: true })
  event: string;

  @Prop({ required: true })
  startdate: string;

  @Prop({ required: true })
  enddate: string;

  @Prop({ required: true })
  meetname: string;
}
