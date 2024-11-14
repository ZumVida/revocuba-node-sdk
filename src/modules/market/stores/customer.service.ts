import { AxiosInstance } from 'axios';
import {
  IMarketStore,
  IMarketStoreExtended,
  IMarketStoreFilterRequest,
} from './types';
import { IApiWrapper, IPaginatedData } from '@/types/pagination';

export default function (api: AxiosInstance) {
  const baseUrl = '/stores';

  return {
    filter: (params: IMarketStoreFilterRequest) =>
      api.get<IPaginatedData<IMarketStore>>(baseUrl, { params }),
    show: (id: string) =>
      api.get<IApiWrapper<IMarketStoreExtended>>(`${baseUrl}/${id}`),
  };
}
