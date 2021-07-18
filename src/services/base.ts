import apisauce, {ApiResponse, ApisauceInstance} from 'apisauce';
import qs from 'qs';
import {Platform, StatusBar} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import AppConfig from '../constants';

function generateErrorMessage(response: ApiResponse<any>): {
  key: string;
  message: string;
} {
  if (response && response.problem) {
    const key =
      (response.data && response.data.key
        ? response.data.key
        : response.problem) || 'UNKNOWN_ERROR';
    switch (response.problem) {
      case 'NETWORK_ERROR':
      case 'TIMEOUT_ERROR':
        return {key, message: 'Unable to reach server'};
      case 'CONNECTION_ERROR':
      case 'SERVER_ERROR':
        return {
          key,
          message:
            'Server is not available at the moment. Please try again later.',
        };
      case 'CLIENT_ERROR':
        return {key, message: response.data.message || 'Unknown error'};
      case 'CANCEL_ERROR':
        return {key, message: 'Request has been cancelled'};
    }
  }
  return {
    key: 'UNKNOWN_ERROR',
    message:
      response && response.data.message
        ? response.data.message
        : 'Unknown error',
  };
}

const create = (baseURL: string): ApisauceInstance => {
  const api = apisauce.create({
    baseURL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': `${DeviceInfo.getApplicationName()}/${DeviceInfo.getVersion()} (${DeviceInfo.getBundleId()}; build:${DeviceInfo.getBuildNumber()}; ${DeviceInfo.getSystemName()} ${DeviceInfo.getSystemVersion()})`,
    },
    timeout: 30000,
  });
  const apiMonitor = (response: any) => {
    if (__DEV__ && AppConfig.enabledApiLogger) {
      if (response.status >= 400) {
        console.warn('api-monitor', response);
      } else {
        console.log('api-monitor', response);
      }
    }

    if (!response.ok) {
      response.data = response.data || {};
      if (!response.data.key && !response.data.message) {
        const {key, message} = generateErrorMessage(response);
        response.data.key = key;
        response.data.message = message;
      }
    }

    if (Platform.OS === 'ios') {
      StatusBar.setNetworkActivityIndicatorVisible(false);
    }
  };
  api.addMonitor(apiMonitor);
  return api;
};

export const configureApi = (baseURL: string) => {
  const api = create(baseURL);
  const backendGet = (path: string, params?: any) => {
    return api.get(path, {params: params ? params : {}});
  };
  const backendPost = (path: string, params?: any, isJSON = true) => {
    if (isJSON) {
      return api.post(path, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    return api.post(
      `${path}`,
      params instanceof FormData ? params : qs.stringify(params),
    );
  };
  const backendDelete = (path: string, params?: any) => {
    return api.delete(path, {params: params ? params : {}});
  };
  return {
    backendGet,
    backendPost,
    backendDelete,
    api,
  };
};
