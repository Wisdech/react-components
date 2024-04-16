/*
 * Copyright (c) 2024. Beijing Wisdech Co., Ltd.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

export function manByte(size: number = 0) {
  const num = 1024.0; //byte
  if (size < num) return size + 'B';
  if (size < Math.pow(num, 2)) return (size / num).toFixed(2) + 'K'; //kb
  if (size < Math.pow(num, 3))
    return (size / Math.pow(num, 2)).toFixed(2) + 'M'; //M
  if (size < Math.pow(num, 4))
    return (size / Math.pow(num, 3)).toFixed(2) + 'G'; //G
  return (size / Math.pow(num, 4)).toFixed(2) + 'T'; //T
}

export function manSecond(second: number) {
  const min = 60;
  if (second > min && second < Math.pow(min, 2)) {
    const minute = Math.floor(second / min);
    const remain = second - minute * min;
    return minute + '分' + remain + '秒'; //kb
  }
  return second + '秒';
}