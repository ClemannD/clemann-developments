import { EmptyResponse } from '@clemann-developments/common-endpoint';
import {
    CreateOrUpdateRecurringExpenseRequest,
    CreateOrUpdateRecurringExpenseResponse,
    DeleteRecurringExpenseRequest,
    ListRecurringExpensesRequest,
    ListRecurringExpensesResponse
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUserGuard } from '../../auth/auth-user.guard';
import { ConfigurationRecurringExpensesService } from './configuration-recurring-expenses.service';

@Controller('configuration')
@UseGuards(AuthGuard('jwt'), AuthUserGuard)
export class ConfigurationRecurringExpensesController {
    constructor(
        private _configurationRecurringExpensesService: ConfigurationRecurringExpensesService
    ) {}

    @Post('listRecurringExpenses')
    public async listMonthExpenses(
        @Body() listMonthExpensesRequest: ListRecurringExpensesRequest,
        @Req() request: any
    ): Promise<ListRecurringExpensesResponse> {
        const expenses =
            await this._configurationRecurringExpensesService.listRecurringExpenses(
                request.userInfo.account.accountId,
                listMonthExpensesRequest.paginationAndSort
            );
        return {
            rows: expenses,
            totalCount: expenses.length
        };
    }

    @Post('createOrUpdateRecurringExpense')
    public async createOrUpdateExpense(
        @Body()
        createOrUpdateRecurringExpenseRequest: CreateOrUpdateRecurringExpenseRequest,
        @Req() request: any
    ): Promise<CreateOrUpdateRecurringExpenseResponse> {
        const recurringExpenseId =
            await this._configurationRecurringExpensesService.createOrUpdateRecurringExpense(
                request.userInfo.account.accountId,
                createOrUpdateRecurringExpenseRequest.recurringExpense
            );

        return {
            recurringExpenseId
        };
    }

    @Post('deleteRecurringExpense')
    public async deleteRecurringExpense(
        @Body() deleteRecurringExpenseRequest: DeleteRecurringExpenseRequest,
        @Req() request: any
    ): Promise<EmptyResponse> {
        await this._configurationRecurringExpensesService.deleteRecurringExpense(
            request.userInfo.account.accountId,
            deleteRecurringExpenseRequest.recurringExpenseId
        );

        return new EmptyResponse();
    }
}
