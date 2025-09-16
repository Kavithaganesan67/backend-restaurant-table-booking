import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { getallRestaurants } from './restaurant.query';

@Injectable()
export class RestaurantService {
  private readonly logger = new Logger(RestaurantService.name);
  constructor(private readonly readOnlySequelize: Sequelize) {}

  async getAllRestaurant() {
    try {
      const query = getallRestaurants();
      const response = await this.readOnlySequelize.query(query);
      return {
        Result: response,
        status: HttpStatus.OK,
      };
    } catch (error) {
      this.logger.log('Database Error', error);
      throw error;
    }
  }

  async getRestaurantByid(id: number) {
    try {
      const response = await this.readOnlySequelize.query(
        `SELECT * FROM restaurants WHERE id=${id};`,
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
