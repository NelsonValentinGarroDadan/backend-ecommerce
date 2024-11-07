import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from '../enums/role';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request:Request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];
    if(!token) throw new UnauthorizedException("El token de acceso es requerido");
    
    try{
      const secret = process.env.JWT_SECRET;
      const user = this.jwtService.verify(token,{secret});
      user.exp = new Date(user.exp * 1000);
      user.iat = new Date(user.iat * 1000);
      user.roles =  user.isAdmin ? [Role.Admin] : [Role.User];
      request['user'] = user;
      return true;
    }catch(err){
      console.log(err);
      throw new UnauthorizedException("Error al autenticar el token");
    }
  }
}
