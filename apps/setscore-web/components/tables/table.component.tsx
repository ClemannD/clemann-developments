import {
    SortDirection,
    UseApiListResults
} from '@clemann-developments/common-endpoint';
import {
    ChevronDownIcon,
    ChevronUpIcon,
    PresentationChartBarIcon
} from '@heroicons/react/outline';
import Card from '../cards/card/card.component';
import Loading from '../navigation/loading/loading.component';
import styles from './table.module.scss';
import { DropdownButton } from '@clemann-developments/react/components/interaction/dropdown-button';

export interface TableColumn {
    header?: string;
    key?: string;
    width?: string;
}

export type TableProps = {
    headers: any;
    rows: any;
    filters?: any;
    isLoading?: boolean;
    noData?: boolean;
    showCard?: boolean;
};

export default function Table({
    headers,
    rows,
    filters,
    isLoading = false,
    noData = false,
    showCard = true
}: TableProps) {
    const table = (
        <table className={styles.table}>
            <thead className={styles.thead}>
                <tr>{headers}</tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );

    const noDataDisplay = (
        <div className={styles.noDataDisplay}>
            <PresentationChartBarIcon /> No Data
        </div>
    );

    if (showCard) {
        return (
            <Card
                header={
                    filters && (
                        <div style={{ width: '100%' }}>
                            <DropdownButton dropdownButtonText="Filters">
                                {filters}
                            </DropdownButton>
                        </div>
                    )
                }
            >
                <div
                    style={{
                        overflowX: 'auto'
                    }}
                >
                    {noData && !isLoading ? (
                        noDataDisplay
                    ) : isLoading ? (
                        <Loading></Loading>
                    ) : (
                        table
                    )}
                </div>
            </Card>
        );
    } else {
        return (
            <div
                style={{
                    overflowX: 'auto'
                }}
            >
                {isLoading ? <Loading></Loading> : table}
            </div>
        );
    }
}

export type ColumnProps = {
    data?: string | number;
    minWidth?: string;
    children?: any;
};

export const Column = ({ data, minWidth, children }: ColumnProps) => {
    return (
        <td style={{ minWidth: minWidth || 'auto' }}>
            {children || data || '—'}
        </td>
    );
};

export const ColumnHeader = ({
    header,
    width = 'auto',
    sortKey,
    listService,
    children
}: {
    header?: string;
    width?: string;
    sortKey?: string;
    listService?: UseApiListResults;
    children?: any;
}) => {
    return (
        <th
            style={{ width }}
            className={`${sortKey ? styles.sortable : ''} ${
                listService?.request?.paginationAndSort?.sortColumn === sortKey
                    ? styles.sorted
                    : ''
            }`}
            onClick={() => {
                if (sortKey) {
                    if (
                        listService?.request?.paginationAndSort.sortColumn ===
                            sortKey &&
                        listService?.request?.paginationAndSort
                            .sortDirection === SortDirection.Asc
                    ) {
                        listService.handleSort(SortDirection.Desc, sortKey);
                    } else if (
                        listService?.request?.paginationAndSort.sortColumn ===
                            sortKey &&
                        listService?.request?.paginationAndSort
                            .sortDirection === SortDirection.Desc
                    ) {
                        listService?.handleSort(SortDirection.Asc, sortKey);
                    } else {
                        listService?.handleSort(SortDirection.Asc, sortKey);
                    }
                }
            }}
        >
            {children || header}{' '}
            {sortKey && (
                <span className={styles.sortIcon}>
                    {sortKey &&
                    listService?.request?.paginationAndSort.sortColumn ===
                        sortKey &&
                    listService?.request?.paginationAndSort.sortDirection ===
                        SortDirection.Desc ? (
                        <ChevronUpIcon height="1.4rem"></ChevronUpIcon>
                    ) : (
                        <ChevronDownIcon height="1.4rem"></ChevronDownIcon>
                    )}
                </span>
            )}
        </th>
    );
};

export const TableRow = (props) => (
    <tr
        className={`${props.clickHandler ? styles.clickable : ''} ${
            styles.bodyRow
        }`}
        onClick={props.clickHandler}
    >
        {props.children}
    </tr>
);
