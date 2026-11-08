export interface PaginatedResponse<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
}

export const PAGE_SIZE = 10;

/** Page size used when a screen needs every record (menus, history totals). */
export const BULK_PAGE_SIZE = 50;
