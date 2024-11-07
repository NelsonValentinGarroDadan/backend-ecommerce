import { IsUUID, IsNotEmpty, ArrayMinSize, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { Products } from '../../products/products.entity';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    example: '8ca681ab-6f37...',
    description: 'El userId de la orden debe ser un UUID valido',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
  @ApiProperty({
    example: '[\n  { "id": "a3689369-0e20-4769-8930-1d15d63e903c" }\n]',
    description:
      'La propiedad productos debe ser un array de productos. Cada producto debe contener únicamente su id.',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => PartialType(Products))
  products: Partial<Products>[];
}
