import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Products } from '../products/products.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: "categories"
})
export class Categories {
    @ApiProperty({
        description: 'UUID de la categoría.',
        example: '7494a8f9-7b89...',
    })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({
        description: 'Nombre de la categoría.',
        example: 'notebook',
    })
    @Column({
        type: "varchar",
        length: 50,
        nullable: false,
        unique:true
    })
    name: string;

    @ApiHideProperty()
    @OneToMany(() => Products, (product) => product.category)
    products: Products[];
}
