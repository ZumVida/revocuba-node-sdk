import { AxiosInstance } from 'axios';
import {
  IMarketOrder,
  IMarketOrderCreateRequest,
  IMarketOrderExtended,
  IMarketOrderFilterRequest,
} from './types';
import { IApiWrapper, IPaginatedData } from '@/types/pagination';

export default function (api: AxiosInstance) {
  const baseUrl = '/market/orders';

  return {
    create: (params: IMarketOrderCreateRequest) =>
      api.post<IApiWrapper<IMarketOrderExtended>>(baseUrl, params),
    filter: (params: IMarketOrderFilterRequest) =>
      api.get<IPaginatedData<IMarketOrder>>(baseUrl, { params }),
    show: (id: string) =>
      api.get<IApiWrapper<IMarketOrderExtended>>(`${baseUrl}/${id}`),
  };
}
