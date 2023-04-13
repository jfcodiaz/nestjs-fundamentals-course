import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import configModuleOptions from './config/config.module.options';
import { DataSourceConfig } from './config/data.source';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';

@Module({
  imports: [ 
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRoot({...DataSourceConfig}),
    CoffeesModule,
    CoffeeRatingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
