/*
 * Copyright (c) 2024. Wisdech Software, All Rights Reserved.
 * Website: https://www.wisdech.com
 */

import { ParamsType } from '@ant-design/pro-components';

export type Props = ParamsType;
export type Entity = BaseEntity | UuidEntity | Pivot<BaseEntity | UuidEntity>;

export interface BaseEntity extends Props {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface UuidEntity extends Props {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface WithChildren<T extends Entity> {
  children?: WithChildren<T>[];
}

export type Pivot<T extends Entity, K extends Props = Props> = {
  pivot: K;
} & T;

export interface BaseUser extends UuidEntity {
  name: string;
  mobile?: string;
  password?: string;
  email?: string;
}

export interface BaseTeam extends BaseEntity, WithChildren<BaseTeam> {
  name: string;
  path: string;
  parent?: BaseTeam;
  parent_id: BaseTeam['id'];
}

export interface BaseRole extends BaseEntity {
  name: string;
  title: string;
  ability_names: string[];
  abilities: Ability[];
}

export interface Ability extends BaseEntity {
  name: string;
  title: string;
}
