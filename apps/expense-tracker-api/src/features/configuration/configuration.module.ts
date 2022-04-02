import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../../entities/account.entity';
import { Category } from '../../entities/category.entity';
import { PaymentMethod } from '../../entities/payment-method.entity';
import { RecurringExpense } from '../../entities/recurring-expense.entity';
import { Subcategory } from '../../entities/subcategory.entity';
import { Tag } from '../../entities/tag.entity';
import { AuthModule } from '../auth/auth.module';
import { ExpenseSortingModule } from '../expense-sorting/expense-sorting.module';
import { ConfigurationCategoriesController } from './categories/configuration-categories.controller';
import { ConfigurationCategoriesService } from './categories/configuration-categories.service';
import { ConfigurationPaymentMethodsController } from './payment-methods/configuration-payment-methods.controller';
import { ConfigurationPaymentMethodsService } from './payment-methods/configuration-payment-methods.service';
import { ConfigurationRecurringExpensesController } from './recurring-expenses/configuration-recurring-expenses.controller';
import { ConfigurationRecurringExpensesService } from './recurring-expenses/configuration-recurring-expenses.service';
import { ConfigurationTagsController } from './tags/configuration-tags.controller';
import { ConfigurationTagsService } from './tags/configuration-tags.servce';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Account,
            Category,
            Subcategory,
            Tag,
            PaymentMethod,
            RecurringExpense
        ]),
        AuthModule,
        ExpenseSortingModule
    ],
    controllers: [
        ConfigurationCategoriesController,
        ConfigurationTagsController,
        ConfigurationPaymentMethodsController,
        ConfigurationRecurringExpensesController
    ],
    providers: [
        ConfigurationCategoriesService,
        ConfigurationTagsService,
        ConfigurationPaymentMethodsService,
        ConfigurationRecurringExpensesService
    ]
})
export class ConfigurationModule {}
