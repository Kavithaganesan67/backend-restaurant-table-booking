import { Controller, Get, Logger, Param } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  private readonly logger = new Logger(BookingController.name);
  constructor(private readonly bookingService: BookingService) {}

  @Get()
  async getAllBookings() {
    this.logger.log('Start fetching Booking details...');
    try {
      const response = await this.bookingService.getAllBookings();
      this.logger.log('Successfully fetched Booking details...');
      return {
        message: 'Successfully fetched Booking details.',
        data: response,
      };
    } catch (error) {
      this.logger.log('Error in fetching booking details...', error);
      throw error;
    }
  }

  @Get('/:id')
  async getBookingById(@Param('id') data: string) {
    this.logger.log('Start fetching booking detail by id...');
    try {
      const id = Number(data);
      const response = await this.bookingService.getBookingByid(id);
      this.logger.log('Successfully fetched booked detail by Id...');
      return {
        message: 'Successfully fetched booked detail by Id',
        data: response,
      };
    } catch (error) {
      this.logger.log('Error in fetching booked detail By id...');
      throw error;
    }
  }
}
