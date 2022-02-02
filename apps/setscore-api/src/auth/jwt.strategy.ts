import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private _configService: ConfigService) {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: false,
                jwksRequestsPerMinute: 5,
                jwksUri: `${_configService.get(
                    'SET_SCORE_AUTH0_ISSUER_URL'
                )}.well-known/jwks.json`
            }),

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: _configService.get('SET_SCORE_AUTH0_AUDIENCE'),
            issuer: `${_configService.get('SET_SCORE_AUTH0_ISSUER_URL')}`,
            algorithms: ['RS256']
        });
    }

    async validate(payload: any) {
        return payload;
    }
}
