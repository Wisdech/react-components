/*
 * Copyright (c) 2024. Beijing Wisdech Co., Ltd.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import React from 'react';
import { ProFormFieldProps, ProFormTreeSelect } from '@ant-design/pro-form';
import { asyncBoolean, trimChildren } from '../../helpers';
import { ProFormSelect, ProFormSelectProps } from '@ant-design/pro-components';
import { BaseRole, BaseTeam, FnCR, WithOptionalEntity } from '../../types';

type TeamSelectType = React.FC<Omit<ProFormFieldProps, 'request'> & { request: FnCR<BaseTeam[]> }>
type TeamParentSelectType = React.FC<WithOptionalEntity<BaseTeam, Omit<ProFormFieldProps, 'request'>> & {
  request: FnCR<BaseTeam[]>
}>
type RoleSelectType = React.FC<Omit<ProFormSelectProps, 'request'> & { request: FnCR<BaseRole[]> }>

export const TeamSelect: TeamSelectType = ({ fieldProps, request, ...props }) => (
  <ProFormTreeSelect
    name="team_ids"
    label="所属团队"
    rules={[{ required: true }]}
    request={async () => trimChildren((await request).data)}
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
    request={async () => trimChildren((await request).data)}
    fieldProps={{ fieldNames: { label: 'name', value: 'id' }, ...fieldProps }}
    {...props}
  />
);

export const RoleSelect: RoleSelectType = ({ fieldProps, request, ...props }) => (
  <ProFormSelect
    name="role_names"
    label="用户角色"
    rules={[{ required: true }]}
    request={async () => ((await request).data) ?? []}
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
