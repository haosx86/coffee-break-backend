import { IsMongoId } from 'class-validator';

export class CoffeeDto {
  @IsMongoId({ message: 'id is invalid' })
  id: string;
}
