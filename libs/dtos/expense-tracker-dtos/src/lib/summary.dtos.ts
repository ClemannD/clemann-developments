export class TagYearSummaryDto {
    public tagId: string;
    public name: string;
    public totalCents: number;
    public monthTotalsCents: number[];
}

export class SubcategoryYearSummaryDto {
    public subcategoryId: string;
    public name: string;
    public totalCents: number;
    public monthTotalsCents: number[];
}

export class CategoryYearSummaryDto {
    public categoryId: string;
    public name: string;
    public color: string;
    public totalCents: number;
    public monthTotalsCents: number[];

    public subcategorySummaries?: SubcategoryYearSummaryDto[];
}
export class YearSummaryDto {
    public year: number;
    public yearTotalCents: number;
    public monthTotalsCents: number[];
    public categorySummaries?: CategoryYearSummaryDto[];
    public tagSummaries?: TagYearSummaryDto[];
}

export class GetYearSummaryRequest {
    public year: number;
}

export class GetYearSummaryResponse {
    public yearSummary: YearSummaryDto;
}
