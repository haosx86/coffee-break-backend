import { Controller, Get, Patch, Param, ValidationPipe } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CoffeeRequestDto } from './dto/coffeeRequest.dto';
import { ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { CoffeeResponse } from './dto/coffeeResponse.dto';

@Controller('coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch the first coffee record' })
  @ApiOkResponse({
    type: CoffeeResponse,
  })
  async getFirst() {
    return this.coffeeService.getCoffee();
  }

  @Patch('like/:id')
  @ApiOperation({ summary: 'Increment like counter of the coffee record' })
  @ApiOkResponse({
    type: CoffeeResponse,
  })
  getAllCoffee(
    @Param(new ValidationPipe({ whitelist: true })) { id }: CoffeeRequestDto,
  ) {
    return this.coffeeService.incrementCoffeeLikes(id);
  }

  @Get('after/:id')
  @ApiOperation({
    summary:
      'Fetch the coffee record following the record with the provided ID',
  })
  @ApiOkResponse({
    type: CoffeeResponse,
  })
  async findOneAfter(
    @Param(new ValidationPipe({ whitelist: true })) { id }: CoffeeRequestDto,
  ) {
    return this.coffeeService.getCoffee(id);
  }
}
