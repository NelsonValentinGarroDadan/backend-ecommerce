import { HttpException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ValidateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { description, name,  price, stock } = request.body;

    if (!description || !name || !price || !stock) throw new HttpException({status:400,error:'Faltan campos obligatorios en el cuerpo de la solicitud'},400);
  
    return next.handle();
  }
}
