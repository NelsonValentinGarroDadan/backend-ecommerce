import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUSer.dto';


@Injectable()
export class UsersRepository{
    constructor(@InjectRepository(Users) private readonly userRepository: Repository<Users>){}

     async getAllUsers(page: number, limit: number): Promise<Omit<Users, 'password' >[]> {
        const users =  await this.userRepository.find({
            skip: (page - 1) * limit,
            take: limit
        });
        return users.map(user => {
            const { password, ...userWithoutPassword } = user;
            if(false) console.log(password);
            return userWithoutPassword;
        });
       
    }


    async getUserById(id: string): Promise<Omit<Users, 'password' | 'orders' | 'isAdmin'> & { orders: { id: string; date: Date; }[] }> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['orders'], 
        });
        if (!user) throw new HttpException({status:404,error:"Usuario no encontrado."},404); 
        const { isAdmin ,password, orders, ...userWithoutPassword } = user;
        if(false) console.log(password);
        if(false) console.log(isAdmin);
        const transformedOrders = orders.map(order => ({
            id: order.id,
            date: order.date,
        }));
        
        return { ...userWithoutPassword,  orders: transformedOrders }
    }


    async getUserByEmail(email: string):Promise<Users>{
        return await this.userRepository.findOne({where: {email}}) 
    }


    async getUserByName(name: string):Promise<Users>{
        return await this.userRepository.findOne({where: {name}}) 
    }


    async postUser(newUser: CreateUserDto): Promise<Users> {
        if(await this.getUserByEmail(newUser.email) || await this.getUserByName(newUser.name)) 
            throw new HttpException({status:400,error:"Mail o nombre ya esta registrado"},400);
        const user = await this.userRepository.save(newUser);
        return user;
    }


    async putUserById(id: string, body:UpdateUserDto):Promise<{message:string;}> {
        let userFound = await this.getUserById(id);
        if (body.name && body.name !== userFound.name) {
            const userExistName = await this.getUserByName(body.name);
            if (userExistName && userExistName.id !== userFound.id)
                throw new HttpException({ status: 400, error: "El nombre ya está registrado" }, 400);
        }
        
        if (body.email && body.email !== userFound.email) {
            const userExistEmail = await this.getUserByEmail(body.email);
            if (userExistEmail && userExistEmail.id !== userFound.id)
                throw new HttpException({ status: 400, error: "El correo ya está registrado" }, 400);
        }
        userFound = {...userFound,...body};
        await this.userRepository.save(userFound);
        return {
            "message": "Usuario actualizado correctamente"
        }
    }


    async deleteUserById(id:string):Promise<{message:string;}>{
        await this.getUserById(id);
        try{
            await this.userRepository.delete(id);
            return {
                "message": "Usuario eliminado correctamente"
            }

        }catch{
            throw new HttpException({status:400,error:"El usuario no puede eliminarce porque esta relacionado con alguna entidad."},400)
        }
            
    }
    

}