
/*
 * Copyright (c) 2024. Beijing Wisdech Co., Ltd.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

export enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
}

export interface PaginationProps extends Record<string, any> {
  pageSize?: number;
  current?: number;
  keyword?: string;
}

export interface PaginationData<T> extends Record<string, any> {
  total?: number;
  data?: T[];
}

export interface CommonResult<T = null> {
  success: boolean;
  data?: T;
  error_code?: number;
  error_message?: string;
  show_type?: ErrorShowType;
  host?: string;
  trace_id?: string;
}

export interface PaginationResult<T = any> {
  success: boolean;
  data?: PaginationData<T>;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
  host?: string;
  traceId?: string;
}