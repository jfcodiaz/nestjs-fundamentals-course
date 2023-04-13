import { Inject, Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { ConfigService } from './config-service/ConfigService';
import { DevelopmentConfigService } from './config-service/DevelopmentConfigService';
import { ProductionCofigService } from './config-service/ProductionCofigService';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { COFFEE_BRANDS, COFFEE_BRANDS_ASYNC, COFFEE_BRANDS_FACTORY} from './confees.constatns';
import { EntityManager } from 'typeorm';

@Injectable()
export class CoffeeBrandFactory {
  create() {
    /** do somethig */
    return ['buddy brew result', 'nescafe result']
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeesController],
  providers: [
    CoffeesService, 
    CoffeeBrandFactory,
    {
      provide:  COFFEE_BRANDS, 
      useFactory: () => ['buddy brew', 'nescafe']
    }, {
      provide:  COFFEE_BRANDS_ASYNC, 
      useFactory: async (entityManager: EntityManager): Promise<string[]> => {
        const coffeBrands = await entityManager.connection.query(`
          SELECT brand FROM coffee
          ORDER BY id ASC
        `);

        return coffeBrands;
      },
      inject: [EntityManager]
    },
    {
      provide: COFFEE_BRANDS_FACTORY,
      useFactory: (coffeeBrandFactory: CoffeeBrandFactory) => coffeeBrandFactory.create(),
      inject: [CoffeeBrandFactory]
    }, 
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
