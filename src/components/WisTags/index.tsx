/*
 * Copyright (c) 2024. Wisdech Software, All Rights Reserved.
 * Website: https://www.wisdech.com
 */

import { Tag, TagProps } from 'antd';
import React from 'react';
import { Entity } from '../../types';

export interface WisTagsProps<T extends Entity> extends TagProps {
  dataIndex: keyof T;
  data?: T[];
}

export function WisTags<T extends Entity>(props: WisTagsProps<T>) {
  const { dataIndex, data, ...tagProps } = props;

  return data?.map((item) => (
    <Tag key={item['id']} {...tagProps}>
      {`${item[dataIndex]}`}
    </Tag>
  ));
}
