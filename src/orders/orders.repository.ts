import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './order.entity';
import { EntityManager, Repository } from 'typeorm';
import { OrdersDetails } from '../order-details/order-details.entity';
import { CreateOrderDto } from './dtos/orderCreate.dto';
import { Users } from 'src/users/users.entity';
import { isUUID } from 'class-validator';
import { Products } from 'src/products/products.entity';

@Injectable()
export class OrdersRepository{
    constructor(
        @InjectRepository(Orders) private readonly ordersRepository: Repository<Orders>,
        private readonly manager : EntityManager,
    ){}
    async getOrder(id: string): Promise<Orders> {
        const result = await this.ordersRepository.findOne({where: {id},relations: ['orderDetails', 'orderDetails.products']})
        if(!result) throw new HttpException({status:404, error:`La orden no existe`},404);
        return result;
    }
    async addOrder(newOrder: CreateOrderDto): Promise<Omit<Orders, 'orderDetails'|"user" > & {orderDetailId:string;price:number;user:Partial<Users> }> {
       const queryRunner = this.manager.connection.createQueryRunner();
       await queryRunner.connect();
       await queryRunner.startTransaction();
       try{

           const userFound = await queryRunner.manager.findOne(Users,{where: {id:newOrder.userId}});
           if (!userFound) throw new HttpException({status:404,error:"No se encontró el usuario."},404);
           
           let total:number = 0;
           const orderDetailsProducts = [];
       
           for (const product of newOrder.products) {
               if(!isUUID(product.id)) 
                   throw new HttpException({status:400, error:`El id del producto deberia estar en formato UUID`},400);
   
               const productFound = await queryRunner.manager.findOne(Products,{where:{id:product.id}});
   
               if (!productFound)throw new HttpException({status:400, error:`Producto no disponible`},400);
   
               if(orderDetailsProducts.some(item => JSON.stringify(item) === JSON.stringify(productFound))) 
                   throw new HttpException({status:400, error:`No se puede comprar mas de un producto del mismo tipo por orden `},400);
               
               const productPrice = Number(productFound.price);
               
               total += productPrice;
               orderDetailsProducts.push(productFound);
       
               productFound.stock -= 1;
               await queryRunner.manager.save(Products,productFound);
   
           }
   
           const orderCreated:Orders = await queryRunner.manager.save(Orders,{
               user: userFound,
               date: new Date(),
           });
   
           const orderDetailsCreated:OrdersDetails = await queryRunner.manager.save(OrdersDetails,{
               products: orderDetailsProducts,
               price: Number(total.toFixed(2)),
               order:orderCreated
           });
   
           orderCreated.orderDetails = orderDetailsCreated ;
           await queryRunner.manager.save(Orders,orderCreated)
           const {orderDetails,user,...orderWhitOutOrderDetails} = orderCreated;
           const {password,isAdmin,...userClean}=user;
           if(false) console.log(orderDetails,password,isAdmin);
           await queryRunner.commitTransaction();
           return {...orderWhitOutOrderDetails,user:userClean, orderDetailId:orderDetailsCreated.id, price:orderDetailsCreated.price};
       }catch(error){
            await queryRunner.rollbackTransaction();
            throw new HttpException({status:error.response.status, error:error.response.error},error.response.status);
       }finally{
            await queryRunner.release();
       }
    }
    
}