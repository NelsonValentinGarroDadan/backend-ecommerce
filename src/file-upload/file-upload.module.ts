import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { FileUpdateRepository } from './file-upload.repository';
import { CloudinaryConfig } from '../config/cloudinary';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../products/products.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Products])],
  controllers: [FileUploadController],
  providers: [FileUploadService,
              CloudinaryConfig,
              FileUpdateRepository,
            ],
})
export class FileUploadModule {}
