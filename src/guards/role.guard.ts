import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Role } from '../enums/role';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(private readonly reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requeridRoles = this.reflector.getAllAndOverride<Role[]>("roles",[
            context.getHandler(),
            context.getClass()
        ]);
        const request:Request = context.switchToHttp().getRequest();
        const user = request["user"];
        
        const hasRole = ()=> 
            requeridRoles.some(role => user?.roles?.includes(role));
        const valid = user && user.roles &&  hasRole();

        if(!valid) throw new ForbiddenException("No tienes permiso para acceder a este recurso.");

        return valid;
    }

}