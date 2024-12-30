import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

Schema()
export class UserData extends Document {
  @Prop({ required: true, unique: true,  })
  userid: string;
  
  @Prop({required: true}) // ตั้งค่า unique เป็น false เพื่อให้ข้อมูลซ้ำกันได้
  userpass: string;

  @Prop({required: true}) // ตั้งค่า unique เป็น false เพื่อให้ข้อมูลซ้ำกันได้
  username: string;

  @Prop({required: true}) // ตั้งค่า unique เป็น false เพื่อให้ข้อมูลซ้ำกันได้
  usertype: string;

  @Prop({required: true}) // ตั้งค่า unique เป็น false เพื่อให้ข้อมูลซ้ำกันได้
  flowtype: string;

  @Prop({required: true,default: false}) // ตั้งค่า unique เป็น false เพื่อให้ข้อมูลซ้ำกันได้
  status: boolean;
}

export const UserDataSchema = SchemaFactory.createForClass(UserData);
