import {PickType} from '@nestjs/swagger'
import { CreateUserDto } from '../../users/dtos/createUser.dto';

export class LoginUserDto extends PickType(CreateUserDto,
  [
    'email',
    'password',
  ]
){
  /**
   * El email del usuario para iniciar sesión.
   * @example colo@gmail.com
   */
  email: string;

  /**
   * La contraseña del usuario para iniciar sesión.
   * @example Admin!123
   */
  password: string;
}