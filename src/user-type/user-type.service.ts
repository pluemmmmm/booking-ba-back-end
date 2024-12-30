import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserTypeDto } from './dto/create-user-type.dto';
import { UpdateUserTypeDto } from './dto/update-user-type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserType } from './entities/user-type.entity';

@Injectable()
export class UserTypeService {
  constructor(
    @InjectModel('UserType') private readonly userTypeModel: Model<UserType>,
  ) {}
  async findAll() {
    try {
      return await this.userTypeModel.find().exec();
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }
}
