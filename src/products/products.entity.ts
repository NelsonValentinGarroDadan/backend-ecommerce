import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Categories } from '../categories/categories.entity';
import { OrdersDetails } from '../order-details/order-details.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: "products"
})
export class Products {
    @ApiProperty({
        description: 'UUID del producto.',
        example: '7c96d4fd-dda4...',
    })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({
        description: 'Nombre del producto.',
        example: 'Televisor LED 21\'',
    })
    @Column({
        type: "varchar",
        length: 50,
        nullable: false,
        unique:true
    })
    name: string;

    @ApiProperty({
        description: 'Descripción del producto.',
        example: 'Televisor de la marca Acme, 21 pulgadas.',
    })
    @Column({
        type: "text",
        nullable: false
    })
    description: string;

    @ApiProperty({
        description: 'Precio del producto.',
        example: 150.99,
    })
    @Column({
        type: "decimal",
        precision: 10,
        scale: 2,
        nullable: false
    })
    price: number;

    @ApiProperty({
        description: 'Cantidad en stock del producto.',
        example: 20,
    })
    @Column({
        type: "integer",
        nullable: false
    })
    stock: number;

    @ApiProperty({
        description: 'URL de la imagen del producto.',
        example: 'https://via.placeholder.com/150',
        required: false,
    })
    @Column({
        type: "varchar",
        nullable: true,
        default: "https://via.placeholder.com/150"
    })
    imgUrl?: string;

    @ApiProperty({
        description: 'Categoría a la que pertenece el producto.',
        type: () => Categories, 
    })
    @ManyToOne(() => Categories, (category) => category.products)
    @JoinColumn({ name: "category_id" })
    category: Categories;

    @ApiHideProperty()
    @ManyToMany(() => OrdersDetails, (orderDetails) => orderDetails.products)
    orderDetails: OrdersDetails[];
}
