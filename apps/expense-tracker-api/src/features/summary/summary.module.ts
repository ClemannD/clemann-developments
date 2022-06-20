import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../../entities/account.entity';
import { AuthModule } from '../auth/auth.module';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';
import { Month } from '../../entities/month.entity';
import { Expense } from '../../entities/expense.entity';
import { ActiveOptionsModule } from '../active-options/active-options.module';
@Module({
    imports: [
        TypeOrmModule.forFeature([
            Expense,
            // RecurringExpense,
            Month,
            Account
            // Category,
            // Subcategory,
            // Tag,
            // PaymentMethod
        ]),
        AuthModule,
        ActiveOptionsModule
    ],
    controllers: [SummaryController],
    providers: [SummaryService]
})
export class SummaryModule {}
