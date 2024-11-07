import { ApiProperty } from '@nestjs/swagger';
import { Orders } from '../orders/order.entity';
import { Products } from '../products/products.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne, JoinColumn } from 'typeorm';

@Entity({
    name: "order_details"
})
export class OrdersDetails {
    @ApiProperty({
        description: 'UUID del detalle de orden.',
        example: '7494a8f9-7b89...'
    })
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @ApiProperty({
        description: 'Total del detalle de orden.',
        example: 500
    })
    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        nullable: false
    })
    price: number;
    @ApiProperty({
        description: 'Orden de compra.',
        example: {
            id: "feaaf4f1-c129...",
            user: {
                id: "905c28a7-d210...",
                name: "colo",
                email: "colo@gmail.com",
                phone: 123,
                country: "Argentina 2",
                city: "Argentina",
                address: "Calle falsa 123",
                orders: [
                    {
                        id: "465ec294-2338...",
                        date: "2024-10-15"
                    },
                    {
                        id: "f2f1bb7d-01b9...",
                        date: "2024-10-15"
                    }
                ]
            },
            date: "2024-10-15T20:26:53.719Z",
            orderDetailId: "7494a8f9-7b89...",
            price: 500
        }
    })
    @OneToOne(() => Orders, (order) => order.orderDetails)
    @JoinColumn({ name: "order_id" })
    order: Orders;
     @ApiProperty({
        description: 'Productos.',
        example: [
            {
                id: "7c96d4fd-dda4...",
                name: "Samsung Odyssey G9",
                description: "The best monitor in the world",
                price: "299.99",
                stock: 12,
                imgUrl: "https://res.cloudinary.com/dfuapyxtp/image/upload/v1729119498/wnce6fqjpffofsgmmx1t.png"
            }
        ]
    })
    @ManyToMany(() => Products, (product) => product.orderDetails)
    @JoinTable({
        name: "orderdetail_products",
        joinColumn:{
            name: 'product_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn:{
            name: 'orderditail_id',
            referencedColumnName: 'id'
        }
    })
    products: Products[];
}
