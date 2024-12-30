import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Booking extends Document {
    @Prop({ required: true })
    fullname: string;

    @Prop({ required: true })
    event: string;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ required: true })
    meetName: string;

    @Prop({default: false})
    status: boolean;

    @Prop({ required: true })
    phone: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
