import { OrdersDetails } from '../order-details/order-details.entity';
import { Users } from '../users/users.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
    name: "orders"
})
export class Orders {
    @ApiProperty({
        description: 'UUID de la orden.',
        example: 'feaaf4f1-c129...'
    })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({
        description: 'Fecha de la orden.',
        example: '2024-10-15'
    })
    @Column({
        type: "date",
        nullable: false
    })
    date: Date;

    @ApiProperty({
        description: 'Usuario que realizó la orden.',
        type: () => Users, 
        example: {
            id: "905c28a7-d210...",
            name: "colo",
            email: "colo@gmail.com",
            phone: 123,
            country: "Argentina",
            city: "San Luis",
            address: "Calle falsa 123",
            orders: [] 
        }
    })
    @ManyToOne(() => Users, (user) => user.orders)
    @JoinColumn({ name: "user_id" })
    user: Users;

    @ApiProperty({
        description: 'Detalles de la orden.',
        type: () => OrdersDetails 
    })
    @OneToOne(() => OrdersDetails, (orderDetails) => orderDetails.order)
    @JoinColumn({ name: "order_details_id" })
    orderDetails: OrdersDetails;
}
