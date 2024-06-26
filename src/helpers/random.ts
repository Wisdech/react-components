/*
 * Copyright (c) 2024. Wisdech Software, All Rights Reserved.
 * Website: https://www.wisdech.com
 */

export function randomUUID(): string {
  if (typeof crypto === 'object') {
    // @ts-ignore
    if (typeof crypto?.randomUUID === 'function') {
      // @ts-ignore
      return crypto?.randomUUID();
    }
    if (
      typeof crypto.getRandomValues === 'function' &&
      typeof Uint8Array === 'function'
    ) {
      const callback = (c: any) => {
        const num = Number(c);
        return (
          num ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))
        ).toString(16);
      };
      // @ts-ignore
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, callback);
    }
  }
  let timestamp = new Date().getTime();
  let performanceNow =
    (typeof performance !== 'undefined' &&
      performance.now &&
      performance.now() * 1000) ||
    0;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let random = Math.random() * 16;
    if (timestamp > 0) {
      random = (timestamp + random) % 16 | 0;
      timestamp = Math.floor(timestamp / 16);
    } else {
      random = (performanceNow + random) % 16 | 0;
      performanceNow = Math.floor(performanceNow / 16);
    }
    return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16);
  });
}

export function randomString(length?: number): string {
  const l = length || 32;
  const seed = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  const a = seed.length;
  let result = '';
  for (let i = 0; i < l; i++) {
    result += seed.charAt(Math.floor(Math.random() * a));
  }
  return result;
}
