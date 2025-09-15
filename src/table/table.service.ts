import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { QueryTypes } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { ITable } from 'src/interface/table.interface';

@Injectable()
export class TableService {
  private readonly logger = new Logger(TableService.name);
  constructor(private readonly readOnlySequelize: Sequelize) {}

  async getTables() {
    try {
      const response = await this.readOnlySequelize.query(
        `SELECT * FROM tables;`,
      );
      return {
        Result: response,
        status: HttpStatus.OK,
      };
    } catch (error) {
      this.logger.log('Database Error.', error);
      throw error;
    }
  }

  async getTableByid(id: number) {
    try {
      const response = await this.readOnlySequelize.query(
        `SELECT * FROM tables where id= ${id}`,
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

  async createTable(data: ITable) {
    try {
      const response = await this.readOnlySequelize.query(
        `
      INSERT INTO tables (description, restaurant_id, table_number, table_type_id)
      VALUES (:description, :restaurant_id, :table_number, :table_type_id)
      RETURNING *;
      `,
        {
          replacements: {
            description: data.description,
            restaurant_id: data.restaurant_id,
            table_number: data.table_number,
            table_type_id: data.table_type_id,
          },
          type: QueryTypes.INSERT,
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

  async deletingTable(id: number) {
    try {
      const response = await this.readOnlySequelize.query(
        `DELETE  from tables WHERE id=${id}`,
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
