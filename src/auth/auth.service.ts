import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AuthService {
  private readonly logger = new Logger();
  constructor(private readonly readOnlySequelize: Sequelize) {}

  async getUser(username: string, password: string) {
    try {
      const response = await this.readOnlySequelize.query(
        `SELECT * FROM users WHERE email = :username AND password_hash = :password`,
        {
          replacements: { username, password },
          type: QueryTypes.SELECT,
        },
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
