import { EmptyResponse } from '@clemann-developments/common-endpoint';
import {
    CreateMonthRequest,
    CreateOrUpdateExpenseRequest,
    CreateOrUpdateExpenseResponse,
    DeleteExpenseRequest,
    GetMonthRequest,
    GetMonthResponse,
    GetMonthSummaryRequest,
    GetMonthSummaryResponse,
    ListMonthExpensesRequest,
    ListMonthExpensesResponse
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserGuard } from '../auth/auth-user.guard';
import { MonthSummaryService } from './month-summary.service';
import { MonthService } from './month.service';

@Controller('month')
@UseGuards(AuthGuard('jwt'), AuthUserGuard)
export class MonthController {
    constructor(
        private _monthService: MonthService,
        private _monthSummaryService: MonthSummaryService
    ) {}

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

    @Post('getMonthSummary')
    public async getMonthSummary(
        @Body() getMonthSummaryRequest: GetMonthSummaryRequest,
        @Req() request: any
    ): Promise<GetMonthSummaryResponse> {
        const monthSummary = await this._monthSummaryService.getMonthSummary(
            request.userInfo.account.accountId,
            getMonthSummaryRequest.monthId
        );

        return {
            monthSummary
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
    ): Promise<ListMonthExpensesResponse> {
        const expenses = await this._monthService.listMonthExpenses(
            request.userInfo.account.accountId,
            listMonthExpensesRequest.monthId,
            listMonthExpensesRequest.paginationAndSort
        );
        return {
            rows: expenses,
            totalCount: expenses.length
        };
    }

    @Post('createOrUpdateExpense')
    public async createOrUpdateExpense(
        @Body() createOrUpdateExpenseRequest: CreateOrUpdateExpenseRequest,
        @Req() request: any
    ): Promise<CreateOrUpdateExpenseResponse> {
        const expenseId = await this._monthService.createOrUpdateExpense(
            request.userInfo.account.accountId,
            createOrUpdateExpenseRequest.monthId,
            createOrUpdateExpenseRequest.expense
        );

        return {
            expenseId
        };
    }

    @Post('deleteExpense')
    public async deleteExpense(
        @Body() deleteExpenseRequest: DeleteExpenseRequest,
        @Req() request: any
    ): Promise<EmptyResponse> {
        await this._monthService.deleteExpense(
            request.userInfo.account.accountId,
            deleteExpenseRequest.expenseId
        );

        return new EmptyResponse();
    }
}
