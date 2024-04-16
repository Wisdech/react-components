/*
 * Copyright (c) 2024. Beijing Wisdech Co., Ltd.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import { Entity } from '../../types';
import { Tag, TagProps } from 'antd';
import React from 'react';

export interface WisTagsProps<T extends Entity> extends TagProps {
  dataIndex: keyof T;
  data?: T[];
}

export function WisTags<T extends Entity>(props: WisTagsProps<T>) {

  const { dataIndex, data, ...tagProps } = props;

  return data?.map((item) =>
    (
      <Tag key={item['id']} {...tagProps}>
        {`${item[dataIndex]}`}
      </Tag>
    ));
}