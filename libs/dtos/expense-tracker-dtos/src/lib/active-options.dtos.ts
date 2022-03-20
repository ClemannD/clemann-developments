export class ActiveSubcategoryDto {
    subcategoryId: string;
    name: string;
}

export class ActiveCategoryDto {
    categoryId: string;
    name: string;
    color: string;
    subcategories: ActiveSubcategoryDto[];
}

export class ActiveTagDto {
    tagId: string;
    name: string;
}

export class ActivePaymentMethodDto {
    paymentMethodId: string;
    name: string;
}

export class GetActiveOptionsResponse {
    categories: ActiveCategoryDto[];
    tags: ActiveTagDto[];
    paymentMethods: ActivePaymentMethodDto[];
}
