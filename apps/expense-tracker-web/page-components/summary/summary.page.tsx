import { useEffect, useState } from 'react';
import useGetYearSummary from '../../api-services/summary/getYearSummary.service';
import Layout from '../../components/layout/layout.component';
import SummaryCategoriesSection from './categories/summary-categories.section';
import SummaryHeaderSection from './summary-header.section';
import { SummaryPageContext } from './summary-page.context';

export default function SummaryPage() {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [isThisYear, setIsThisYear] = useState(false);
    const getYearSummaryService = useGetYearSummary();

    useEffect((): void => {
        getYearSummaryService.mutate({ year: currentYear });

        setIsThisYear(currentYear === new Date().getFullYear());
    }, [currentYear]);

    return (
        <Layout>
            <SummaryPageContext.Provider
                value={{
                    yearSummary: getYearSummaryService.data?.yearSummary,
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
