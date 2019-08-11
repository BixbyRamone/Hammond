export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    studentLevel: string;
}


export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}
