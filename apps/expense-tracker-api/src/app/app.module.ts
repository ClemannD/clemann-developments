import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { Category } from '../entities/category.entity';
import { Expense } from '../entities/expense.entity';
import { PaymentMethod } from '../entities/payment-method.entity';
import { RecurringExpense } from '../entities/recurring-expense.entity';
import { Subcategory } from '../entities/subcategory.entity';
import { Tag } from '../entities/tag.entity';
import { User } from '../entities/user.entity';

import { Month } from '../entities/month.entity';
import { ActiveOptionsModule } from '../features/active-options/active-options.module';
import { AuthModule } from '../features/auth/auth.module';
import { ConfigurationModule } from '../features/configuration/configuration.module';
import { MonthModule } from '../features/month/month.module';
import { SummaryModule } from '../features/summary/summary.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.local.env'
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                url:
                    configService.get<string>(
                        'EXPENSE_TRACKER_API_DATABASE_URL'
                    ) || configService.get<string>('DATABASE_URL'),
                type: 'postgres',
                entities: [
                    User,
                    Account,
                    Expense,
                    Category,
                    Subcategory,
                    Tag,
                    RecurringExpense,
                    PaymentMethod,
                    Month
                ],
                synchronize: false,
                retryDelay: 30000,
                ssl: true,
                extra: {
                    ssl: true
                }
            })
        }),
        HttpModule,
        AuthModule,
        ConfigurationModule,
        MonthModule,
        ActiveOptionsModule,
        SummaryModule
    ]
})
export class AppModule {}
