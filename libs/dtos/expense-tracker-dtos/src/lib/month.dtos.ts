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
    public expenseId?: string;
    public name: string;
    public day: number;
    public amountCents: number;
    public split?: number | null;
    public splitPaid?: boolean;
    public notes?: string;
    public isRecurring?: boolean;
    public paymentMethod?: ExpensePaymentMethodDto;
    public category?: ExpenseCategoryDto;
    public subcategory?: ExpenseSubcategoryDto;
    public tags?: ExpenseTagDto[];
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

export class TagSummaryDto {
    public tagId: string;
    public name: string;
    public totalCents: number;
}

export class SubcategorySummaryDto {
    public subcategoryId: string;
    public name: string;
    public totalCents: number;
}

export class CategorySummaryDto {
    public categoryId: string;
    public name: string;
    public color: string;
    public totalCents: number;
    public subcategorySummaries?: SubcategorySummaryDto[];
}

export class SplitSummaryDto {
    totalSplitAmountCents: number;
    totalPaidSplitAmountCents: number;
    totalUnpaidSplitAmountCents: number;
}

export class PaymentMethodSummaryDto {
    public paymentMethodId: string;
    public name: string;
    public totalCents: number;
}

export class MonthSummaryDto {
    public thisMonthTotalCents: number;
    public lastMonthTotalCents?: number;
    public avgMonthTotalCents?: number;
    public categorySummaries: CategorySummaryDto[];
    public tagSummaries: TagSummaryDto[];
    public splitSummary?: SplitSummaryDto;
    public paymentMethodSummaries?: PaymentMethodSummaryDto[];
}

export class GetMonthSummaryRequest {
    public monthId: string;
}

export class GetMonthSummaryResponse {
    public monthSummary: MonthSummaryDto;
}
