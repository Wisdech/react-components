/*
 * Copyright (c) 2024. Wisdech Software, All Rights Reserved.
 * Website: https://www.wisdech.com
 */

export async function asyncBoolean(v: boolean) {
  return v ? Promise.resolve() : Promise.reject();
}
