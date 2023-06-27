import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CoffeeRequestDto {
  @ApiProperty({
    description: 'ID of a coffee record',
    example: '649ac68445e1d13178545c9a',
  })
  @IsMongoId({ message: 'id is invalid' })
  id: string;
}
