import {
    PaginationAndSort,
    SortDirection,
    TakeAll
} from '@clemann-developments/common-endpoint';
import { findPaginatedAndSort } from './find-paginated-and-sort';

describe('FindPaginatedAndSort', () => {
    it('should call findAndCount with pagination and sort options', async () => {
        const repository = {
            findAndCount: jest.fn().mockResolvedValue([[], 0])
        };
        const paginationAndSort: PaginationAndSort = {
            sortColumn: 'sortColumn',
            sortDirection: SortDirection.Asc,
            skip: 1,
            take: TakeAll
        };
        const filters = {
            test: 'testFilter'
        };
        const defaultSortColumn = 'defaultSortColumn';
        const relations = null;
        await findPaginatedAndSort(
            repository as any,
            paginationAndSort,
            filters,
            defaultSortColumn,
            relations
        );
        expect(repository.findAndCount).toHaveBeenCalledWith({
            where: filters,
            order: {
                [paginationAndSort.sortColumn]: paginationAndSort.sortDirection
            },
            skip: paginationAndSort.skip,
            take: paginationAndSort.take,
            relations
        });
    });

    it('should throw error if no default sort is provided', async () => {
        const repository = {
            findAndCount: jest.fn().mockResolvedValue([[], 0])
        };
        const paginationAndSort: PaginationAndSort = {
            sortColumn: 'sortColumn',
            sortDirection: SortDirection.Asc,
            skip: 1,
            take: TakeAll
        };
        const filters = {
            test: 'testFilter'
        };
        const defaultSortColumn = null;
        const relations = null;

        await expect(
            findPaginatedAndSort(
                repository as any,
                paginationAndSort,
                filters,
                defaultSortColumn,
                relations
            )
        ).rejects.toThrowError('defaultSortColumn is required');
    });
});
