import { Controller, Get, Logger, Param } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller('restaurants')
export class RestaurantController {
  private readonly logger = new Logger(RestaurantController.name);
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  async getAllRestaurants() {
    try {
      this.logger.log('Start fetching restaurant details...');
      const response = await this.restaurantService.getAllRestaurant();
      this.logger.log('All restaurant details fetched successfully.');
      return {
        message: 'All restaurant details fetched successfully.',
        data: response,
      };
    } catch (error) {
      this.logger.log('Error in fetching retaurant details...');
      throw error;
    }
  }

  @Get('/:id')
  async getRestaurantById(@Param('id') data: string) {
    const id = Number(data);
    try {
      this.logger.log('Start fetching Restaurant By id...');
      const response = await this.restaurantService.getRestaurantByid(id);
      this.logger.log('Successfully fetched Restaurant by id...');
      return {
        message: 'Restaurant by id is fetched successfully.',
        data: response,
      };
    } catch (error) {
      this.logger.log('Error in fetching restaurant by id', error);
      throw error;
    }
  }
}
