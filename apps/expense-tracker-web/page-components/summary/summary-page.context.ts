import { YearSummaryDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import { createContext } from 'react';

export interface SummaryPageContextProps {
    yearSummary: YearSummaryDto;
    currentYear: number;
    setCurrentYear: (year: number) => void;
    isThisYear: boolean;
}

export const SummaryPageContext = createContext<SummaryPageContextProps>({
    yearSummary: null,
    currentYear: 0,
    setCurrentYear: () => {},
    isThisYear: false
});
