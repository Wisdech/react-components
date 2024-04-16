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