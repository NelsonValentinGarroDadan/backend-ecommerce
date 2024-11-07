import { IsString, IsEmail, IsNotEmpty, Length, Matches, Validate, IsEmpty, IsNumber } from 'class-validator';
import { MatchPassword } from '../../decorators/match-password.decorator';
import { ApiHideProperty } from '@nestjs/swagger';

export class CreateUserDto {
  /**
   * El nombre del usuario debe ser de al menos 3 caracteres hasta 80 caracteres.
   * @example Valentin
   */
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  name: string;
  /**
   * El email del usuario debe ser un email valido y debe ser de al menos 3 caracteres hasta 80 caracteres.
   * @example example@email.com
   */
  @IsEmail()
  email: string;
  /**
   * La contraseña del usuario debe ser de al menos 8 caracteres hasta 15 caracteres y constener una minuscula, una mayuscula , un numero y un caracter especial.
   * @example Admin!123
   */
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,15}$/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).',
  })
  password: string;
  /**
   * La confirmacion de contraseña del usuario debe scoincidir con la contraseña del usuario.
   * @example Admin!123
   */
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;
  /**
   * La direccion del usuario debe ser de al menos 3 caracteres hasta 80 caracteres.
   * @example "Calle falsa 123"
   */
  @IsString()
  @IsNotEmpty()
  @Length(3, 80)
  address: string;
   /**
   * El telefono del usuario debe ser un numero de telefono valido.
   * @example 6666666
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;
  /**
   * El pais del usuario debe ser de al menos 5 caracteres hasta 20 caracteres.
   * @example Argentina
   */
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  country: string;
  /**
   * La ciudad del usuario debe ser de al menos 5 caracteres hasta 20 caracteres.
   * @example "San Luis"
   */
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  city: string;
  @ApiHideProperty()
  @IsEmpty()
  isAdmin?:boolean;
}
