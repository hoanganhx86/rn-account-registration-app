import {ApiResponse, ApisauceInstance} from 'apisauce';
import {configureApi} from './base';

export let api: ApisauceInstance;
export let backendGet: (
  path: string,
  params?: any,
) => Promise<ApiResponse<unknown, unknown>>;
export let backendPost: (
  path: string,
  params?: any,
  isJSON?: boolean,
) => Promise<ApiResponse<unknown, unknown>>;
export let backendDelete: (
  path: string,
  params?: any,
) => Promise<ApiResponse<unknown, unknown>>;

export const init = (endpoint: string) => {
  const config = configureApi(endpoint);
  backendGet = config.backendGet;
  backendPost = config.backendPost;
  api = config.api;
  return {
    api: config.api,
    axiosInstance: config.api.axiosInstance,
  };
};

export const register = (
  username: string,
  password: string,
  fullName: string,
) => {
  return backendPost('/users/', {username, password, fullName});
};
