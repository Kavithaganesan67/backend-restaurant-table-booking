import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);
  constructor(private readonly readOnlySequelize: Sequelize) {}
  async getAllBookings() {
    try {
      const response = await this.readOnlySequelize.query(
        `SELECT * FROM bookings;`,
      );
      return {
        Result: response,
        status: HttpStatus.OK,
      };
    } catch (error) {
      this.logger.log('Database Error', error);
      throw error;
    }
  }

  async getBookingByid(id: number) {
    try {
      const response = await this.readOnlySequelize.query(
        `SELECT * FROM bookings WHERE id=${id};`,
      );
      return {
        Result: response,
        status: HttpStatus.OK,
      };
    } catch (error) {
      this.logger.log('Database Error', error);
      throw error;
    }
  }
}
