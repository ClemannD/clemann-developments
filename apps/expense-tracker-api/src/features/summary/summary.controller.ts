import {
    GetYearSummaryRequest,
    GetYearSummaryResponse
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserGuard } from '../auth/auth-user.guard';
import { SummaryService } from './summary.service';

@Controller('summary')
@UseGuards(AuthGuard('jwt'), AuthUserGuard)
export class SummaryController {
    constructor(private _summaryService: SummaryService) {}

    @Post('getYearSummary')
    public async getYearSummary(
        @Body() getYearSummaryRequest: GetYearSummaryRequest,
        @Req() request: any
    ): Promise<GetYearSummaryResponse> {
        const yearSummary = await this._summaryService.getYearSummary(
            request.userInfo.account.accountId,
            getYearSummaryRequest.year
        );

        return {
            yearSummary
        };
    }
}
