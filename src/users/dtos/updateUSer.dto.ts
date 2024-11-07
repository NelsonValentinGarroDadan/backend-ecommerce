import {PickType} from '@nestjs/swagger'
import { CreateUserDto } from '../../users/dtos/createUser.dto';

export class UpdateUserDto extends PickType(CreateUserDto,
  [
    'name',
    'email',
    'address',
    'city',
    'country',
    'phone'
  ]
){
}