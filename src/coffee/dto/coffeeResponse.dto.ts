import { Coffee } from '../schemas/coffee.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CoffeeResponse extends Coffee {
  @ApiProperty({ example: '649ac66b45e0d13178545c8b' })
  _id: string;
}
