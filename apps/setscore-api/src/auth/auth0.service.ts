import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Auth0Service {
    constructor(
        private _configService: ConfigService,
        private _httpsService: HttpService
    ) {}

    public async getUserInfo(authorization: string): Promise<any> {
        const response = await this._httpsService
            .request({
                url: `${this._configService.get('AUTH0_ISSUER_URL')}userinfo`,
                headers: {
                    authorization: authorization
                }
            })
            .toPromise();
        return response.data;
    }
}
