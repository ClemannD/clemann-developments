import { CategoryDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../../../entities/account.entity';
import { Category } from '../../../entities/category.entity';
import { Subcategory } from '../../../entities/subcategory.entity';

@Injectable()
export class ConfigurationCategoriesService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        @InjectRepository(Subcategory)
        private subcategoryRepository: Repository<Subcategory>,
        @InjectRepository(Account)
        private accountRepository: Repository<Account>
    ) {}

    private sortByName(
        a: Category | Subcategory,
        b: Category | Subcategory
    ): number {
        if (a.name < b.name) {
            return -1;
        }

        if (a.name > b.name) {
            return 1;
        }

        return 0;
    }

    public async getCategories(accountId: string): Promise<CategoryDto[]> {
        const account = await this.accountRepository.findOne(accountId, {
            relations: ['categories', 'categories.subcategories']
        });

        if (!account) {
            throw new Error('Account does not exist.');
        }

        const activeCategories = account.categories
            .filter((cat) => cat.active)
            .sort(this.sortByName);

        const inactiveCategories = account.categories
            .filter((cat) => !cat.active)
            .sort(this.sortByName);

        return [...activeCategories, ...inactiveCategories].map((category) => ({
            categoryId: category.categoryId,
            name: category.name,
            color: category.color,
            active: category.active,
            subcategories: [
                ...category.subcategories
                    .filter((subcategory) => subcategory.active)
                    .sort(this.sortByName)
                    .map((subcategory) => {
                        return {
                            subcategoryId: subcategory.subcategoryId,
                            name: subcategory.name,
                            active: subcategory.active
                        };
                    }),
                ...category.subcategories
                    .filter((subcategory) => !subcategory.active)
                    .sort(this.sortByName)
                    .map((subcategory) => {
                        return {
                            subcategoryId: subcategory.subcategoryId,
                            name: subcategory.name,
                            active: subcategory.active
                        };
                    })
            ]
        }));
    }

    public async createCategory(
        accountId: string,
        name: string,
        color: string
    ): Promise<void> {
        const account = await this.accountRepository.findOne(accountId);

        if (!account) {
            throw new Error('Account does not exist.');
        }

        const category = new Category();
        category.name = name;
        category.color = color;
        category.active = true;
        category.account = account;

        await this.categoryRepository.save(category);
    }

    public async updateCategory(
        accountId: string,
        categoryId: string,
        name: string,
        color: string
    ): Promise<void> {
        const category = await this.categoryRepository.findOne(categoryId, {
            relations: ['account']
        });

        if (!category) {
            throw new Error('Category does not exist.');
        }

        if (category.account.accountId !== accountId) {
            throw new Error('Category does not belong to account.');
        }

        category.name = name;
        category.color = color;

        await this.categoryRepository.save(category);
    }

    public async createSubcategory(
        accountId: string,
        categoryId: string,
        name: string
    ): Promise<void> {
        const category = await this.categoryRepository.findOne(categoryId, {
            relations: ['account']
        });

        if (!category) {
            throw new Error('Category does not exist.');
        }

        if (category.account.accountId !== accountId) {
            throw new Error('Category does not belong to account.');
        }

        const subcategory = new Subcategory();
        subcategory.name = name;
        subcategory.active = true;
        subcategory.category = category;

        await this.subcategoryRepository.save(subcategory);
    }

    public async updateSubcategory(
        accountId: string,
        subcategoryId: string,
        name: string,
        active: boolean
    ): Promise<void> {
        const subcategory = await this.subcategoryRepository.findOne(
            subcategoryId,
            {
                relations: ['category', 'category.account']
            }
        );

        if (!subcategory) {
            throw new Error('Subcategory does not exist.');
        }

        if (subcategory.category.account.accountId !== accountId) {
            throw new Error('Subcategory does not belong to account.');
        }

        subcategory.name = name;
        subcategory.active = active;

        await this.subcategoryRepository.save(subcategory);
    }

    public async setCategoryActive(
        accountId: string,
        categoryId: string,
        active: boolean
    ): Promise<void> {
        const category = await this.categoryRepository.findOne(categoryId, {
            relations: ['account']
        });

        if (!category) {
            throw new Error('Category does not exist.');
        }

        if (category.account.accountId !== accountId) {
            throw new Error('Category does not belong to account.');
        }

        category.active = active;

        await this.categoryRepository.save(category);
    }

    public async setSubcategoryActive(
        accountId: string,
        subcategoryId: string,
        active: boolean
    ): Promise<void> {
        const subcategory = await this.subcategoryRepository.findOne(
            subcategoryId,
            {
                relations: ['category']
            }
        );

        if (!subcategory) {
            throw new Error('Subcategory does not exist.');
        }

        if (subcategory.category.account.accountId !== accountId) {
            throw new Error('Subcategory does not belong to account.');
        }

        subcategory.active = active;

        await this.subcategoryRepository.save(subcategory);
    }
}
