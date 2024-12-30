import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class MeetingRoom extends Document {
  @Prop({ required: true, unique: true })
  meetname: string;
}

export const MeetingRoomSchema = SchemaFactory.createForClass(MeetingRoom);
