import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { MonthService } from './month.service';
import {
    CreateMonthRequest,
    ExpenseDto,
    GetMonthRequest,
    GetMonthResponse,
    ListMonthExpensesRequest
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserGuard } from '../auth/auth-user.guard';
import { EmptyResponse } from '@clemann-developments/common-endpoint';

@Controller('month')
@UseGuards(AuthGuard('jwt'), AuthUserGuard)
export class MonthController {
    constructor(private _monthService: MonthService) {}

    @Post('getMonth')
    public async getMonth(
        @Body() getMonthRequest: GetMonthRequest,
        @Req() request: any
    ): Promise<GetMonthResponse> {
        return {
            month: await this._monthService.getMonth(
                request.userInfo.account.accountId,
                getMonthRequest.year,
                getMonthRequest.month
            )
        };
    }

    @Post('createMonth')
    public async createMonth(
        @Body() createMonthRequest: CreateMonthRequest,
        @Req() request: any
    ): Promise<EmptyResponse> {
        await this._monthService.createMonth(
            request.userInfo.account.accountId,
            createMonthRequest.year,
            createMonthRequest.month
        );

        return new EmptyResponse();
    }

    @Post('listMonthExpenses')
    public async listMonthExpenses(
        @Body() listMonthExpensesRequest: ListMonthExpensesRequest,
        @Req() request: any
    ): Promise<ExpenseDto[]> {
        return await this._monthService.listMonthExpenses(
            request.userInfo.account.accountId,
            listMonthExpensesRequest.monthId,
            listMonthExpensesRequest.paginationAndSort
        );
    }

    // @Post('getMonthExpenses')
    // public async getMonthExpenses(
    //     @Body() getExpensesRequest: GetMonthRequest
    // ): Promise<GetMonthResponse> {
    //     return {
    //         month: await this._monthService.getExpenses(
    //             getExpensesRequest.accountId,
    //             getExpensesRequest.month,
    //             getExpensesRequest.year
    //         )
    //     };
    // }
}
