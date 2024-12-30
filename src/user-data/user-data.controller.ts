import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserDataService } from './user-data.service';
import { CreateUserDataDto } from './dto/create-user-datum.dto';

@Controller('userData')
export class UserDataController {
  constructor(private readonly userDataService: UserDataService) {}

  @Get()
  async findAll() {
    return await this.userDataService.findAll();
  }

@Post('create')
async create(@Body() createUserDataDto: CreateUserDataDto) {
  return await this.userDataService.create(createUserDataDto);
}

  @Post('login') 
  async login(@Body() createUserDataDto: CreateUserDataDto) {
    return await this.userDataService.login(createUserDataDto);
  }
  
  @Get('approve')
  async approve(@Query('id') id: string) {
    return await this.userDataService.approve(id);
  }
}
