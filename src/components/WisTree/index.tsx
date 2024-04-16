/*
 * Copyright (c) 2024. Beijing Wisdech Co., Ltd.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import { Tree, TreeDataNode, TreeProps } from 'antd';
import { CaretDownFilled } from '@ant-design/icons';
import React from 'react';
import { Entity, WithChildren } from '../../types';

export interface WisTreeProps<T extends Entity> extends Omit<TreeProps, 'fieldNames' | 'treeData'> {
  fieldNames: {
    key: keyof T;
    title: keyof T
  };
  action?: React.FC<{ entity: T }>;
  treeData: (WithChildren<T> | T)[];
}

export function WisTree<T extends Entity>(props: WisTreeProps<T>) {

  const { fieldNames, action, treeData, ...treeProps } = props;

  const switcherIcon = (
    <div className="h-full leading-10">
      <CaretDownFilled style={{ lineHeight: 40 }} />
    </div>
  );

  const titleRender = (node: T) => (
    <div className="flex" key={node[fieldNames.key ?? 'id']}>
      <span className="px-2 text-sm leading-10">{`${node[fieldNames.title]}`}</span>
      {action && action({ entity: node })}
    </div>
  );

  return (
    <Tree<any>
      treeData={treeData as unknown as TreeDataNode[]}
      blockNode={true}
      defaultExpandAll={true}
      switcherIcon={switcherIcon}
      fieldNames={fieldNames as any}
      titleRender={titleRender}
      {...treeProps}
    />
  );
}