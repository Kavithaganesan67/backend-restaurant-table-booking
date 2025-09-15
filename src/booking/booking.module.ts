import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  imports: [],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [],
})
export class BookingModule {}
