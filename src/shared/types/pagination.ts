export interface ApiResponse<T> {
  isSuccess: boolean;
  message: string;
  data: T;
  errors: string[];
}

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
