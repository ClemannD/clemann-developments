class User {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    account: Account;
}

class Account {
    name: string;
    categories: Category[];
}

class Expense {
    name: string;
    date: Date;
    year: number;
    month: number;
    amountCents: number;
    category: Category;
    subCategory: SubCategory;
    tags: Tag[];
    split: boolean;
    paid: boolean;
    notes: string;
}

class RecurringExpense {
    name: string;
    dayOfMonth: number;
    amountCents: number;
    category: Category;
    subCategory: SubCategory;
}

class Category {
    categoryId: string;
    name: string;
    color: string;
    active: boolean;
    account: Account;
    subCategories: SubCategory[];
}

class SubCategory {
    subCategoryId: string;
    name: string;
    active: boolean;
}

class Tag {
    tagId: string;
    name: string;
    active: boolean;
}

class PaymentMethod {
    paymentMethodId: string;
    name: string;
    active: boolean;
    account: Account;
}
