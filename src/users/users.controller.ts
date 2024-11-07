import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../guards/auth.guard';
import { ValidateInterceptor } from './interceptors/validate.interceptor';
import { Users } from './users.entity';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role';
import { ApiTags, ApiResponse, ApiQuery, ApiOperation, ApiBearerAuth, ApiBody, OmitType } from '@nestjs/swagger';
import { UpdateUserDto } from './dtos/updateUSer.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios devuelta exitosamente.', type: [Users] })
    @ApiResponse({ 
        status: 401, 
        description: 'Usuario sin autenticar.',
        example:{
            "message": "El token de acceso es requerido",
            "error": "Unauthorized",
            "statusCode": 401
        }
    })
    @ApiResponse({ 
        status: 403, 
        description: 'Usuario no autorizado.',
        example:{
            "message": "No tienes permiso para acceder a este recurso.",
            "error": "Forbidden",
            "statusCode": 403
        }
    })
    @ApiQuery({ name: 'page', required: false, description: 'Número de página a mostrar (default: 1)', type: String })
    @ApiQuery({ name: 'limit', required: false, description: 'Cantidad de usuarios a mostrar por página (default: 5)', type: String })
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    getAllUsers(
        @Query('page') page: string,
        @Query('limit') limit: string
    ): Promise<Omit<Users, 'password'>[]> {
        if (!page) page = "1";
        if (!limit) limit = "5";
        return this.userService.getAllUsers(Number(page), Number(limit));
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Obtener usuario por ID' })
    @ApiResponse({ status: 200, description: 'Usuario devuelto exitosamente.', type: OmitType(Users,["password","orders","isAdmin"]) })
    @ApiResponse({status: 400,description: 'Errores de validación.',})
    @ApiResponse({ 
        status: 401, 
        description: 'Usuario sin autenticar.',
        example:{
            "message": "El token de acceso es requerido",
            "error": "Unauthorized",
            "statusCode": 401
        }
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Usuario no encontrado.',
        example: {
            "status":404,
            "message": "Usuario no encontrado."
        }
    })
    @Get(':id')
    @UseGuards(AuthGuard)
    getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<Omit<Users, 'password' | 'orders' | 'isAdmin'> & { orders: { id: string; date: Date; }[] }> {
        return this.userService.getUserById(id);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Actualizar usuario por ID' })
    @ApiBody({ type: UpdateUserDto })
    @ApiResponse({ 
        status: 200, 
        description: 'Usuario actualizado exitosamente.',
        example: {
            "message": "Usuario actualizado exitosamente",
        }
    })
    @ApiResponse({ status: 400, description: 'Error en la validación de los datos.' })
    @ApiResponse({ 
        status: 401, 
        description: 'Usuario sin autenticar.',
        example:{
            "message": "El token de acceso es requerido",
            "error": "Unauthorized",
            "statusCode": 401
        }
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Usuario no encontrado.',
        example: {
            "status": 404,
            "message": "Usuario no encontrado."
        }
    })
    @Put(':id')
    @UseGuards(AuthGuard)
    @UseInterceptors(ValidateInterceptor)
    putUser(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateUserDto): Promise<{message:string;}> {
        return this.userService.putUserById(id, body);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Eliminar usuario por ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'Usuario eliminado exitosamente.',
        example: {
            "message": "Usuario eliminado exitosamente",
        }
    })
    @ApiResponse({ 
        status: 401, 
        description: 'Usuario sin autenticar.',
        example:{
            "message": "El token de acceso es requerido",
            "error": "Unauthorized",
            "statusCode": 401
        }
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Usuario no encontrado.',
        example: {
            "status": 404,
            "message": "Usuario no encontrado."
        }
    })
    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUserById(@Param('id', ParseUUIDPipe) id: string): Promise<{message:string;}> {
        return  this.userService.deleteUserById(id);
    }
}
