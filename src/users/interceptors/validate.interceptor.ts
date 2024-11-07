import { HttpException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ValidateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { name, email, address, phone, city, country } = request.body;

   
    if (!name || !email  || !address || !phone || !city || !country)  throw new HttpException({status:400,error:'Faltan campos obligatorios en el cuerpo de la solicitud'},400);
    return next.handle();
  }
}
