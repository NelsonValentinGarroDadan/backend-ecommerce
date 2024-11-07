import { Inject, Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Products } from './products.entity';
import { CreateProductDto } from './dtos/productsCreate.dto';

@Injectable()
export class ProductsService{
    constructor(@Inject() private productRepository: ProductsRepository){}

    getAllProducts(page:number,limit:number):Promise<Products[]>{
        return this.productRepository.getAllProducts(page,limit);
    }


    getSeeder(): Promise<{message:string;}> {
       return this.productRepository.getSeeder();
     
    }


    getProductById(id:string):Promise<Products>{
        return this.productRepository.getProductById(id);
    }


    postProduct(newProduct : CreateProductDto): Promise<Products>{
        return this.productRepository.postProduct(newProduct);
    }


    putProductById(id:string ,body: CreateProductDto): Promise<{message:string;}>{
        return this.productRepository.putProductById(id,body);
    }


    deleteProductById(id: string): Promise<{message:string;}> {
        return  this.productRepository.deleteProductById(id);
    }
}