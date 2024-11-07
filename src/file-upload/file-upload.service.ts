import { HttpException, Injectable } from '@nestjs/common';
import { FileUpdateRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../products/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
    constructor(private readonly fileUpdateRepository:FileUpdateRepository,
        @InjectRepository(Products) private readonly productsRepository: Repository<Products>
    ){}
    async uploadImage(productId: string, file: Express.Multer.File): Promise<Products>{
        const productFoud = await this.productsRepository.findOne({where: {id:productId}});
        if(!productFoud) throw new HttpException({status:404,error:"No se encontro el producto."},404)

        const {secure_url} =  await this.fileUpdateRepository.uploadImage(file);
        if(!secure_url) throw new HttpException({status:500,error:"Error al cargar la imagen en Cloudinary."},500)

        await this.productsRepository.update(productId,{
            imgUrl: secure_url
        });
        const updateProduct = await this.productsRepository.findOne({where: {id:productId}});
        return updateProduct;
    }
}
