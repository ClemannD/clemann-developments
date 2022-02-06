import { HttpService, Inject, Injectable } from '@nestjs/common';
import { Auth0ModuleOptions } from './auth0.module';

@Injectable()
export class Auth0Service {
    constructor(
        private _httpsService: HttpService,
        @Inject('AUTH0_CONFIG') private _auth0Config: Auth0ModuleOptions
    ) {}

    public async getUserInfo(authorization: string): Promise<any> {
        const response = await this._httpsService
            .request({
                url: `${this._auth0Config.auth0IssuerUrl}userinfo`,
                headers: {
                    authorization: authorization
                }
            })
            .toPromise();
        return response.data;
    }
}
