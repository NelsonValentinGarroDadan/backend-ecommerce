import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { EntityManager, MoreThan, Repository } from 'typeorm';
import data from '../utils/data.json';
import { Categories } from 'src/categories/categories.entity';
import { CreateProductDto } from './dtos/productsCreate.dto';
@Injectable()
export class ProductsRepository{
    constructor(
        @InjectRepository(Products) private readonly productRepository: Repository<Products>,
        @InjectRepository(Categories)private readonly categoriesRepository: Repository<Categories>,
        private readonly manager: EntityManager
    ){}

    async getAllProducts(page: number , limit: number ):Promise<Products[]>{
        return await this.productRepository.find({
            skip: (page - 1) * limit,
            take: limit,
            relations: {category:true},
            where: {stock: MoreThan(0)}
        });
    }


    async getProductById(id:string):Promise<Products>{
        const productFound = await this.productRepository.findOne(
            {
                where:{
                    id , 
                    stock: MoreThan(0)},
                relations: {category:true}
            });
        if(!productFound) throw new HttpException({status:404,error:"Producto no encontrado o sin stock."},404);
        return productFound;
    }


    async getSeeder():Promise<{message:string;}>{
        let result =  {
            message: "Productos agregados con exito."
        }
        const queryRunner = this.manager.connection.createQueryRunner()
            await queryRunner.connect();
            await queryRunner.startTransaction();
        const promises = data.map(async (element) => {
            try{
            const category = await queryRunner.manager.findOne(Categories,{where:{name:element.category}});
            const productExist=await queryRunner.manager.findOne(Products,{
                where:{name:element.name}
            })
            if (!category) throw new HttpException({status:404,error:`No existe la categoria ${element.category}`},404)
            if(productExist) throw new HttpException({status:400,error:"Ya existen datos, no es necesario el seeder de productos"},400)
            const product = queryRunner.manager.create(Products,
                {
                    name : element.name,
                    description : element.description,
                    price : element.price,
                    stock : element.stock,
                    category : category,
                }
            );
            await queryRunner.manager.save(Products,product);
            await queryRunner.commitTransaction();
                
            
            }catch(error){
                await queryRunner.rollbackTransaction();
                result = error.response;
            }finally{
                await queryRunner.release();
            }
            
           
        });

        await Promise.all(promises);
        return result;
    }


    async postProduct(newProduct: CreateProductDto): Promise<Products> {
        if(await this.productRepository.findOne({where: {name: newProduct.name}}))
            throw new HttpException({status:400,error:"Este producto ya existe."},400);
        if(!await this.categoriesRepository.findOne({where: {id: newProduct.category}})) 
            throw new HttpException({status:404,error:"Categoria no encontrada."},404);
        const productCreate = this.productRepository.create({
            ...newProduct,
            category: {
                id: newProduct.category
            }
        })
        return  await this.productRepository.save(productCreate);
    }


    async putProductById(id:string, body:CreateProductDto): Promise<{message:string;}> {
        let productFound = await this.getProductById(id);
        const categoryFound =await this.categoriesRepository.findOne({where: {id:body.category}});
        if(!categoryFound) 
            throw new HttpException({status:404,error:"Categoria no encontrada."},404);

        productFound = {...productFound,...body, category: categoryFound}
        await this.productRepository.save(productFound);
        return {
            message: "Producto actualizado exitosamente."
        }
        
    }
    async deleteProductById(id: string): Promise<{message:string;}> {
        const productFound = await this.productRepository.findOne({ where: {id}});
        if(!productFound) throw new HttpException({status:404,error:"Producto no encontrado."},404);
       try{ 
            await this.productRepository.delete(id);
            return {
                message: "Producto eliminado exitosamente."
            }
        }catch{
            throw new HttpException({status:400,error:"No se puede eliminar el producto porque esta relacionado con alguna orden."},400);
        }
    }
}