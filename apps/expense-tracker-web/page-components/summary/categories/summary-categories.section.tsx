import { CategoryYearSummaryDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import {
    Button,
    ButtonAppearance
} from '@clemann-developments/react/components/interaction/button';
import { useContext, useEffect, useState } from 'react';
import { SummaryPageContext } from '../summary-page.context';
import SummaryCategoriesCharts from './summary-categories-charts.component';
import SummaryCategoriesTable from './summary-categories-table.component';
import styles from './summary-categories.module.scss';

export default function SummaryCategoriesSection() {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
        null
    );
    const [selectedCategory, setSelectedCategory] =
        useState<CategoryYearSummaryDto | null>(null);
    const [showSubCategories, setShowSubCategories] = useState(false);

    const { yearSummary } = useContext(SummaryPageContext);

    useEffect(() => {
        if (yearSummary) {
            setSelectedCategory(
                yearSummary.categorySummaries.find(
                    (category) => category.categoryId === selectedCategoryId
                )
            );
        }
    }, [yearSummary, selectedCategoryId]);

    useEffect(() => {
        if (yearSummary) {
            setSelectedCategoryId(yearSummary.categorySummaries[0].categoryId);
        }
    }, [yearSummary]);

    return (
        <div className={styles.summaryCategories}>
            <div className={styles.summaryCategoriesHeader}>
                <h3
                    style={{
                        marginBottom: '2rem'
                    }}
                >
                    Category Breakdown
                </h3>

                <div className={styles.tableControls}>
                    <Button
                        clickHandler={() =>
                            setShowSubCategories(!showSubCategories)
                        }
                        appearance={ButtonAppearance.Secondary}
                    >
                        {showSubCategories
                            ? 'Hide Subcategories'
                            : 'Show Subcategories'}
                    </Button>
                </div>
            </div>
            <SummaryCategoriesTable
                showSubCategories={showSubCategories}
                onCategoryClick={(categoryId) => {
                    setSelectedCategoryId(categoryId);
                }}
            ></SummaryCategoriesTable>

            <SummaryCategoriesCharts
                selectedCategory={selectedCategory}
            ></SummaryCategoriesCharts>
        </div>
    );
}
