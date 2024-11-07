import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersRepository } from './orders.repository';
import { Orders } from './order.entity';
import { OrdersController } from './orders.controller';

@Module({
  imports:[
    TypeOrmModule.forFeature([Orders])
  ],
  providers: [
    OrdersService,OrdersRepository,
  ],
  controllers: [OrdersController]
})
export class OrdersModule {}
