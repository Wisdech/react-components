/*
 * Copyright (c) 2024. Wisdech Software, All Rights Reserved.
 * Website: https://www.wisdech.com
 */

import { ParamsType, ProTable } from '@ant-design/pro-components';
import { ProTableProps } from '@ant-design/pro-table';
import { Space } from 'antd';
import React from 'react';
import { Entity } from '../../types';

export interface WisTableProps<T extends Entity>
  extends ProTableProps<T, ParamsType> {
  light?: boolean;
  actions?: React.ReactNode[];
  toolbarActions?: React.ReactNode[];
  toolbarSearch?: {
    placeholder: string;
    onSearch: (value: string) => void;
  };
}

export function WisTable<T extends Entity>(props: WisTableProps<T>) {
  const {
    light,
    actions,
    toolbarSearch,
    toolbarActions,
    request,
    ...tableProps
  } = props;

  return (
    <ProTable<T>
      rowKey="id"
      form={{ syncToUrl: true }}
      scroll={{ x: 'max-content' }}
      {...(light && {
        search: { filterType: 'light' },
        pagination: { pageSize: 15 },
      })}
      tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
        <Space size={16}>
          <span>已选 {selectedRowKeys.length} 项</span>
          <a onClick={onCleanSelected}>取消选择</a>
        </Space>
      )}
      tableAlertOptionRender={() => <Space size={16}>{actions}</Space>}
      toolbar={{
        actions: toolbarActions,
        search: toolbarSearch && { className: 'w-50', ...toolbarSearch },
      }}
      {...tableProps}
    />
  );
}
