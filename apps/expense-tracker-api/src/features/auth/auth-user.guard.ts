import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthUserGuard implements CanActivate {
    constructor(private _authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const user = await this._authService.getOrCreateUserFromAuthProvider(
            request.user?.sub,
            request.headers.authorization
        );

        request.userInfo = user;

        return true;
    }
}
