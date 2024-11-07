import { HttpException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ValidateInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { userId,products } = request.body;
    
    if (!userId || !products || !Array.isArray(products)) throw new HttpException({status:400,error:'Faltan campos obligatorios en el cuerpo de la solicitud'},400);
    if(products.length === 0) throw new HttpException({status:400,error:'No se puede crear una orden sin productos.'},400);
    
    return next.handle(); 
  }
}
