/*
 * Copyright (c) 2024. Wisdech Software, All Rights Reserved.
 * Website: https://www.wisdech.com
 */

import { Button, Popconfirm } from 'antd';
import React from 'react';

export interface WisTriggerProps {
  title: string;
  description: string;
  text: string;
  onClick?: () => void;
}

export const DangerButton: React.FC<WisTriggerProps> = (props) => {
  const { onClick, text, title, description } = props;

  return (
    <Popconfirm
      okText="确认"
      cancelText="取消"
      title={title}
      description={description}
      onConfirm={onClick}
      okButtonProps={{ danger: true }}
    >
      <Button danger>{text}</Button>
    </Popconfirm>
  );
};

export const DangerLink: React.FC<WisTriggerProps> = (props) => {
  const { onClick, text, title, description } = props;

  return (
    <Popconfirm
      okText="确认"
      cancelText="取消"
      title={title}
      description={description}
      onConfirm={onClick}
      okButtonProps={{ danger: true }}
    >
      <a style={{ color: 'rgb(239 68 68)' }}>{text}</a>
    </Popconfirm>
  );
};
