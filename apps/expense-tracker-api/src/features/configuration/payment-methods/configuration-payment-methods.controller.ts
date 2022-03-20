import { EmptyResponse } from '@clemann-developments/common-endpoint';
import {
    CreatePaymentMethodRequest,
    GetPaymentMethodsResponse,
    UpdatePaymentMethodRequest
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserGuard } from '../../auth/auth-user.guard';
import { ConfigurationPaymentMethodsService } from './configuration-payment-methods.service';

@Controller('configuration')
@UseGuards(AuthGuard('jwt'), AuthUserGuard)
export class ConfigurationPaymentMethodsController {
    constructor(
        private _configurationPaymentMethodsService: ConfigurationPaymentMethodsService
    ) {}

    @Post('getPaymentMethods')
    public async getPaymentMethods(
        @Req() request: any
    ): Promise<GetPaymentMethodsResponse> {
        return {
            paymentMethods:
                await this._configurationPaymentMethodsService.getPaymentMethods(
                    request.userInfo.account.accountId
                )
        };
    }

    @Post('createPaymentMethod')
    public async createPaymentMethod(
        @Req() request: any,
        @Body() createPaymentMethodRequest: CreatePaymentMethodRequest
    ): Promise<EmptyResponse> {
        await this._configurationPaymentMethodsService.createPaymentMethod(
            request.userInfo.account.accountId,
            createPaymentMethodRequest.name
        );

        return new EmptyResponse();
    }

    @Post('updatePaymentMethod')
    public async updatePaymentMethod(
        @Req() request: any,
        @Body() updatePaymentMethodRequest: UpdatePaymentMethodRequest
    ): Promise<EmptyResponse> {
        await this._configurationPaymentMethodsService.updatePaymentMethod(
            request.userInfo.account.accountId,
            updatePaymentMethodRequest.paymentMethodId,
            updatePaymentMethodRequest.name,
            updatePaymentMethodRequest.active
        );

        return new EmptyResponse();
    }
}
