/*
 * Copyright (c) 2024. Wisdech Software, All Rights Reserved.
 * Website: https://www.wisdech.com
 */

import { ProFormFieldProps } from '@ant-design/pro-components';

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
export type WithRequest<T, K> = T & { request: K };
