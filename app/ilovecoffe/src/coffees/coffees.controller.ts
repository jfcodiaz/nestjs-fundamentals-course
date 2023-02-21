import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { response } from 'express';

@Controller('coffees')
export class CoffeesController {
  @Get()
  fillAll() {
    return 'This action returns all coffess';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action return #${id} coffee`;
  }

  @Post()
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action update #${id} coffee`
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action remove #${id} coffee`;
  }
}
