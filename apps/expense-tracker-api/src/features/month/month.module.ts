import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../../entities/account.entity';
import { Category } from '../../entities/category.entity';
import { Expense } from '../../entities/expense.entity';
import { Month } from '../../entities/month.entity';
import { PaymentMethod } from '../../entities/payment-method.entity';
import { RecurringExpense } from '../../entities/recurring-expense.entity';
import { Subcategory } from '../../entities/subcategory.entity';
import { Tag } from '../../entities/tag.entity';
import { AuthModule } from '../auth/auth.module';
import { ExpenseSortingModule } from '../expense-sorting/expense-sorting.module';
import { MonthSummaryService } from './month-summary.service';
import { MonthController } from './month.controller';
import { MonthService } from './month.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Expense,
            RecurringExpense,
            Month,
            Account,
            Category,
            Subcategory,
            Tag,
            PaymentMethod
        ]),
        AuthModule,
        ExpenseSortingModule
    ],
    controllers: [MonthController],
    providers: [MonthService, MonthSummaryService]
})
export class MonthModule {}
