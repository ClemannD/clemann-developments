import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useGetActiveOptions from '../../api-services/active-options/getActiveOptions.service';
import useGetMonth from '../../api-services/month/getMonth.service';
import Layout from '../../components/layout/layout.component';
import LoadingScreen from '../../components/navigation/loading-screen/loading-screen';
import ActiveOptionsContext from '../../context/active-options.context';
import AddMonthSection from './add-month.section';
import MonthExpensesSection from './month-expenses.section';
import MonthSummarySection from './month-summary.section';

export default function MonthPage() {
    const router = useRouter();
    const getMonthService = useGetMonth();
    const getActiveOptionsService = useGetActiveOptions();

    const [month, setMonth] = useState<number | null>(null);
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        const { month, year } = router.query;

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

    const fetchActiveOptions = () => {
        getActiveOptionsService.mutate({});
    };
    useEffect(() => {
        fetchActiveOptions();
    }, []);

    const fetchMonth = (month: number, year: number) => {
        getMonthService.mutateAsync({ month, year });
    };

    if (!getMonthService.data) {
        return <LoadingScreen></LoadingScreen>;
    }

    return (
        <Layout>
            <ActiveOptionsContext.Provider
                value={{
                    activeCategories: getActiveOptionsService.data?.categories,
                    activeTags: getActiveOptionsService.data?.tags,
                    activePaymentMethods:
                        getActiveOptionsService.data?.paymentMethods,
                    fetchActiveOptions: fetchActiveOptions
                }}
            >
                <div className="container">
                    <div className="header">
                        <h2>
                            {new Intl.DateTimeFormat('en-US', {
                                month: 'long',
                                year: 'numeric'
                            }).format(new Date(year, month - 1))}
                        </h2>
                    </div>

                    {!!getMonthService.data?.month ? (
                        <div className="row">
                            <div className="col-12">
                                <MonthSummarySection
                                    monthDto={getMonthService.data.month}
                                ></MonthSummarySection>
                            </div>
                            <div className="col-12">
                                <MonthExpensesSection
                                    monthDto={getMonthService.data.month}
                                ></MonthExpensesSection>
                            </div>
                        </div>
                    ) : (
                        <AddMonthSection
                            year={year}
                            month={month}
                            fetchMonth={fetchMonth}
                        ></AddMonthSection>
                    )}
                </div>
            </ActiveOptionsContext.Provider>
        </Layout>
    );
}
