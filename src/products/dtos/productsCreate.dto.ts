import { IsString, IsNotEmpty, IsNumber, Min, Max, IsOptional, IsUUID} from 'class-validator';

export class CreateProductDto {
  /**
   * El nombre del producto debe ser de al menos 3 caracteres hasta 50 caracteres.
   * @example "Televisor led 21'"
   */
  @IsString()
  @IsNotEmpty()
  name: string;
    /**
   * La descripcion del producto debe ser de al menos 3 caracteres hasta 50 caracteres.
   * @example "Televisor de la marca acme, 21 pulgadas"
   */
  @IsString()
  @IsNotEmpty()
  description: string;
    /**
   * El precio debe ser un numero positivo (puede ser decimal).
   * @example 150.9
   */
  @IsNumber()
  @Min(0)
  price: number;
    /**
   * El stock del producto debe ser un numero entre 0 y 100.
   * @example 20
   */
  @IsNumber()
  @Min(0)
  @Max(100)
  stock: number;
    /**
   * El nombre de la categoria debe ser de al menos 3 caracteres hasta 50 caracteres.
   * @example "29ddbcfb-ca56..."
   */
  @IsUUID()
  @IsNotEmpty()
  category: string; 
  /**
   * La url de la img del producto, si no se define su valor por defecto es : https://via.placeholder.com/150.
   * @example https://testimgurl.com
   */
  @IsString()
  @IsOptional()
  imageUrl?: string;
}
