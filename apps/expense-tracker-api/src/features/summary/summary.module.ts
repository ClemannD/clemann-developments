import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../../entities/account.entity';
import { AuthModule } from '../auth/auth.module';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            // Expense,
            // RecurringExpense,
            // Month,
            Account
            // Category,
            // Subcategory,
            // Tag,
            // PaymentMethod
        ]),
        AuthModule
    ],
    controllers: [SummaryController],
    providers: [SummaryService]
})
export class SummaryModule {}
