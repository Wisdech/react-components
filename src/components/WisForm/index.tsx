/*
 * Copyright (c) 2024. Wisdech Software, All Rights Reserved.
 * Website: https://www.wisdech.com
 */

import { PlusCircleOutlined } from '@ant-design/icons';
import { ModalForm, ModalFormProps } from '@ant-design/pro-components';
import { Button, ButtonProps } from 'antd';
import React from 'react';
import { Props } from '../../types';

export * from './Fields';

export interface WisFormModalProps<T extends Props>
  extends Omit<ModalFormProps<T>, 'trigger'> {
  trigger: {
    type: 'button' | 'link' | 'icon';
    text?: string;
    icon?: React.ReactElement;
    buttonProps?: ButtonProps;
    danger?: boolean;
  };
}

export function WisFormModal<T extends Props = Props>(
  props: WisFormModalProps<T>,
) {
  const { trigger, ...modalProps } = props;

  const triggerRender = () => {
    switch (trigger.type) {
      case 'link':
        return (
          <a className={`${trigger.danger && 'danger'}`}>
            {trigger.text ?? '编辑'}
          </a>
        );
      case 'icon':
        return trigger.icon ?? <PlusCircleOutlined />;
      case 'button':
        return (
          <Button danger={trigger.danger} {...trigger.buttonProps}>
            {trigger.text ?? '新建'}
          </Button>
        );
    }
  };

  return (
    <ModalForm
      autoFocusFirstInput
      modalProps={{
        width: 512,
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      trigger={triggerRender()}
      {...modalProps}
    >
      {modalProps.children}
    </ModalForm>
  );
}
