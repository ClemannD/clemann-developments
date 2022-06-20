import { YearSummaryDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import { createContext } from 'react';

export interface SummaryPageContextProps {
    yearSummary: YearSummaryDto;
    isThisYear: boolean;
}

export const SummaryPageContext = createContext<SummaryPageContextProps>({
    yearSummary: null,
    isThisYear: false
});
