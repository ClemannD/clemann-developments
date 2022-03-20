import { GetActiveOptionsResponse } from '@clemann-developments/dtos/expense-tracker-dtos';
import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserGuard } from '../auth/auth-user.guard';
import { ActiveOptionsService } from './active-options.service';

@Controller('active-options')
@UseGuards(AuthGuard('jwt'), AuthUserGuard)
export class ActiveOptionsController {
    constructor(private _activeOptionsService: ActiveOptionsService) {}

    @Post('getActiveOptions')
    public async getActiveOptions(
        @Req() request: any
    ): Promise<GetActiveOptionsResponse> {
        return {
            categories: await this._activeOptionsService.getActiveCategories(
                request.userInfo.account.accountId
            ),
            tags: await this._activeOptionsService.getActiveTags(
                request.userInfo.account.accountId
            ),
            paymentMethods:
                await this._activeOptionsService.getActivePaymentMethods(
                    request.userInfo.account.accountId
                )
        };
    }
}
