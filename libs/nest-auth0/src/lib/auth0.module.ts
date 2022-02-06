import { DynamicModule, HttpModule, Module } from '@nestjs/common';
import { Auth0Service } from './auth0.service';
import { Auth0JwtStrategy } from './jwt.strategy';

export interface Auth0ModuleOptions {
    auth0IssuerUrl: string;
    auth0Audience: string;
}
export interface Auth0ModuleAsyncOptions {
    useFactory: (
        ...args: any[]
    ) => Promise<Auth0ModuleOptions> | Auth0ModuleOptions;
    imports: any[];
    inject?: any[];
}

@Module({
    imports: [HttpModule],
    providers: [Auth0Service, Auth0JwtStrategy],
    exports: [Auth0Service, Auth0JwtStrategy]
})
export class Auth0Module {
    public static register(options: Auth0ModuleOptions): DynamicModule {
        return {
            module: Auth0Module,
            providers: [
                {
                    provide: 'AUTH0_CONFIG',
                    useValue: options
                }
            ],
            exports: [Auth0Service]
        };
    }

    public static registerAsync(
        options: Auth0ModuleAsyncOptions
    ): DynamicModule {
        return {
            module: Auth0Module,
            imports: options.imports,
            providers: [
                {
                    provide: 'AUTH0_CONFIG',
                    useFactory: options.useFactory,
                    inject: options.inject
                }
            ],
            exports: [Auth0Service]
        };
    }
}
