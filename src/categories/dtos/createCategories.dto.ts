import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCategoriesDto{
    /**
   * El nombre de la categoria debe ser de al menos 3 caracteres hasta 50 caracteres.
   * @example notebook
   */
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;
}