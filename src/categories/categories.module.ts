import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './categories.entity';
import { CategoriesRepository } from './categories.repository';

@Module({
    imports:[TypeOrmModule.forFeature([Categories])],
    controllers: [CategoriesController],
    providers: [CategoriesService,CategoriesRepository],
    exports: [TypeOrmModule],
})
export class CategoriesModule {}
