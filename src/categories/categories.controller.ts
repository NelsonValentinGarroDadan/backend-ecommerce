import { Body, Controller, Get, Post, UseInterceptors} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ValidateInterceptor } from './interceptors/validate.interceptor';
import { Categories } from './categories.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoriesDto } from './dtos/createCategories.dto';

@Controller('categories')
@ApiTags('Categories')
export class CategoriesController {
    constructor(private readonly categoriresService: CategoriesService){}
    
    @ApiOperation({ 
        summary: 'Lista de todas las categorias.', 
        description: 'Se obtienen todas las categorias que existen en la base de datos.', 
    })
    @ApiResponse({ 
        status: 200,
        description: 'Obtencion de todas las categorias',
        example: [
            {
              "id": "351ce0d1-e624...",
              "name": "smartphone"
            },
            {
              "id": "7133c693-6778...",
              "name": "monitor"
            },
            {
              "id": "c4b47722-9d41...",
              "name": "keyboard"
            },
            {
              "id": "b67dd7f0-65b7...",
              "name": "mouse"
            }
          ]
    })
    @Get()
    getAllCategories():Promise<Categories[]>{
        return this.categoriresService.getAllCategories();
    }

    
    @ApiOperation({ 
        summary: 'Pre-Carga de categorias de data', 
        description: 'Guarda todas las categorias del archivo data.json.', 
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Se guardaron exitosamentente las categorias.',
        example: {
            "message": "Categorias agregadas con exito."
        }
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Ya existen datos.',
        example: {
            "status": 400,
            "error": "Ya existen datos, no es necesario el seeder de categories"
          }
    })
    @Get("seeder")
    getSeeder(): Promise<{message:string;}>{
        return this.categoriresService.getSeeder();
    }



    @ApiOperation({ 
        summary: 'Postear categoria',
        description: 'Guarda la categoria enviada por body.'
    })
    @ApiResponse({ 
        status: 201,
        description: 'Se guardo exitosamentente la categoria.',
        example: {
            "message": "Categoria agregada con exito."
        }
    })
    @ApiResponse({ 
        status: 400,
        description: 'Ya existe la categoria a crear.',
        example: {
            "status": 400,
            "error": "notebook ya exite."
          }
    })
    @Post()
    @UseInterceptors(ValidateInterceptor)
    postCategories(@Body() categorie: CreateCategoriesDto): Promise<{message:string;}>{
        return this.categoriresService.postCategories(categorie);
    }
   
}