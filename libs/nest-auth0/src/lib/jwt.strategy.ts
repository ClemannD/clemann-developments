import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';
import { PassportStrategy } from '@nestjs/passport';
import { Auth0ModuleOptions } from './auth0.module';

@Injectable()
export class Auth0JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('AUTH0_CONFIG') private _auth0Config: Auth0ModuleOptions
    ) {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: false,
                jwksRequestsPerMinute: 5,
                jwksUri: `${_auth0Config.auth0IssuerUrl}.well-known/jwks.json`
            }),

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: _auth0Config.auth0Audience,
            issuer: _auth0Config.auth0IssuerUrl,
            algorithms: ['RS256']
        });
    }

    async validate(payload: any) {
        return payload;
    }
}
