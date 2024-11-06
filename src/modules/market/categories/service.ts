import { AxiosInstance } from 'axios';
import { IApiWrapper, IPaginatedData } from '@/types/pagination.ts';
import {
  IMarketCategory,
  IMarketCategoryTree,
} from '@/modules/market/categories/types';

export default function (api: AxiosInstance) {
  const baseUrl = '';

  return {
    filter: () => api.get<IPaginatedData<IMarketCategory>>(baseUrl),
    show: (id: string) =>
      api.get<IApiWrapper<IMarketCategoryTree>>(`${baseUrl}/${id}`),
  };
}
