import { DynamicModule, Inject, Injectable } from '@nestjs/common';
import { CoffeesService } from 'src/coffees/coffees.service';
import { ModuleMsj } from 'src/dynamic-module/dynamic-module.module';

@Injectable()
export class CoffeeRatingService {
  constructor(
    private readonly coffeesService: CoffeesService,
    private readonly moduleMsj: ModuleMsj
    ) {
      moduleMsj.sayMensage('Coffee');
  }
}
