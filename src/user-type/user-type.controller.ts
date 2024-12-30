import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserTypeService } from './user-type.service';
import { CreateUserTypeDto } from './dto/create-user-type.dto';
import { UpdateUserTypeDto } from './dto/update-user-type.dto';

@Controller('userType')
export class UserTypeController {
  constructor(private readonly userTypeService: UserTypeService) {}
 
  @Get()
  async findAll() {
    return await this.userTypeService.findAll();
  }
}
