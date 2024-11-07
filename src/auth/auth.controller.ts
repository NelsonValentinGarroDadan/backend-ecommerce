import { Body, Controller, Post, UseInterceptors} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ValidateInterceptor } from './interceptors/validate.interceptor';
import { Users } from '../users/users.entity';
import { LoginUserDto } from './dtos/loginUser.dto';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import {ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController{
    constructor(private readonly authService: AuthService){}
    
    @ApiOperation({ 
        summary: 'Iniciar sesión.', 
        description: 'Permite a un usuario autenticarse proporcionando su correo electrónico y contraseña.', 
    })
    @ApiResponse({
        status: 201,
        description: 'Usuario autenticado correctamente.',
        example: 
            { "message": "Usuario logeado", "token": "eyJhbGc..." }
    })
    @ApiResponse({
        status: 400,
        description: 'Credenciales inválidas.',
        example:
        {
            "status": 400,
            "error": "Email o password invalido."
          }
    })
    @Post('/singin')
    @UseInterceptors(ValidateInterceptor)
    singIn(@Body() credentials:LoginUserDto ): Promise<{message:string;token:string}> {
        const {email, password} = credentials;
        return this.authService.singIn(email, password);
    }


    @ApiOperation({ 
        summary: 'Registro de usuario.', 
        description: 'Crea un nuevo usuario en la plataforma con los datos proporcionados.', 
    })
    @ApiResponse({
        status: 201,
        description: 'Usuario registado correctamente.',
        example: {
            "id": "f0e17d6e-123c...",
            "name": "Valentin",
            "email": "example@email.com",
            "phone": 6666666,
            "country": "Argentina",
            "city": "San Luis",
            "address": "Calle falsa 123",
            "orders": []
          }
    })
    @ApiResponse({
        status: 400,
        description: 'Ya existe algun usuario con el nombre o el mail que se intenta registrar.',
        example: {
            "status": 400,
            "error": "Mail o nombre ya esta registrado"
          }
    })
    @Post('/singup')
    singUp(@Body() newUser: CreateUserDto): Promise<Omit<Users, 'password' | 'orders' | 'isAdmin'> & { orders: { id: string; date: Date; }[] }> {
        return this.authService.singUp(newUser);
    }
}