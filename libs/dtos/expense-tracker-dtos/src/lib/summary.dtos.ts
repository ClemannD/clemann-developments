export class SubcategoryYearSummaryDto {
    public subcategoryId: string;
    public name: string;
    public totalCents: number;
}

export class CategoryYearSummaryDto {
    public categoryId: string;
    public name: string;
    public color: string;
    public 
    public subcategorySummaries?: SubcategoryYearSummaryDto[];
}

export class MonthSummaryDto {
    public monthTotalCents: number;
    public categorySummaries: CategoryYearSummaryDto[];
}

export class YearSummaryDto {
    public year: number;
    public yearTotalCents: number;
    public monthlyAverageCents?: number;
    public categorySummaries?: CategoryYearSummaryDto[];
}
