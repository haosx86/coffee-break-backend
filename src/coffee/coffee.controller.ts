import { Controller, Get, Param, ValidationPipe } from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { CoffeeDto } from './dto/coffee.dto';

@Controller('coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Get()
  async getFirst() {
    return this.coffeeService.getCoffee();
  }

  @Get('like/:id')
  getAllCoffee() {
    return this.coffeeService.incrementCoffeeLikes();
  }

  @Get('after/:id')
  async findOneAfter(
    @Param(new ValidationPipe({ whitelist: true })) { id }: CoffeeDto,
  ) {
    return this.coffeeService.getCoffee(id);
  }
}
