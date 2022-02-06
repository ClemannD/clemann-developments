import { Auth0Service } from './auth0.service';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpService } from '@nestjs/common';
import { of } from 'rxjs';

describe('Auth0Service', () => {
    let auth0Service: Auth0Service;
    let httpService: HttpService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            providers: [
                Auth0Service,
                {
                    provide: 'AUTH0_CONFIG',
                    useValue: {
                        auth0IssuerUrl: 'https://example-issuer.com/',
                        auth0Audience: 'https://example-audience.com'
                    }
                }
            ]
        }).compile();

        auth0Service = module.get<Auth0Service>(Auth0Service);
        httpService = module.get<HttpService>(HttpService);
    });

    it('should create the service', () => {
        expect(auth0Service).toBeTruthy();
    });

    it('should make a call to the issuer user info endpoint', async () => {
        const mockAuthorization = 'Bearer mockToken';
        const mockResponse = {
            data: {
                sub: 'mockUserId'
            }
        };

        jest.spyOn(httpService, 'request').mockReturnValue(
            of(mockResponse) as unknown as any
        );

        const result = await auth0Service.getUserInfo(mockAuthorization);

        expect(httpService.request).toHaveBeenCalledWith({
            url: 'https://example-issuer.com/userinfo',
            headers: {
                authorization: mockAuthorization
            }
        });

        expect(result).toBe(mockResponse.data);
    });
});
