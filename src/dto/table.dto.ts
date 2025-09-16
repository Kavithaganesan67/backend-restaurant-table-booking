import { ApiProperty } from '@nestjs/swagger';

export class CreateTableDto {
  @ApiProperty({ example: 1, description: 'ID of the restaurant' })
  restaurant_id: number;

  @ApiProperty({
    example: 2,
    description: 'ID of the table type (e.g., VIP, Regular)',
  })
  table_type_id: number;

  @ApiProperty({ example: 'T-101', description: 'Unique table number or code' })
  table_number: string;

  @ApiProperty({
    example: 'Window-side 4-seater table',
    description: 'Additional description of the table',
  })
  description: string;
}

export class UserDto {
  @ApiProperty({ example: 'email', description: 'email of the user' })
  email: string;

  @ApiProperty({ example: 'password', description: 'Password of the user' })
  password: string;
}
