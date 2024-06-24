declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

declare namespace Utils {
  type RedirectBasedOnQueryParamOptions = {
    defaultPath: string;
  };
}

declare namespace API {
  type ResponseResultType = {
    success: boolean;
    data?: any;
    errorMessage?: string;
    errorCode?: number;
    showType?: number;
  };
  type PaginatedParameters = {
    current?: number;
    pageSize?: number;
  };
  type PaginatedResult<T = any> = {
    success: boolean;
    errorMessage?: string;
    errorCode?: number;
    showType?: number;
    total: number;
    data: T[];
  };
  export type TablePagination = {
    total: number;
    pageSize: number;
    current: number;
  };
}
