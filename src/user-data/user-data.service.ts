import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDataDto } from './dto/create-user-datum.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserData } from './entities/user-data.entity';

@Injectable()
export class UserDataService {
  constructor(
    @InjectModel('UserData') private readonly userDataModel: Model<UserData>,
  ) {}
  async create(createUserDataDto: CreateUserDataDto) {
    try {
      const user = new this.userDataModel({
        userid: createUserDataDto.userid,
        userpass: createUserDataDto.userpass,
        flowtype: createUserDataDto.flowtype,
        username: createUserDataDto.username,
        usertype: createUserDataDto.usertype,
      });
     await user.save();
     return { message: 'User created successfully', type: true };
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async findAll() {
    try {
      return await this.userDataModel.find().exec();
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }
  async login(data: CreateUserDataDto) {
    try {
      let response;

      const user = await this.userDataModel.findOne({ userid: data.userid, userpass: data.userpass }).exec();
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
      const findOne = await this.userDataModel.findOne({ _id: id })
      if (!findOne) {
        return { message: 'User not found', type: false };
      }
      findOne.status = true;
      await findOne.save();
      return { 
        message: 'Approve successfully',
        type: true 
      };
    } catch (error) {
      console.log('Error', error);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

}
