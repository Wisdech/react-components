/*
 * Copyright (c) 2024. Beijing Wisdech Co., Ltd.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */


import { CommonResult, Entity, PaginationData, PaginationResult, WithChildren } from '../types';
import { ParamsType } from '@ant-design/pro-components';
import { trimChildren } from './entity';

type PostRequest<T> = (data?: T | PaginationData<T>) => (void | T) | Promise<(void | T)>

type FormParams = ParamsType & { path?: any };
type FormData<T extends ParamsType> = T extends Entity ? (T | Partial<T>) : (T | ParamsType);

type TableSort = Record<string, 'descend' | 'ascend' | null>
type TableFilter = Record<string, (string | number)[] | null>
type TableParams = ParamsType & { pageSize?: number; current?: number; keyword?: string; }

export type FormRequest<T extends ParamsType = any> = (form?: ParamsType) => Promise<CommonResult<T>>
export type TableRequest<T = any> = (params: Record<string, any>) => Promise<PaginationResult<T>>

export function formRequest<T extends ParamsType = any>(request: FormRequest<T>, params?: FormParams, postRequest?: PostRequest<T>) {

  return async (formData: FormData<T>) => {
    const { success, data } = await request({ ...formData, ...params });
    postRequest?.(data);
    return success;
  };
}

export function selectRequest<T extends ParamsType = any>(request: FormRequest<T>, hasChildren: boolean = false, postRequest?: PostRequest<T>) {

  return async (params: any, props: any) => {
    const { data } = await request({ ...params, ...props });
    await postRequest?.(data);
    return hasChildren ? trimChildren(data as unknown as WithChildren<Entity>[]) : (data ?? []);
  };
}


export function tableRequest<T = any>(request: TableRequest<T>, postRequest?: PostRequest<T>) {

  return async (params: TableParams, sort: TableSort, filter: TableFilter) => {
    const requestParams = { ...params, ...sort, ...filter };
    const { data, success } = await request(requestParams);
    await postRequest?.(data);
    return {
      data: data?.data,
      total: data?.total,
      success,
    };
  };
}