import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { Categories } from './categories.entity';
import { CreateCategoriesDto } from './dtos/createCategories.dto';

@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepository: CategoriesRepository){
    }
    
    getAllCategories():Promise<Categories[]>{
        return this.categoriesRepository.getAllCategories();
    }


    getSeeder(): Promise<{message:string;}>{
        return this.categoriesRepository.getSeeder();
    }

    
    postCategories(categorie: CreateCategoriesDto): Promise<{message:string;}>{
        return this.categoriesRepository.postCategories(categorie);
    }
}
