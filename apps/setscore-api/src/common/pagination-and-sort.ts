import { Repository } from 'typeorm';

export const DefaultTake = 25;
export const TakeAll = 1000;

export enum SortDirection {
    Asc = 'ASC',
    Desc = 'DESC'
}

export class PaginationAndSort {
    public skip = 0;
    public take = DefaultTake;
    public sortColumn: string;
    public sortDirection: SortDirection;
}

export async function findPaginatedAndSort<EntityType>(
    repository: Repository<any>,
    paginationAndSort: PaginationAndSort,
    filters = {},
    defaultSortColumn: string,
    relations = null
): Promise<[EntityType[], number]> {
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
