import {
    ListRequest,
    ListResponse
} from '@clemann-developments/common-endpoint';
import {
    ExpenseCategoryDto,
    ExpensePaymentMethodDto,
    ExpenseSubcategoryDto,
    ExpenseTagDto
} from './month.dtos';

export class RecurringExpenseDto {
    public expenseId: string;
    public name: string;
    public day: number;
    public amountCents: number;
    public split: number;
    public splitPaid: boolean;
    public notes: string;
    public isRecurring: boolean;
    public paymentMethod: ExpensePaymentMethodDto;
    public category: ExpenseCategoryDto;
    public subcategory: ExpenseSubcategoryDto;
    public tags: ExpenseTagDto[];
}

export class ListRecurringExpensesRequest extends ListRequest {}

export class ListRecurringExpensesResponse extends ListResponse<RecurringExpenseDto> {}

export class CreateOrUpdateRecurringExpenseRequest {
    recurringExpense: RecurringExpenseDto;
}

export class CreateOrUpdateRecurringExpenseResponse {
    recurringExpenseId: string;
}
export class DeleteRecurringExpenseRequest {
    recurringExpenseId: string;
}
