import {
    Column,
    ColumnHeader,
    Table,
    TableRow
} from '@clemann-developments/react/components/tables';
import {
    Pill,
    PillColor
} from '@clemann-developments/react/components/ui-elements';
import { useContext } from 'react';
import { SummaryPageContext } from '../summary-page.context';
import styles from './summary-categories.module.scss';

export default function SummaryCategoriesTable({
    showSubCategories,
    onCategoryClick
}: {
    showSubCategories: boolean;
    onCategoryClick: (categoryId: string) => void;
}) {
    const { yearSummary } = useContext(SummaryPageContext);

    const centsToDollars = (cents: number) => {
        return (cents / 100).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        });
    };

    return (
        <Table
            horizontalScroll
            isLoading={!yearSummary}
            headers={
                <>
                    <ColumnHeader header="Category"></ColumnHeader>
                    {[
                        'Jan',
                        'Feb',
                        'Mar',
                        'Apr',
                        'May',
                        'Jun',
                        'Jul',
                        'Aug',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Dec'
                    ].map((month, index) => (
                        <ColumnHeader
                            key={index}
                            header={month}
                            alignRight
                        ></ColumnHeader>
                    ))}
                    <ColumnHeader header="Average" alignRight></ColumnHeader>
                    <ColumnHeader header="Total" alignRight></ColumnHeader>
                </>
            }
            rows={
                <>
                    {yearSummary?.categorySummaries.map((category) => (
                        <>
                            <TableRow
                                key={category.categoryId}
                                clickHandler={() =>
                                    onCategoryClick(category.categoryId)
                                }
                            >
                                <Column>
                                    <Pill colorHex={category.color}>
                                        {category.name}
                                    </Pill>
                                </Column>
                                {category.monthTotalsCents.map(
                                    (monthTotalCents, index) => (
                                        <Column key={index} alignRight>
                                            {centsToDollars(monthTotalCents)}
                                        </Column>
                                    )
                                )}
                                <Column alignRight>
                                    <b>
                                        {centsToDollars(
                                            category.totalCents / 12
                                        )}
                                    </b>
                                </Column>
                                <Column alignRight>
                                    <b>{centsToDollars(category.totalCents)}</b>
                                </Column>
                            </TableRow>
                            {showSubCategories &&
                                category.subcategorySummaries.map(
                                    (subcategory) => (
                                        <TableRow
                                            key={subcategory.subcategoryId}
                                            clickHandler={() =>
                                                onCategoryClick(
                                                    category.categoryId
                                                )
                                            }
                                        >
                                            <Column>
                                                <Pill
                                                    color={PillColor.GrayLight}
                                                    style={{
                                                        marginLeft: '1rem'
                                                    }}
                                                >
                                                    {subcategory.name}
                                                </Pill>
                                            </Column>
                                            {subcategory.monthTotalsCents.map(
                                                (monthTotalCents, index) => (
                                                    <Column
                                                        key={index}
                                                        alignRight
                                                    >
                                                        <div
                                                            className={`${styles.subcategoryAmount}`}
                                                        >
                                                            {centsToDollars(
                                                                monthTotalCents
                                                            )}
                                                        </div>
                                                    </Column>
                                                )
                                            )}
                                            <Column alignRight>
                                                <div
                                                    className={`${styles.subcategoryAmount} bold`}
                                                >
                                                    <b>
                                                        {centsToDollars(
                                                            subcategory.totalCents /
                                                                12
                                                        )}
                                                    </b>
                                                </div>
                                            </Column>
                                            <Column alignRight>
                                                <div
                                                    className={`${styles.subcategoryAmount} bold`}
                                                >
                                                    {centsToDollars(
                                                        subcategory.totalCents
                                                    )}
                                                </div>
                                            </Column>
                                        </TableRow>
                                    )
                                )}
                        </>
                    ))}
                    {yearSummary && (
                        <TableRow>
                            <Column>Total</Column>
                            {yearSummary.monthTotalsCents.map(
                                (monthTotalCents, index) => (
                                    <Column key={index} alignRight>
                                        <b>
                                            {' '}
                                            {centsToDollars(monthTotalCents)}
                                        </b>
                                    </Column>
                                )
                            )}
                            <Column alignRight>
                                <b>
                                    {centsToDollars(
                                        yearSummary.yearTotalCents / 12
                                    )}
                                </b>
                            </Column>
                            <Column alignRight>
                                <b>
                                    {centsToDollars(yearSummary.yearTotalCents)}
                                </b>
                            </Column>
                        </TableRow>
                    )}
                </>
            }
        ></Table>
    );
}
