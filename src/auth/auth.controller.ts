import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { UserDto } from 'src/dto/table.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger();
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({
    type: UserDto,
    description: 'Payload for get User details',
    required: true,
  })
  async getUserDetails(@Body() payload: UserDto) {
    try {
      this.logger.log('Start fetching User details...');
      const response = await this.authService.getUser(
        payload.email,
        payload.password,
      );
      this.logger.log('User data fetched successfully...');
      return {
        message: 'Successfully Logged In',
        data: response,
      };
    } catch (error) {
      this.logger.log('Error in fetching your details', error);
      throw error;
    }
  }
}
