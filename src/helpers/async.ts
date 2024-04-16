/*
 * Copyright (c) 2024. Beijing Wisdech Co., Ltd.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

export async function asyncBoolean(v: boolean) {
  return v ? Promise.resolve() : Promise.reject();
}