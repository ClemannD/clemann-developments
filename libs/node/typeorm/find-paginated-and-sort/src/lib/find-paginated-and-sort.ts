import {
    PaginationAndSort,
    SortDirection,
    TakeAll
} from '@clemann-developments/common-endpoint';
import { Repository } from 'typeorm';

export async function findPaginatedAndSort<EntityType>(
    repository: Repository<any>,
    paginationAndSort: PaginationAndSort,
    filters = {},
    defaultSortColumn: string,
    relations = null
): Promise<[EntityType[], number]> {
    if (!defaultSortColumn) {
        throw new Error('defaultSortColumn is required');
    }

    return repository.findAndCount({
        where: filters,
        order: {
            [paginationAndSort?.sortColumn || defaultSortColumn]:
                paginationAndSort?.sortDirection || SortDirection.Asc
        },
        skip: paginationAndSort?.skip || 0,
        take: paginationAndSort?.take || TakeAll,
        relations
    });
}
