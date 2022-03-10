export class SubcategoryDto {
    public subcategoryId: string;
    public name: string;
    public active: boolean;
}

export class CategoryDto {
    categoryId: string;
    name: string;
    color: string;
    active: boolean;
    subcategories: SubcategoryDto[];
}

export class GetCategoriesResponse {
    categories: CategoryDto[];
}

export class CreateCategoryRequest {
    name: string;
    color: string;
}

export class UpdateCategoryRequest {
    categoryId: string;
    name: string;
    color: string;
}

export class CreateSubcategoryRequest {
    categoryId: string;
    name: string;
}

export class UpdateSubcategoryRequest {
    subcategoryId: string;
    name: string;
    active: boolean;
}

export class SetCategoryActiveRequest {
    categoryId: string;
    active: boolean;
}

export class TagDto {
    tagId: string;
    name: string;
    active: boolean;
}

export class GetTagsResponse {
    tags: TagDto[];
}

export class CreateTagRequest {
    name: string;
}

export class UpdateTagRequest {
    tagId: string;
    name: string;
    active: boolean;
}
