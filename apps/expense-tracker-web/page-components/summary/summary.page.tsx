import { YearSummaryDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import { useEffect, useState } from 'react';
import useGetYearSummary from '../../api-services/summary/getYearSummary.service';
import Layout from '../../components/layout/layout.component';
import SummaryCategoriesSection from './categories/summary-categories.section';
import SummaryHeaderSection from './summary-header.section';
import { SummaryPageContext } from './summary-page.context';

export default function SummaryPage() {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [isThisYear, setIsThisYear] = useState(false);
    const [yearSummary, setYearSummary] = useState<YearSummaryDto>();
    const getYearSummaryService = useGetYearSummary();

    useEffect((): void => {
        setYearSummary(null);
        getYearSummaryService.mutate({ year: currentYear });

        setIsThisYear(currentYear === new Date().getFullYear());
    }, [currentYear]);

    useEffect((): void => {
        console.log('getYearSummaryService.data', getYearSummaryService.data);
        if (getYearSummaryService.data) {
            setYearSummary(getYearSummaryService.data.yearSummary);
        }
    }, [getYearSummaryService.data]);

    return (
        <Layout>
            <SummaryPageContext.Provider
                value={{
                    yearSummary,
                    currentYear,
                    setCurrentYear,
                    isThisYear
                }}
            >
                <div className="container">
                    <SummaryHeaderSection></SummaryHeaderSection>

                    <SummaryCategoriesSection></SummaryCategoriesSection>
                </div>
            </SummaryPageContext.Provider>
        </Layout>
    );
}
