/*
 * Copyright (c) 2024. Beijing Wisdech Co., Ltd.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import { Entity, WithChildren } from '../types';

export function trimChildren<T extends Entity>(models?: WithChildren<T>[]) {
  models?.forEach((model) => {
    if (model?.children?.length === 0) {
      delete model.children;
    } else if (model?.children) {
      trimChildren<T>(model.children);
    }
  });
  return models ?? [];
}

export function groupBySlash<T = any>(entity: T[], key: keyof T): [string, T[]][] {
  let grouped: Map<string, T[]> = new Map();

  entity.forEach((e) => {
    const name = JSON.stringify(e[key]);
    const group = name.substring(0, name.indexOf('/'));

    if (!grouped.has(group)) {
      grouped.set(group, []);
    }

    if (name.startsWith(group)) {
      grouped.get(group)?.push(e);
    }
  });

  return Array.from(grouped);
}