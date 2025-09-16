import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InjectConnection } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseModule } from './database/database.module';
import { TableModule } from './table/table.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { BookingModule } from './booking/booking.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TableModule,
    RestaurantModule,
    BookingModule,
    AuthModule,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(@InjectConnection() private readonly sequelize: Sequelize) {}

  async onModuleInit() {
    try {
      await this.sequelize.authenticate();
      console.log('✅ Database connected successfully!');
    } catch (error) {
      console.error('❌ Failed to connect to the database:', error);
    }
  }
}
