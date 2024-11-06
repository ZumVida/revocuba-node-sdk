import axios from 'axios';
import { TokenHandler } from '../types/tokenHandler';
import {
  ErrorHandlerParams,
  useErrorHandler,
  useHeadersInterceptor,
} from './interceptors';

/**
 * initApi
 */
export function initApi(params: InitApiParams) {
  const { appToken, tokenHandler } = params;

  // Init axios instance
  const api = axios.create({
    baseURL: params?.baseURL,
    withCredentials: true,
  });

  // Setup interceptors

  // Header interceptors
  const headersInterceptor = useHeadersInterceptor({
    appToken,
    tokenHandler,
  });
  api.interceptors.request.use(
    headersInterceptor.onFulfilled,
    headersInterceptor.onRejected,
    headersInterceptor.options,
  );

  // Setup error handler interceptor
  if (params?.errorHandler) {
    const errorHandler = useErrorHandler(params.errorHandler);

    // add handler interceptor
    api.interceptors.response.use(
      errorHandler.onFulfilled,
      errorHandler.onRejected,
      errorHandler.options,
    );
  }

  return api;
}

export interface InitApiParams {
  appToken: string;
  baseURL: string;
  tokenHandler: TokenHandler;
  errorHandler?: ErrorHandlerParams;
}
