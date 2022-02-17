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
