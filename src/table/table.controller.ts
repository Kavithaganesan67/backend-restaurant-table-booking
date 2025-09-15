import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { TableService } from './table.service';
import * as tableInterface from 'src/interface/table.interface';
import { ApiBody } from '@nestjs/swagger';
import { CreateTableDto } from 'src/dto/table.dto';

@Controller('tables')
export class TableController {
  private readonly logger = new Logger(TableController.name);
  constructor(private readonly tableservice: TableService) {}

  @Get()
  async getAllTables() {
    try {
      this.logger.log('Start fetching Table details...');
      const response = await this.tableservice.getTables();
      return {
        message: 'All tables data fetched successfully!.',
        data: response,
      };
    } catch (error) {
      this.logger.log('Error in fetching tables details', error);
      throw error;
    }
  }

  @Get('/:id')
  async getTableById(@Param('id') data: string) {
    try {
      const id = Number(data);
      this.logger.log('Start fetching table by id...');
      const response = await this.tableservice.getTableByid(id);
      return {
        message: 'Table by Id details fetched successfully...',
        data: response,
      };
    } catch (error) {
      this.logger.log('Error in fetching table details', error);
      throw error;
    }
  }

  @Post()
  @ApiBody({
    type: CreateTableDto,
    description: 'Payload for creating table details',
    required: true,
  })
  async createTable(@Body() payload: tableInterface.ITable) {
    try {
      const data = payload;
      this.logger.log('Creating new table...');
      const response = await this.tableservice.createTable(data);
      this.logger.log('Table Created Successfully!...');
      return {
        message: 'Table created successfully...',
        data: response,
      };
    } catch (error) {
      this.logger.log('Error in creating Table');
      throw error;
    }
  }

  @Delete('/:id')
  async deleteTable(@Param('id') data: string) {
    try {
      const id = Number(data);
      this.logger.log('Deleting the table...');
      const response = await this.tableservice.deletingTable(id);
      this.logger.log('Successfully deleted the table...');
      return {
        message: 'Table Deleted Successfully.',
        data: response,
      };
    } catch (error) {
      this.logger.log('Error in deleting the table');
      throw error;
    }
  }
}
