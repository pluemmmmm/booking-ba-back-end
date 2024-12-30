import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

@Get()
  async findAll(@Query('fullname') fullname: string){
    return await this.bookingService.findAll(fullname);
  }

  @Get('findAll')
  async findAllBooking(@Query('fullname') fullname: string){
    return await this.bookingService.findAllBooking(fullname);
  }


  @Get('findUserName')
  async findUserName(@Query('fullname') fullname: string){
    return await this.bookingService.findUserName(fullname);
  }

  @Post('addBooking')
  async addBooking(@Body() createBookingDto: CreateBookingDto) {
    return await this.bookingService.addBooking(createBookingDto);
  }

  @Get('approveBooking')
  async approve(@Query('id') id: string) {
    return await this.bookingService.approveBooking(id);
  }

  @Delete('delete')
  async delete(@Query('id') id: string) {
    return await this.bookingService.delete(id);
  }
  
  @Patch('update')
  async update(@Query('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return await this.bookingService.update(id, updateBookingDto);
  }

  @Get('countBookingOfMonths')
  async countBookingOfMonths() {
    return await this.bookingService.countBookingOfMonths();
  }

  @Get('counttodayBookings')
  async countTodayBookings() {
    return await this.bookingService.countTodayBookings();
  }

  @Get('countTodayWaiting')
  async countTodayWaiting() {
    return await this.bookingService.countTodayWaiting();
  }

  @Get('roomBookingCountByMonth')
  async roomBookingCountByMonth() {
    return await this.bookingService.roomBookingCountByMonth();
  }

  @Get('dailyBookingCount')
  async getDailyBookingCount() {
    return await this.bookingService.getDailyBookingCount();
  }
}
