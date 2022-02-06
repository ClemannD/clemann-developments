import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../entities/user.entity';
import { UserRole } from '../entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<UserRole[]>(
            'roles',
            context.getHandler()
        );

        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.userInfo as User;

        return this._matchRoles(roles, user.role);
    }

    private _matchRoles(roles: UserRole[], userRole: UserRole) {
        return roles.includes(userRole);
    }
}
