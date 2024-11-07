import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import loggerMiddleware from './middlewares/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { auth } from 'express-openid-connect';
import {config as auth0Config} from './config/auth0';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(auth(auth0Config))
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors)=>{
      const clearErrors = errors.map((error)=>{return { property: error.property, constrain: error.constraints}});
      return new BadRequestException({
        alert: "Errores detectados",
        errors: clearErrors,
      })
    }
    }));

  app.use(loggerMiddleware);
  const swaggerConfig = new DocumentBuilder()
  .setTitle("Ecommerce-API")
  .setDescription(" Esta API proporciona los endpoints necesarios para gestionar una tienda online. Incluye funcionalidades para la creación y gestión de usuarios, autenticación, manejo de productos, creación de órdenes de compra y más.")
  .setVersion("1.0.0")
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("/api",app,document);
  await app.listen(3000);
}
bootstrap();
