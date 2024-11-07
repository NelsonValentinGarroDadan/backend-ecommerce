import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { Orders } from './order.entity';
import { CreateOrderDto } from './dtos/orderCreate.dto';
import { Users } from 'src/users/users.entity';

@Injectable()
export class OrdersService {
    constructor(private readonly ordersRepository:OrdersRepository){}
    async getOrder(id: string):Promise<Orders> {
        return await this.ordersRepository.getOrder(id);
    }
    async addOrder(newOrder:CreateOrderDto): Promise<Omit<Orders, 'orderDetails'|"user" > & {orderDetailId:string;price:number;user:Partial<Users> }> {
        return await this.ordersRepository.addOrder(newOrder);
    }
}
