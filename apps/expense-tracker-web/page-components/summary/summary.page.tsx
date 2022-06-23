import { YearSummaryDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import { useEffect, useState } from 'react';
import useGetYearSummary from '../../api-services/summary/getYearSummary.service';
import Layout from '../../components/layout/layout.component';
import SummaryCategoriesSection from './categories/summary-categories.section';
import SummaryHeaderSection from './summary-header.section';
import { SummaryPageContext } from './summary-page.context';
import SummaryTagsSection from './tags/summary-tags.section';

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
                <div
                    className="container"
                    style={{
                        paddingBottom: '20rem'
                    }}
                >
                    <SummaryHeaderSection />
                    <SummaryCategoriesSection />
                    <SummaryTagsSection />
                </div>
            </SummaryPageContext.Provider>
        </Layout>
    );
}
