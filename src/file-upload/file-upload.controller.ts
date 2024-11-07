import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Patch, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { Products } from '../products/products.entity';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from '../enums/role';
import { RoleGuard } from '../guards/role.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('files')
@ApiTags('Files')
export class FileUploadController {
    constructor(private readonly fileUploadService:FileUploadService){}
    @ApiBearerAuth()
    @ApiOperation({ 
        summary: 'Subir imagen de un producto.', 
        description: 'Sube una imagen asociada a un producto específico.' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Subida de imagen para el producto.',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    
    @ApiResponse({ 
        status: 200, 
        description: 'Imagen subida correctamente.',
        type: Products
    })
    @ApiResponse({ status: 400, description: 'Errores de validación.'})
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
        description: 'No se encontro el producto.',
        example: {
            "status":404,
            "error":"No se encontro el producto."
        }
    })
    @ApiResponse({ status: 500,  description: 'Error al cargar la imagen en Cloudinary.'})
    @Patch('uploadImage/:id')
    @UseInterceptors(FileInterceptor('file'))
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,RoleGuard)
    uploadImage(@Param('id',ParseUUIDPipe) productId:string, 
    @UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator(
                { 
                maxSize: 200000, 
                message: "El peso maximo permitido es de 200kb."
                }
            ),
            new FileTypeValidator({fileType: /(.png|.jpg|.jpeg|.webp|.gif)/}),
        ]
    })) file: Express.Multer.File): Promise<Products>{
        return this.fileUploadService.uploadImage(productId,file);
    }

}
