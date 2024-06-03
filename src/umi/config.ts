/*
 * Copyright (c) 2024. Beijing Wisdech Co., Ltd.
 * Website: www.wisdech.com
 * Email: info@wisdech.com
 */

import {message, notification} from 'antd';
import {CommonResult, ErrorShowType} from '@/types';
import {AxiosError} from 'axios';

export type UmiRequestProps = {
  on401?: () => void | Promise<void>,
  on412?: () => void | Promise<void>,
}

export const umiRequest = (props: UmiRequestProps) => {

  const errorThrower = (res: CommonResult) => {
    const { success, data, error_code, error_message, show_type } = res;
    if (!success && error_code === 401) {
      props.on401?.();
    }
    if (!success && error_code === 412) {
      props.on412?.();
    }
    if (!success && error_code !== 401 && error_code !== 412) {
      const error: any = new Error(error_message);
      error.name = 'BizError';
      error.info = { error_code, error_message, show_type, data };
      throw error;
    }
  };

  const errorHandler = (error: AxiosError | Error) => {
    if (error.name === 'BizError') {
      const errorInfo: CommonResult | undefined = (error as any).info;
      errorInfo?.show_type === ErrorShowType.SILENT && console.log(error);
      errorInfo?.show_type === ErrorShowType.ERROR_MESSAGE &&
      message.error(errorInfo?.error_message);
      errorInfo?.show_type === ErrorShowType.WARN_MESSAGE &&
      message.warning(errorInfo?.error_message);
      errorInfo?.show_type === ErrorShowType.NOTIFICATION &&
      notification.error({ message: errorInfo?.error_message });
    } else {
      const { response } = error as AxiosError;
      response?.status === 401 && props.on401?.();
      response?.status === 404 && message.warning('系统错误：请求的路径不存在');
      response?.status.toString().startsWith('5') && message.error('系统错误：无法连接服务器');
    }
  };

  return {
    withCredentials: true,
    withXSRFToken: true,
    errorConfig: {
      errorThrower,
      errorHandler,
    },
  };

};