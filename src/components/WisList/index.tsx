/*
 * Copyright (c) 2024. Beijing Wisdech Co., Ltd.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import {Entity} from '@/types';
import React from 'react';
import {ParamsType, ProList, ProListProps} from '@ant-design/pro-components';
import {Space} from 'antd';

export interface WisListProps<T extends Entity> extends ProListProps<T, ParamsType> {
  light?: boolean;
  actions?: React.ReactNode[];
  toolbarActions?: React.ReactNode[];
  toolbarSearch?: {
    placeholder: string
    onSearch: (value: string) => void
  };
}

export function WisList<T extends Entity>(props: WisListProps<T>) {

  const {
    light, actions,
    toolbarSearch, toolbarActions,
    request, ...listProps
  } = props;

  return (
    <ProList<T>
      rowKey="id"
      form={{ syncToUrl: true }}
      scroll={{ x: 'max-content' }}
      {...light && {
        search: { filterType: 'light' },
        pagination: { pageSize: 15 },
      }}
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
      {...listProps}
    />
  );
}