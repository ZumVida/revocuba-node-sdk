export interface IApiWrapper<T> {
  data: T;
  message?: string;
  error?: string;
}

/**
 * @interface IPaginatedData
 */
export interface IPaginatedData<T> {
  data: T[];
  links: {
    first?: string;
    last?: string;
    prev?: string;
    next?: string;
  };
  meta: {
    current_page?: number;
    from?: number;
    path?: string;
    per_page?: number;
    to?: number;
  };
}

/**
 * @interface IPaginationParams
 */
export interface IPaginationParams {
  page?: number;
  paginate?: number;
}
