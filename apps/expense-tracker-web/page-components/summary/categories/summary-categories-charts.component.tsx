import { CategoryYearSummaryDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import { Loading } from '@clemann-developments/react/components/ui-elements';
import { useContext, useEffect, useState } from 'react';
import ChartCard from '../../../components/charts/chart-card/chart-card.component';
import YearSpendChart from '../../../components/charts/year-spend-chart/year-spend-chart.component';
import { SummaryPageContext } from '../summary-page.context';

export default function SummaryCategoriesCharts({
    selectedCategory
}: {
    selectedCategory: CategoryYearSummaryDto;
}) {
    const { isThisYear } = useContext(SummaryPageContext);

    return (
        <div
            style={{
                paddingTop: '3rem'
            }}
        >
            <h5
                style={{
                    marginBottom: '2rem'
                }}
            >
                Select a Category above to view it's graph
            </h5>

            {selectedCategory ? (
                <>
                    <div
                        style={{
                            marginBottom: '2rem'
                        }}
                    >
                        <ChartCard
                            chartTitle={selectedCategory.name}
                            totalTitle={isThisYear ? 'YTD' : 'Total'}
                            isThisYear={isThisYear}
                            totalCents={selectedCategory.totalCents}
                            height="25rem"
                        >
                            <YearSpendChart
                                monthTotalsCents={
                                    selectedCategory.monthTotalsCents
                                }
                                colorHex={selectedCategory.color}
                            />
                        </ChartCard>
                    </div>
                    <div className="row">
                        {selectedCategory.subcategorySummaries?.map(
                            (subcategorySummary) => (
                                <div
                                    key={subcategorySummary.subcategoryId}
                                    className="col-12 col-md-6 col-lg-4"
                                    style={{
                                        marginBottom: '2rem'
                                    }}
                                >
                                    <ChartCard
                                        chartTitle={subcategorySummary.name}
                                        totalTitle="Total"
                                        isThisYear={isThisYear}
                                        totalCents={
                                            subcategorySummary.totalCents
                                        }
                                        height="20rem"
                                    >
                                        <YearSpendChart
                                            monthTotalsCents={
                                                subcategorySummary.monthTotalsCents
                                            }
                                            colorHex={'#d9dee7'}
                                        />
                                    </ChartCard>
                                </div>
                            )
                        )}
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}
