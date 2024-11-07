import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repositiry';

@Module({
    imports:[TypeOrmModule.forFeature([Users])],
    providers:[AuthService,UsersService,UsersRepository],
    controllers: [AuthController],
})
export class AuthModule{

}