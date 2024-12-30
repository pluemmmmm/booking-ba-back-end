import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}
  
  async findAll() {
    try {
      return await this.userModel.find().where(
        { status: false }
      ).exec();
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const user = new this.userModel({
        userid: createUserDto.userid,
        userpass: createUserDto.userpass,
        username: createUserDto.username,
        usertype: createUserDto.usertype,
      });
     await user.save();
     return { message: 'User created successfully', type: true };
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async login(data: LoginDto) {
    try {
      let response;

      const user = await this.userModel.findOne({ userid: data.userid, userpass: data.userpass }).exec();
      if (user) {
        response = {
          userData: user,
          message: 'Login Success',
          status: true,
        };
      } else {
        response = {
          message: 'Invalid Credentials',
          status: false,
        };
      }
      return response;
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }
  
  async approve(id : string) {
    try {
      const findOne = await this.userModel.findOne({ _id: id })
      if (!findOne) {
        return { message: 'User not found', type: false };
      } 
      findOne.status = true;
      await findOne.save();
      return { 
        message: 'Approve successfully',
        type: true 
      };
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async delete(id : string) {
    try {
      await this.userModel.deleteOne({ _id: id
      }).exec();
      return { 
        message: 'User deleted successfully',
        type: true 
      };
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }
}
