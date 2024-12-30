import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true})
    userid: string;
    @Prop({ required: true})
    userpass: string;
    @Prop({ default: 'User'})
    flowtype: string;
    @Prop({ required: true})
    username: string;
    @Prop({ required: true})
    usertype: string;
    @Prop({default: false})
    status: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
