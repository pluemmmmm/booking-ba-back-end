import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel('Booking') private readonly bookingModel: Model<Booking>,
  ) {}

  async findAll(fullname: string) {
    try {
      const today = new Date(); 
      today.setHours(0, 0, 0, 0);
      let query = {};
      if (fullname === 'Admin') {
        query = {}; 
      } else {
        query = { fullname: fullname }; 
      }
      return await this.bookingModel
        .find({ ...query, startDate: { $gte: today } })
        .exec();
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async findAllBooking(fullname: string) {
    try {
      const today = new Date(); 
      today.setHours(0, 0, 0, 0); 
  
      let query = {};
  
      if (fullname === fullname) {
        query = {};
      } else {
        query = { fullname: fullname }; 
      }
      query['status'] = true;
      return await this.bookingModel
        .find({ ...query, startDate: { $gte: today } })
        .sort({ _id: -1 })
        .exec();
    } catch (err) {
      console.log('Error: ', err);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }
  

async findUserName(fullname: string) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    return await this.bookingModel
      .find({ fullname: fullname, startDate: { $gte: today } })
      .sort({ _id: -1 })
      .exec();
  } catch (err) {
    console.log('Error: ', err);
    throw new InternalServerErrorException({ message: 'Error', type: false });
  }
}

  async addBooking(createBookingDto: CreateBookingDto) {
    try {
      const startDate = createBookingDto.startDate;
      const endDate = createBookingDto.endDate;
      const meetName = createBookingDto.meetName;

      // ตรวจสอบว่ามีการจองอยู่ในช่วงเวลาที่ต้องการจองหรือไม่
      const existingBooking = await this.bookingModel.findOne({
        $or: [
          {
            startDate: { $gte: startDate, $lt: endDate }
          },
          {
            endDate: { $gt: startDate, $lte: endDate }
          },
          {
            startDate: { $lte: startDate },
            endDate: { $gte: endDate }
          },
        ],
        meetName: meetName
      });

      if (existingBooking) {
        return 'Booking already exists for this time range and meetName.';
      }

      const newBooking = new this.bookingModel({
        fullname: createBookingDto.fullname,
        event: createBookingDto.event,
        startDate: createBookingDto.startDate,
        endDate: createBookingDto.endDate,
        meetName: createBookingDto.meetName,
        phone: createBookingDto.phone
      });

      await newBooking.save();
      return { 
        message: 'Booking added successfully',
        type: true 
      };
    } catch (error) { 
      console.log('Error', error);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async approveBooking(id : string) {
    try {
      const findOne = await this.bookingModel.findOne({ _id: id })
      if (!findOne) {
        return { message: 'Booking not found', type: false };
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

  async delete(id : string) {
    try {
      await this.bookingModel.deleteOne({ _id: id }).exec();
      return { 
        message: 'Booking deleted successfully',
        type: true 
      };
    } catch (error) { 
      console.log('Error', error);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    try {
      await this.bookingModel.updateOne
        ({
          _id: id
        },
        {
          $set: updateBookingDto
        }).exec();
      return {
        message: 'Booking updated successfully',
        type: true
      };
    } catch (error) {
      console.log('Error', error);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async countBookingOfMonths() {
    try {
      const today = new Date();
      const year = today.getFullYear();
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const bookingCountByMonth = {};
  
      for (let i = 0; i < 12; i++) {
        const firstDay = new Date(year, i, 1);
        const lastDay = new Date(year, i + 1, 0);
        const result = await this.bookingModel.find({
          status: true,
          startDate: {
            $gte: firstDay,
            $lte: lastDay
          }
        }).exec();
        bookingCountByMonth[months[i]] = result.length;
      }
  
      return bookingCountByMonth;
    } catch (error) {
      console.log('Error', error);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async countTodayBookings() {
    try {
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

      const bookings = await this.bookingModel.find({
        startDate: { $gte: startOfDay, $lte: endOfDay },
        status: true
      }).select('fullname meetName');

      return {
        count: bookings.length,
        bookings: bookings.map(booking => ({
          fullname: booking.fullname,
          meetName: booking.meetName
        }))
      };
    } catch (error) {
      console.log('Error', error);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }

  async countTodayWaiting() {
    try {
      const today = new Date();
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
      const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

      const bookings = await this.bookingModel.find({
        startDate: { $gte: startOfDay, $lte: endOfDay },
        status: false
      }).select('fullname meetName');

      return {
        count: bookings.length,
        bookings: bookings.map(booking => ({
          fullname: booking.fullname,
          meetName: booking.meetName
        }))
      };
    } catch (error) {
      console.log('Error', error);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }
  
  async roomBookingCountByMonth() {
    try {
      const today = new Date();
      const year = today.getFullYear();
      const roomBookingsCount = await this.bookingModel.aggregate([
        { $match: { startDate: { $gte: new Date(year, 0, 1), $lte: new Date(year, 11, 31) } } },
        { $group: { _id: '$meetName', count: { $sum: 1 } } }
      ]);
      const roomBookings = roomBookingsCount.map(item => ({
        room: item._id,
        count: item.count
      }));

      return roomBookings;
    } catch (error) {
      console.log('Error', error);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }
  
  async getDailyBookingCount() {
    try {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const dayInMonth = new Date(year, month + 1, 0).getDate(); // จำนวนวันในเดือนปัจจุบัน
      const dailyBookingCount = {};
  
      for (let i = 1; i <= dayInMonth; i++) {
        const startDate = new Date(year, month, i);
        const endDate = new Date(year, month, i, 23, 59, 59);
        const result = await this.bookingModel.find({
          startDate: {
            $gte: startDate,
            $lte: endDate
          }
        }).exec();
        dailyBookingCount[`Day ${i}`] = result.length;
      }
  
      return dailyBookingCount;
    } catch (error) {
      console.log('Error', error);
      throw new InternalServerErrorException({ message: 'Error', type: false });
    }
  }
}
