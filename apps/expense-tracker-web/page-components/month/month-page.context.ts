import {
    ExpenseDto,
    MonthDto,
    MonthSummaryDto
} from '@clemann-developments/dtos/expense-tracker-dtos';
import { createContext } from 'react';

export interface MonthPageContextProps {
    monthDto: MonthDto;
    fetchMonth: (month: number, year: number) => void;
    setSummaryExpenses: (expenses: ExpenseDto[]) => void;
    monthSummary: MonthSummaryDto;
}

export const MonthPageContext = createContext<MonthPageContextProps>({
    monthDto: null,
    fetchMonth: () => {},
    setSummaryExpenses: () => {},
    monthSummary: null
});
