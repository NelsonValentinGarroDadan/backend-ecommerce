import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repositiry';
import { Users } from './users.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUSer.dto';
@Injectable()
export class UsersService{
    constructor(@Inject() private userRepository: UsersRepository){}

    getAllUsers(page:number, limit:number):Promise<Omit<Users, 'password' >[]>{
        return this.userRepository.getAllUsers(page, limit);
       
    }


    getUserById(id: string): Promise<Omit<Users, 'password' | 'orders' | 'isAdmin'> & { orders: { id: string; date: Date; }[] }> {
        return this.userRepository.getUserById(id);
    }


    postUser(newUser: CreateUserDto): Promise<Users> {
        return this.userRepository.postUser(newUser);
    }

    getUserByEmail(email: string):Promise<Users>{
        return this.userRepository.getUserByEmail(email); 
    }


    getUserByName(name: string):Promise<Users>{
        return  this.userRepository.getUserByName(name); 
    }


    putUserById(id: string, body:UpdateUserDto):Promise<{message:string;}>{
        return this.userRepository.putUserById(id, body);
    }


    deleteUserById(id:string):Promise<{message:string;}>{
        return this.userRepository.deleteUserById(id);
    }


};