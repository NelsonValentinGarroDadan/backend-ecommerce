import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Orders } from '../orders/order.entity';

@Entity({
    name: "users"
})
export class Users {
    
    @ApiProperty({
        description: 'UUID del usuario.',
        example: '4f1e2d2c-3b93...',
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

   
    @ApiProperty({
        description: 'Nombre del usuario.',
        example: 'Valentin',
    })
    @Column({
        type: "varchar",
        length: 50,
        unique: true,
        nullable: false
    })
    name: string;

    
    @ApiProperty({
        description: 'Correo electrónico del usuario.',
        example: 'exmple@gmail.com',
    })
    @Column({
        type: "varchar",
        length: 50,
        unique: true,
        nullable: false
    })
    email: string;

   
    @ApiProperty({
        description: 'Contraseña del usuario.',
        example: 'Admin!123',
    })
    @Column({
        type: "varchar",
        length: 128,  
        nullable: false
    })
    password: string;

    
    @ApiProperty({
        description: 'Teléfono del usuario.',
        example: 66666666,
    })
    @Column({
        type: "int",
        nullable: false  
    })
    phone: number;

   
    @ApiProperty({
        description: 'País del usuario.',
        example: 'Argentina',
    })
    @Column({
        type: "varchar",
        length: 50,
        nullable: false
    })
    country: string;

    
    @ApiProperty({
        description: 'Ciudad del usuario.',
        example: 'San Luis',
    })
    @Column({
        type: "varchar",
        length: 50,
        nullable: false
    })
    city: string;

    @ApiProperty({
        description: 'Dirección del usuario.',
        example: 'Calle falsa 123',
    })
    @Column({
        type: "text",  
        nullable: true  
    })
    address: string;
    
    @ApiHideProperty()
    @Column({ type: "boolean", default: false })
    isAdmin: boolean;

    @ApiProperty({
        description: 'Órdenes asociadas al usuario.',
        type: () => Orders,
        isArray: true,
    })
    @OneToMany(() => Orders, (order) => order.user)
    @JoinColumn()
    orders: Orders[]; 
}
