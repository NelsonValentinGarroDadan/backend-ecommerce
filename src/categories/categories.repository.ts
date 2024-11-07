import {  HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Categories } from './categories.entity';
import { CreateCategoriesDto } from './dtos/createCategories.dto';
import  data from '../utils/data.json';
@Injectable()
export class CategoriesRepository{
    constructor(
        @InjectRepository(Categories) private readonly categoriesRepository: Repository<Categories>,
        private readonly manager: EntityManager
    ){}


    async getAllCategories():Promise<Categories[]>{
        return await this.categoriesRepository.find();
    }


    async getSeeder():Promise<{message:string;}>{
        const categories= Array.from(new Set(data.map(item => item.category)));
        const queryRunner = this.manager.connection.createQueryRunner()
        await queryRunner.connect();
        await queryRunner.startTransaction();
        
        const promises = categories.map(async (element) => {
            try{
                const newCategorie = this.manager.create(Categories,{name:element})
                await queryRunner.manager.save(Categories,newCategorie);
                await queryRunner.commitTransaction();
            }catch{
                await queryRunner.rollbackTransaction();
                throw new HttpException({status:400,error:"Ya existen datos, no es necesario el seeder de categories"},400)
            }finally{
                await queryRunner.release();
            }
        });
        await Promise.all(promises);
        return {
            message: "Categorias agregadas con exito."
        }
    }

    
    async postCategories(categorie: CreateCategoriesDto): Promise<{message:string;}>{
        if(await this.categoriesRepository.findOne({where: {name:categorie.name}}))
            throw new HttpException({status:400,error:`${categorie.name} ya existe.`},400)
        await this.categoriesRepository.save(categorie);  
        return {message: "Categoria agregada con exito."}
    }
}