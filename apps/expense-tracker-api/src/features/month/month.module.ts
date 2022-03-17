import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../../entities/account.entity';
import { Expense } from '../../entities/expense.entity';
import { Month } from '../../entities/month.entity';
import { RecurringExpense } from '../../entities/recurring-expense.entity';
import { AuthModule } from '../auth/auth.module';
import { MonthController } from './month.controller';
import { MonthService } from './month.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Expense, RecurringExpense, Month, Account]),
        AuthModule
    ],
    controllers: [MonthController],
    providers: [MonthService]
})
export class MonthModule {}
