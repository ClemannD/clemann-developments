import {
    SortDirection,
    UseApiListResults
} from '@clemann-developments/common-endpoint';
import { DropdownButton } from '@clemann-developments/react/components/interaction/dropdown-button';
import {
    Card,
    Loading
} from '@clemann-developments/react/components/ui-elements';
import {
    ChevronDownIcon,
    ChevronUpIcon,
    PresentationChartBarIcon
} from '@heroicons/react/outline';
import { MouseEventHandler } from 'react';
import styles from './table.module.scss';

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
    className?: string;
    horizontalScroll?: boolean;
    showCard?: boolean;
    onKeyDown?: (event: React.KeyboardEvent<HTMLTableElement>) => void;
};

export function Table({
    headers,
    rows,
    filters,
    isLoading = false,
    noData = false,
    className = '',
    horizontalScroll = false,
    showCard = true,
    onKeyDown
}: TableProps) {
    const table = (
        <table
            className={`
            ${className}
            ${styles.table}
            ${isLoading ? styles.loading : ''}
        `}
            onKeyDown={onKeyDown}
        >
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
                className={styles.tableCard}
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
                        overflowX: horizontalScroll ? 'auto' : 'visible'
                    }}
                >
                    {noData && !isLoading ? noDataDisplay : table}
                    {isLoading && (
                        <div className={styles.loadingContainer}>
                            <Loading></Loading>
                        </div>
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
    border = false,
    customSort,
    children
}: {
    header?: string;
    width?: string;
    sortKey?: string;
    listService?: UseApiListResults;
    border?: boolean;
    customSort?: (sortDirection: SortDirection, sortKey: string) => number;
    children?: any;
}) => {
    const isSortedAsc = () =>
        listService?.request?.paginationAndSort?.sortColumn === sortKey &&
        listService?.request?.paginationAndSort?.sortDirection ===
            SortDirection.Asc;
    const isSortedDesc = () =>
        listService?.request?.paginationAndSort?.sortColumn === sortKey &&
        listService?.request?.paginationAndSort?.sortDirection ===
            SortDirection.Desc;

    return (
        <th
            style={{ width, minWidth: width }}
            className={`
                ${sortKey ? styles.sortable : ''}
                ${
                    listService?.request?.paginationAndSort?.sortColumn ===
                    sortKey
                        ? styles.sorted
                        : ''
                }
                ${border ? styles.border : ''}
            `}
            onClick={() => {
                if (sortKey) {
                    if (isSortedAsc()) {
                        customSort
                            ? customSort(SortDirection.Desc, sortKey)
                            : listService?.handleSort(
                                  SortDirection.Desc,
                                  sortKey
                              );
                    } else {
                        customSort
                            ? customSort(SortDirection.Asc, sortKey)
                            : listService?.handleSort(
                                  SortDirection.Asc,
                                  sortKey
                              );
                    }
                }
            }}
        >
            {children || header}
            {sortKey && (
                <span className={styles.sortIcon}>
                    {isSortedDesc() ? (
                        <ChevronUpIcon height="1.4rem"></ChevronUpIcon>
                    ) : (
                        <ChevronDownIcon height="1.4rem"></ChevronDownIcon>
                    )}
                </span>
            )}
        </th>
    );
};

export const TableRow = (props: {
    clickHandler?: MouseEventHandler<HTMLTableRowElement> | undefined;
    children: any;
}) => (
    <tr
        className={`${props.clickHandler ? styles.clickable : ''} ${
            styles.bodyRow
        }`}
        onClick={props.clickHandler}
    >
        {props.children}
    </tr>
);
