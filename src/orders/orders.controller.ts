import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards, UseInterceptors} from '@nestjs/common';
import { Orders } from './order.entity';
import { OrdersService } from './orders.service';
import { ValidateInterceptor } from './interceptors/validate.interceptor';
import { CreateOrderDto } from './dtos/orderCreate.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService){}
    @ApiBearerAuth()
    @ApiOperation({ 
        summary: 'Obtener orden de compra por id.', 
        description: 'Se obtienen todas las categorias que existen en la base de datos.'})
    @ApiResponse({status: 200,description: 'Orden obtenida con exito.'})
    @ApiResponse({
        status: 400,
        description: 'Errores de validación.',
        example:{
            "message": "Validation failed (uuid is expected)",
            "error": "Bad Request",
            "statusCode": 400
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
        description: 'No existe la orden.',
        example:{
            "status":404, 
            "error":`La orden no existe`
          }
    })
    @Get(':id')
    @UseGuards(AuthGuard)
    getOrder(@Param('id',ParseUUIDPipe) id:string):Promise<Orders>{
        return this.ordersService.getOrder(id);
    }
    @ApiBearerAuth()
    @ApiOperation({summary: 'Poster orden.',description: 'Guarda la orden enviada por el body.'})
    @ApiResponse({ 
        status: 201,
        description: 'Orden creada con exito.',
        type: OmitType(Orders,["user","orderDetails"])
    })
    @ApiResponse({
        status: 400, 
        description: 'Producto no disponible o sin stock / Errores de validacion',
        example: {
            "status":400, 
            "error":`Producto no disponible o sin stock / UserId must be UUID`}

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
        description: 'No se encontro el usuario.',
        example: {
            "status": 404,
            "error": "No se encontró el usuario."
          }
    })
    @Post()
    @UseInterceptors(ValidateInterceptor)
    @UseGuards(AuthGuard)
    postOrder(@Body() newOrder: CreateOrderDto): Promise<{id:string;price:number}> {
        return this.ordersService.addOrder(newOrder);
    }
}
