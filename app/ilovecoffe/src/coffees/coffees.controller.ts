import { Controller, Get } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  fillAll() {
    return 'This action returns all coffess'
  }
}
