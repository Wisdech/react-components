/*
 * Copyright (c) 2024. Beijing Wisdech Co., Ltd.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import { Entity } from '../../types';
import { ProTableProps } from '@ant-design/pro-table';
import React from 'react';
import { ParamsType, ProTable } from '@ant-design/pro-components';
import { Space } from 'antd';
import { tableRequest, TableRequest } from '../../helpers';

export interface WisTableProps<T extends Entity> extends Omit<ProTableProps<T, ParamsType>, 'request'> {
  light?: boolean;
  request: TableRequest<T>;
  actions?: React.ReactNode[];
  toolbarActions?: React.ReactNode[];
  toolbarSearch?: {
    placeholder: string
    onSearch: (value: string) => void
  };
}

export function WisTable<T extends Entity>(props: WisTableProps<T>) {

  const {
    light, actions,
    toolbarSearch, toolbarActions,
    request, ...tableProps
  } = props;

  return (
    <ProTable<T>
      rowKey="id"
      form={{ syncToUrl: true }}
      scroll={{ x: 'max-content' }}
      {...light && {
        search: { filterType: 'light' },
        pagination: { pageSize: 15 },
      }}
      request={tableRequest(request)}
      tableAlertRender={
        ({ selectedRowKeys, onCleanSelected }) => (
          <Space size={16}>
            <span>已选 {selectedRowKeys.length} 项</span>
            <a onClick={onCleanSelected}>取消选择</a>
          </Space>
        )
      }
      tableAlertOptionRender={() => <Space size={16}>{actions}</Space>}
      toolbar={{
        actions: toolbarActions,
        search: toolbarSearch && { className: 'w-50', ...toolbarSearch },
      }}
      {...tableProps}
    />
  );
}