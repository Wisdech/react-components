/*
 * Copyright (c) 2024. Beijing Wisdech Co., Ltd.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import React from 'react';
import { ProFormFieldProps, ProFormTreeSelect } from '@ant-design/pro-form';
import { asyncBoolean, FormRequest, selectRequest } from '../../helpers';
import { ProFormSelect, ProFormSelectProps } from '@ant-design/pro-components';
import { BaseRole, BaseTeam, BaseUser, WithOptionalEntity, WithRequest } from '../../types';

type UserSelectType = React.FC<WithRequest<Omit<ProFormSelectProps, 'request'>, FormRequest<BaseUser[]>>>
type TeamSelectType = React.FC<WithRequest<Omit<ProFormFieldProps, 'request'>, FormRequest<BaseTeam[]>>>
type TeamParentSelectType = React.FC<WithRequest<WithOptionalEntity<BaseTeam, Omit<ProFormFieldProps, 'request'>>, FormRequest<BaseTeam[]>>>
type RoleSelectType = React.FC<WithRequest<Omit<ProFormSelectProps, 'request'>, FormRequest<BaseRole[]>>>

export const UserSelect: UserSelectType = ({ fieldProps, request, ...props }) => (
  <ProFormSelect
    name="user_ids"
    label="选择用户"
    rules={[{ required: true }]}
    request={selectRequest(request)}
    fieldProps={{
      fieldNames: { label: 'name', value: 'id' },
      showSearch: true,
      popupMatchSelectWidth: true,
      ...fieldProps,
    }}
    {...props}
  />
);

export const TeamSelect: TeamSelectType = ({ fieldProps, request, ...props }) => (
  <ProFormTreeSelect
    name="team_ids"
    label="所属团队"
    rules={[{ required: true }]}
    request={selectRequest(request, true)}
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

export const TeamParentSelect: TeamParentSelectType = ({ entity, fieldProps, request, ...props }) => (
  <ProFormTreeSelect
    name="parent_id"
    label="上级团队"
    rules={entity ? [
        { required: true, message: '请选择上级团队' },
        { validator: (_, value) => asyncBoolean(!value || entity.id !== value) },
      ]
      : [{ required: true, message: '请选择上级团队' }]
    }
    request={selectRequest(request, true)}
    fieldProps={{ fieldNames: { label: 'name', value: 'id' }, ...fieldProps }}
    {...props}
  />
);

export const RoleSelect: RoleSelectType = ({ fieldProps, request, ...props }) => (
  <ProFormSelect
    name="role_names"
    label="用户角色"
    rules={[{ required: true }]}
    request={selectRequest(request)}
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
