import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository, Connection } from 'typeorm'; 
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from './../events//entities/event.entity'
import { ConfigService } from './config-service/ConfigService';
import { COFFEE_BRANDS, COFFEE_BRANDS_ASYNC, COFFEE_BRANDS_FACTORY } from './confees.constatns';

@Injectable()
export class CoffeesService {
  
  constructor(
    @InjectRepository(Coffee) 
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly connection: Connection,
    private readonly configService: ConfigService,
    @Inject(COFFEE_BRANDS) coffeeBrands: string[], 
    @Inject(COFFEE_BRANDS_FACTORY) coffeeBrands2: string[],
    @Inject(COFFEE_BRANDS_ASYNC) coffeeBrandsFromDb: string[],
  ) {
    configService.getName();
    console.log(coffeeBrands);
    console.log(coffeeBrands2);
    console.log(coffeeBrandsFromDb);
  }

  findAll(parginationQuery: PaginationQueryDto) {
    const {limit, offset} = parginationQuery;

    return this.coffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({
      relations: ['flavors'],
      where: {
        id: +id,
      }
    });
    if(!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }

    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {

    const flavors = await Promise.all(
      createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
    );

    const coffee = await this.coffeeRepository.create({
      ...createCoffeeDto, flavors
    });

    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors = 
      updateCoffeeDto.flavors && 
      (await Promise.all(
        updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
      ));

    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);

    return this.coffeeRepository.remove(coffee);
   }

   async recommendCoffee(coffee: Coffee) {
     const queryRunner = this.connection.createQueryRunner();
     await queryRunner.connect();
     await queryRunner.startTransaction();

     try{
       coffee.recommendations++;
       
       const recommendEvent = new Event();
       recommendEvent.name = 'recommend_coffee';
       recommendEvent.type = 'coffee';
       recommendEvent.payload = { coffeeId: coffee.id};

       await queryRunner.manager.save(coffee);
       await queryRunner.manager.save(recommendEvent);

       await queryRunner.commitTransaction();
     } catch(err) {
      await queryRunner.rollbackTransaction();
     } finally {
       await queryRunner.release();
     }
   }

   private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: {
        name
      }
    });

    if(existingFlavor) {
      return existingFlavor;
    }

    return this.flavorRepository.create({name});
   }
}
