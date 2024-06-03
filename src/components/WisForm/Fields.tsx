/*
 * Copyright (c) 2024. Beijing Wisdech Co., Ltd.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import React from 'react';
import {ProFormFieldProps, ProFormTreeSelect} from '@ant-design/pro-form';
import {asyncBoolean} from '@/helpers';
import {ProFormSelect, ProFormSelectProps} from '@ant-design/pro-components';
import {BaseTeam, WithOptionalEntity} from '@/types';

type UserSelectType = React.FC<ProFormSelectProps>
type TeamSelectType = React.FC<ProFormFieldProps>
type TeamParentSelectType = React.FC<WithOptionalEntity<BaseTeam, ProFormFieldProps>>
type RoleSelectType = React.FC<ProFormSelectProps>

export const UserSelect: UserSelectType = ({ fieldProps, ...props }) => (
  <ProFormSelect
    name="user_ids"
    label="选择用户"
    rules={[{ required: true }]}
    fieldProps={{
      fieldNames: { label: 'name', value: 'id' },
      showSearch: true,
      popupMatchSelectWidth: true,
      ...fieldProps,
    }}
    {...props}
  />
);

export const TeamSelect: TeamSelectType = ({ fieldProps,...props }) => (
  <ProFormTreeSelect
    name="team_ids"
    label="所属团队"
    rules={[{ required: true }]}
    fieldProps={{
      fieldNames: { label: 'name', value: 'id' },
      multiple: true,
      showSearch: false,
      popupMatchSelectWidth: true,
      ...fieldProps,
    }}
    {...props}
  />
);

export const TeamParentSelect: TeamParentSelectType = ({ entity, fieldProps, ...props }) => (
  <ProFormTreeSelect
    name="parent_id"
    label="上级团队"
    rules={entity ? [
        { required: true, message: '请选择上级团队' },
        { validator: (_, value) => asyncBoolean(!value || entity.id !== value) },
      ]
      : [{ required: true, message: '请选择上级团队' }]
    }
    fieldProps={{ fieldNames: { label: 'name', value: 'id' }, ...fieldProps }}
    {...props}
  />
);

export const RoleSelect: RoleSelectType = ({ fieldProps, request, ...props }) => (
  <ProFormSelect
    name="role_names"
    label="用户角色"
    rules={[{ required: true }]}
    fieldProps={{
      fieldNames: { label: 'title', value: 'name' },
      mode: 'multiple',
      showSearch: false,
      popupMatchSelectWidth: true,
      ...fieldProps,
    }}
    {...props}
  />
);
