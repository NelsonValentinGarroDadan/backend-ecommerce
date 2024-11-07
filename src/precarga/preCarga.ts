import { Injectable, OnModuleInit } from "@nestjs/common";
import data from '../utils/data.json';
import { Categories } from "../categories/categories.entity";
import { EntityManager} from "typeorm";
import { Products } from "../products/products.entity";
import { InjectEntityManager } from "@nestjs/typeorm";


@Injectable()
export class PreCarga implements OnModuleInit {

    categories: Array<string>;
    products: Array<string>;

    constructor( @InjectEntityManager() private readonly manager: EntityManager) {
        this.categories = Array.from(new Set(data.map(item => item.category)));
        this.products = Array.from(new Set(data.map(item => item.name)));
    }
    async onModuleInit() {
        await this.loadData();

    }

    private async loadData() {
        const queryRunner = this.manager.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await this.resetProducts(queryRunner.manager);
            await this.resetCategories(queryRunner.manager);
            await this.addCategories(queryRunner.manager); 
            await this.addProducts(queryRunner.manager);    
            await queryRunner.commitTransaction();

        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error("Error en la pregarga de datos:", error);
        } finally {
            await queryRunner.release();
        }
    }

    private async resetCategories(manager: EntityManager){
        console.log("Reseteando categorias...")
        const promise=this.categories.map(async(element)=>{
            const categoryExist= await manager.findOne(Categories,{
                where:{name:element},
                relations:{products:true}
            })
            if(categoryExist){
                if (categoryExist.products.length===0) {
                    await manager.delete(Categories,categoryExist.id)
            }else {
                console.log(`La categoria ${element}, esta asociada a uno o mas productos, no se puede eliminar `)
            }  
            }
  
        });

        await Promise.all(promise);
    }; 

    private async addCategories(manager:EntityManager) {
        let categoriesAdded = 0; 
        const promises = this.categories.map(async (element) => {
            const categoryExist=await manager.findOne(Categories,{where:{name:element}})

            if (!categoryExist) {

                await manager
                    .createQueryBuilder()
                    .insert()
                    .into(Categories)
                    .values({ name: element})
                    .orIgnore() 
                    .execute();
                categoriesAdded++; 
            }
        });

        await Promise.all(promises);
        if(categoriesAdded>0){
            console.log("Categorias agregadas con exito")
        }; 
    }

    private async resetProducts(manager:EntityManager){
        console.log("Reseteando productos...")
        const promise= this.products.map(async(element)=>{
            const productExist= await manager.findOne(Products,{
                where:{name:element},
                relations:{orderDetails:true}
            })
                if(productExist){
                    if (productExist.orderDetails.length===0) {
        
                        await manager.delete(Products,productExist.id)
                        
                    }else{
                        console.log(`El producto  ${element}, esta asociado a una o mas ordenes, no se puede eliminar `)
                    }  
                }
             
        });

        await Promise.all(promise);
        
    }

    private async addProducts(manager:EntityManager) {
        let productsAdded = 0; 

        const promises = data.map(async (element) => {
            const category = await manager.findOne(Categories,{where:{name:element.category}});
            const productExist=await manager.findOne(Products,{
                where:{name:element.name}
            })
      
                    if (category && !productExist) {
                        const product = new Products();
                        
                        product.name = element.name;
                        product.description = element.description;
                        product.price = element.price;
                        product.stock = element.stock;
                        product.category = category;
        
                        await manager
                            .createQueryBuilder()
                            .insert()
                            .into(Products)
                            .values(product)
                            .orIgnore()
                            .execute()
                        productsAdded++; 
                }
           
        });

        await Promise.all(promises);
        if(productsAdded > 0){
            console.log("Productos cargados con exito")
        }
    }
}
