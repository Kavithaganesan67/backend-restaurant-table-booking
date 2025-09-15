import { Controller, Get, Logger } from '@nestjs/common';
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
}
