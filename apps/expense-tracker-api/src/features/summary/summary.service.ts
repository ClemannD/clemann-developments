import { YearSummaryDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../../entities/account.entity';

@Injectable()
export class SummaryService {
    constructor(
        @InjectRepository(Account)
        private readonly _accountRepository: Repository<Account>
    ) {}

    public async getYearSummary(
        accountId: string,
        year: number
    ): Promise<YearSummaryDto> {
        const account = await this._accountRepository.findOne(accountId, {
            relations: [
                'months',
                'months.expenses',
                'months.expenses.category',
                'months.expenses.subcategory'
            ]
        });

        return null;
        // return {
        //     year,
        //     yearTotalCents: account.yearTotalCents,
        //     monthlyAverageCents: account.monthlyAverageCents,
        //     categorySummaries: account.categorySummaries
        // };
    }
}
