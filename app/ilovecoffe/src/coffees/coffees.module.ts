import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { ConfigService } from './config-service/ConfigService';
import { DevelopmentConfigService } from './config-service/DevelopmentConfigService';
import { ProductionCofigService } from './config-service/ProductionCofigService';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [CoffeesService,
    {
      provide: ConfigService,
      useClass: process.env.NODE_ENV === 'dev' 
      ? DevelopmentConfigService
      : ProductionCofigService
    }
  ], 
  exports: [CoffeesService]
})

export class CoffeesModule {}
