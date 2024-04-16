/*
 * Copyright (c) 2024. Beijing Wisdech Co., Ltd.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import { ProFormFieldProps } from '@ant-design/pro-form';

export type WithEntity<T, K = unknown> = { entity: T } & K;
export type WithOptionalEntity<T, K = unknown> = { entity?: T } & K;
export type WithSelected<T = any, K = unknown> = { selected?: T } & K;
export type WithSetSelected<T = any, K = unknown> = {
  selected?: T;
  setSelected?: (s?: T) => void;
} & K;
export type WithRefresh<T = unknown> = {
  refresh: () => void | Promise<void>;
} & T;
export type WithFieldProps<T = unknown> = {
  fieldProps?: ProFormFieldProps['fieldProps'];
} & T;
