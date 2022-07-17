import { TagYearSummaryDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import {
    Loading,
    Pill,
    PillColor
} from '@clemann-developments/react/components/ui-elements';
import { useContext, useEffect, useState } from 'react';
import ChartCard from '../../../components/charts/chart-card/chart-card.component';
import YearSpendChart from '../../../components/charts/year-spend-chart/year-spend-chart.component';
import { SummaryPageContext } from '../summary-page.context';
import styles from './summary-tags.module.scss';

export default function SummaryTagsSection() {
    const [selectedTagId, setSelectedTagId] = useState<string | null>(null);
    const [selectedTag, setSelectedTag] = useState<TagYearSummaryDto | null>(
        null
    );

    const { yearSummary, isThisYear } = useContext(SummaryPageContext);

    useEffect(() => {
        if (yearSummary) {
            setSelectedTag(
                yearSummary.tagSummaries.find(
                    (tag) => tag.tagId === selectedTagId
                )
            );
        }
    }, [yearSummary, selectedTagId]);

    useEffect(() => {
        if (yearSummary) {
            setSelectedTagId(yearSummary.tagSummaries[0].tagId);
        }
    }, [yearSummary]);

    const getCurrentMonth = () => {
        if (isThisYear) {
            return new Date().getMonth();
        }
    };
    return (
        <div className={styles.summaryTags}>
            <h3>Tag Breakdown</h3>

            <div className="row">
                <div className="col-12 col-md-4">
                    <div className={styles.summaryTagsPicker}>
                        <h5>Select a Tag to view its breakdown</h5>

                        <div className={styles.summaryTagsPickerList}>
                            {yearSummary?.tagSummaries.map((tag) => (
                                <div
                                    style={{
                                        // opacity: tagDto.active ? 1 : 0.5,
                                        marginBottom: '1rem',
                                        marginRight: '0.5rem'
                                    }}
                                >
                                    <Pill
                                        key={tag.tagId}
                                        clickHandler={() =>
                                            setSelectedTagId(tag.tagId)
                                        }
                                        color={PillColor.Black}
                                        lightFont
                                    >
                                        {tag.name}
                                    </Pill>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-8">
                    <div className={styles.summaryTagsTable}>
                        {selectedTag ? (
                            <ChartCard
                                chartTitle={selectedTag.name}
                                totalTitle={isThisYear ? 'YTD' : 'Total'}
                                totalCents={selectedTag.totalCents}
                                isThisYear={isThisYear}
                                height="25rem"
                            >
                                <YearSpendChart
                                    monthTotalsCents={
                                        selectedTag.monthTotalsCents
                                    }
                                    colorHex={'#1b2c37'}
                                />
                            </ChartCard>
                        ) : (
                            <Loading />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
