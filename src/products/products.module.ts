import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { Categories } from '../categories/categories.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Products,Categories])],
    providers: [ProductsService,ProductsRepository], 
    controllers: [ProductsController],
    exports: [TypeOrmModule],
})
export class ProductsModule{}
