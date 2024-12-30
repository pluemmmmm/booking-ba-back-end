import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class UserType extends Document {
    @Prop({ required: true})
    usertype: string;
}

export const UserTypeSchema = SchemaFactory.createForClass(UserType);
