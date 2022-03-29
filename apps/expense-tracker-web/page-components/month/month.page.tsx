import { Loading } from '@clemann-developments/react/components/ui-elements';
import { useAuthGuard } from '@clemann-developments/react/hooks/next/use-auth-guard';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useGetActiveOptions from '../../api-services/active-options/getActiveOptions.service';
import useGetMonth from '../../api-services/month/getMonth.service';
import Layout from '../../components/layout/layout.component';
import ActiveOptionsContext from '../../context/active-options.context';
import AddMonthSection from './add-month.section';
import MonthCategoryBreakdownSection from './month-category-breakdown.section';
import MonthExpensesSection from './month-expenses.section';
import MonthHeaderSection from './month-header.section';
import { MonthPageContext } from './month-page.context';
import MonthPaymentMethodsBreakdownSection from './month-payment-methods-breakdown.section';
import MonthSplitBreakdownSection from './month-split-breakdown.section';
import MonthTagsBreakdownSection from './month-tags-breakdown.section';
import useMonthSummary from './useMonthSummary.hook';

export default function MonthPage() {
    useAuthGuard();
    const router = useRouter();

    const getMonthService = useGetMonth();
    const getActiveOptionsService = useGetActiveOptions();

    const [month, setMonth] = useState<number | null>(null);
    const [year, setYear] = useState<number | null>(null);

    const { monthSummary, setSummaryExpenses } = useMonthSummary();

    useEffect(() => {
        const { month, year } = router.query;
        setSummaryExpenses(null);
        try {
            const parsedMonth = parseInt(month as string, 10);
            const parsedYear = parseInt(year as string, 10);

            setMonth(parsedMonth);
            setYear(parsedYear);

            fetchMonth(parsedMonth, parsedYear);
        } catch (e) {
            router.push(
                `/month/${new Date().getFullYear()}/${
                    new Date().getMonth() + 1
                }`
            );
        }
    }, [router.query]);

    useEffect(() => {
        fetchActiveOptions();
    }, []);

    useEffect(() => {
        if (!getMonthService.data?.month) {
            setSummaryExpenses([]);
        }
    }, [getMonthService.data?.month]);

    const fetchMonth = (month: number, year: number) => {
        getMonthService.mutateAsync({ month, year });
    };

    const fetchActiveOptions = () => {
        getActiveOptionsService.mutate({});
    };

    return (
        <Layout>
            <MonthPageContext.Provider
                value={{
                    monthDto: {
                        month,
                        year,
                        monthId: getMonthService.data?.month?.monthId
                    },
                    fetchMonth,
                    monthSummary,
                    setSummaryExpenses
                }}
            >
                <ActiveOptionsContext.Provider
                    value={{
                        activeCategories:
                            getActiveOptionsService.data?.categories,
                        activeTags: getActiveOptionsService.data?.tags,
                        activePaymentMethods:
                            getActiveOptionsService.data?.paymentMethods,
                        fetchActiveOptions: fetchActiveOptions
                    }}
                >
                    <div className="container">
                        <div className="col-12">
                            <MonthHeaderSection></MonthHeaderSection>
                        </div>
                        {getMonthService.isLoading ? (
                            <Loading color="#052665"></Loading>
                        ) : !!getMonthService.data?.month ? (
                            <div className="row">
                                <div className="col-12">
                                    <MonthExpensesSection></MonthExpensesSection>
                                </div>
                                <div className="col-12 col-sm-6 col-md-3">
                                    <MonthCategoryBreakdownSection></MonthCategoryBreakdownSection>
                                </div>
                                <div className="col-12 col-sm-6 col-md-3">
                                    <MonthTagsBreakdownSection></MonthTagsBreakdownSection>
                                </div>
                                <div className="col-12 col-sm-6 col-md-3">
                                    <MonthPaymentMethodsBreakdownSection></MonthPaymentMethodsBreakdownSection>
                                </div>
                                <div className="col-12 col-sm-6 col-md-3">
                                    <MonthSplitBreakdownSection></MonthSplitBreakdownSection>
                                </div>
                            </div>
                        ) : (
                            <AddMonthSection></AddMonthSection>
                        )}
                    </div>
                </ActiveOptionsContext.Provider>
            </MonthPageContext.Provider>
        </Layout>
    );
}
