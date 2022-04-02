import { Module } from '@nestjs/common';
import { ExpenseSortingService } from './expense-sorting.service';

@Module({
    imports: [],
    providers: [ExpenseSortingService],
    exports: [ExpenseSortingService]
})
export class ExpenseSortingModule {}
