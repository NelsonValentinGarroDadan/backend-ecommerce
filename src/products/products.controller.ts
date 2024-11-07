import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from '../guards/auth.guard';
import { ValidateInterceptor } from './interceptors/validate.interceptor';
import { Products } from './products.entity';
import { CreateProductDto } from './dtos/productsCreate.dto';
import { RoleGuard } from '../guards/role.guard';
import { Role } from '../enums/role';
import { Roles } from '../decorators/role.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @ApiOperation({ summary: 'Obtener todos los productos' })
    @ApiResponse({ status: 200, description: 'Lista de productos devuelta exitosamente.', type: [Products] })
    @ApiQuery({ name: 'page', required: false, description: 'Número de página a mostrar (default: 1)', type: String })
    @ApiQuery({ name: 'limit', required: false, description: 'Cantidad de productos a mostrar por página (default: 5)', type: String })
    @Get()
    getAllProducts(@Query('page') page: string, @Query('limit') limit: string): Promise<Products[]> {
        if (!page) page = "1";
        if (!limit) limit = "5";
        return  this.productsService.getAllProducts(Number(page), Number(limit));
    }


    @ApiOperation({ summary: 'Pre-carga de productos' })
    @ApiResponse({ 
        status: 200, 
        description: 'Se guardaron exitosamentente los productos.',
        example: {
            "message": "Productos agregados con exito."
        }
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Ya existen datos.',
        example: {
            "status": 400,
            "error": "Ya existen datos, no es necesario el seeder de productos"
          }
    })
    @Get('seeder')
    getSeeder(): Promise<{message:string;}> {
        return  this.productsService.getSeeder();
    }


    @ApiOperation({ summary: 'Obtener producto por ID' })
    @ApiResponse({ status: 200, description: 'Producto devuelto exitosamente.', type: Products })
    @ApiResponse({
        status: 400,
        description: 'Errores de validación.',
        example: {
            "message": "Validation failed (uuid is expected)",
            "error": "Bad Request",
            "statusCode": 400
          }
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Producto no encontrado.',
        example: {
            "status": 404,
            "error": "Producto no encontrado."
          }
    })
    @Get(':id')
     getProductById(@Param('id', ParseUUIDPipe) id: string): Promise<Products> {
        return  this.productsService.getProductById(id);
    }


    @ApiOperation({ summary: 'Crear un nuevo producto' })
    @ApiBody({ type: CreateProductDto })
    @ApiResponse({ 
        status: 201, 
        description: 'Producto creado exitosamente.',
        type: Products
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
    @Post()
    @UseInterceptors(ValidateInterceptor)
    async postProduct(@Body() newProduct: CreateProductDto): Promise<Products> {
        return await this.productsService.postProduct(newProduct);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Actualizar producto por ID' })
    @ApiBody({ type: CreateProductDto })
    @ApiResponse({ 
        status: 200, 
        description: 'Producto actualizado exitosamente.',
        example: {
            "message": "Producto actualizado exitosamente."
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
        status: 403, 
        description: 'Usuario no autorizado.',
        example:{
            "message": "No tienes permiso para acceder a este recurso.",
            "error": "Forbidden",
            "statusCode": 403
        }
    })
    @ApiResponse({ 
        status: 404,
        description: 'Producto no encontrado.',
        example: {
            "status": 404,
            "error": "Producto no encontrado."
          }
    })
    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    @UseInterceptors(ValidateInterceptor)
    putProductById(@Param('id', ParseUUIDPipe) id: string, @Body() body: CreateProductDto): Promise<{message:string;}> {
        return this.productsService.putProductById(id, body);
    }

    @ApiOperation({ summary: 'Eliminar producto por ID' })
    @ApiResponse({ 
        status: 200, 
        description: 'Producto eliminado exitosamente.',
        example: {
            "message": "Producto eliminado exitosamente."
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
        status: 400, 
        description: 'No se pudo eliminar el producto.',
        example: {
            "status": 400,
            "error": "No se puede eliminar el producto porque esta relacionado con alguna orden."
          }
    })
    @ApiResponse({ 
        status: 404, 
        description: 'Producto no encontrado.',
        example: {
            "status":404,
            "error":"Producto no encontrado."}
    })
    @Delete(':id')
    deleteProductById(@Param('id', ParseUUIDPipe) id: string): Promise<{message:string;}> {
        return this.productsService.deleteProductById(id);
    }
}
