import {  HttpException, Injectable } from '@nestjs/common';
import { Users } from '../users/users.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService{
    constructor(private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ){}

    async singIn(emailCre:string, passwordCre:string): Promise<{message:string;token:string}> {
        const userFound  = await this.userService.getUserByEmail(emailCre);
        if(!userFound) throw new HttpException({status:400,error:"Email o password invalido."},400);
        if(!await bcrypt.compare(passwordCre, userFound.password)) throw new HttpException({status:400,error:"Email o password invalido."},400);
        
        
        const payload = {id: userFound.id, email: userFound.email, isAdmin:userFound.isAdmin};
        const token = this.jwtService.sign(payload);
        return { 
            message: "Usuario logeado",
            token
         }
    }

    
    async singUp(newUser: CreateUserDto): Promise<Omit<Users, "password" | "orders" | 'isAdmin'> & { orders: { id: string; date: Date; }[]; }> {
        const hashPassword = await bcrypt.hash(newUser.password,10);
        const user =  await this.userService.postUser({...newUser, password:hashPassword});
        return await this.userService.getUserById(user.id);
    }
}