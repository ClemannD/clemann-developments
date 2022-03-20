import {
    ListRequest,
    ListResponse
} from '@clemann-developments/common-endpoint';

export class ExpensePaymentMethodDto {
    public paymentMethodId: string;
    public name: string;
}

export class ExpenseSubcategoryDto {
    public subcategoryId: string;
    public name: string;
}

export class ExpenseCategoryDto {
    public categoryId: string;
    public name: string;
    public color: string;
}

export class ExpenseTagDto {
    public tagId: string;
    public name: string;
}

export class ExpenseDto {
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

export class MonthDto {
    public monthId: string;
    public year: number;
    public month: number;
}

export class GetMonthRequest {
    public month: number;
    public year: number;
}

export class GetMonthResponse {
    public month: MonthDto;
}

export class CreateMonthRequest {
    public month: number;
    public year: number;
}

export class ListMonthExpensesRequest extends ListRequest {
    public monthId: string;
}

export class ListMonthExpensesResponse extends ListResponse<ExpenseDto> {}

export class CreateOrUpdateExpenseRequest {
    expense: ExpenseDto;
    monthId: string;
}

export class CreateOrUpdateExpenseResponse {
    expenseId: string;
}

export class DeleteExpenseRequest {
    expenseId: string;
}
