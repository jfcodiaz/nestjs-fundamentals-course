import { Module } from '@nestjs/common';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { CoffeesService } from 'src/coffees/coffees.service';
import { CustomDynamicModule } from 'src/dynamic-module/dynamic-module.module';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [
    CustomDynamicModule.register('implement In Rating module :D'),
    CoffeesModule
  ],
  providers: [CoffeeRatingService]
})
export class CoffeeRatingModule {}
