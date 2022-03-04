import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { Category } from '../entities/category.entity';
import { Expense } from '../entities/expense.entity';
import { RecurringExpense } from '../entities/recurring-expense.entity';
import { Subcategory } from '../entities/subcategory.entity';
import { Tag } from '../entities/tag.entity';
import { User } from '../entities/user.entity';
import { PaymentMethod } from '../entities/payment-method.entity';

import { AuthModule } from '../features/auth/auth.module';

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
                    configService.get<string>('SET_SCORE_API_DATABASE_URL') ||
                    configService.get<string>('DATABASE_URL'),
                type: 'postgres',
                entities: [
                    User,
                    Account,
                    Category,
                    Expense,
                    Subcategory,
                    Tag,
                    RecurringExpense,
                    PaymentMethod
                ],
                synchronize: false,
                retryDelay: 30000,
                ssl: true,
                extra: {
                    ssl: true
                }
            })
        }),
        AuthModule,
        HttpModule
    ]
})
export class AppModule {}
