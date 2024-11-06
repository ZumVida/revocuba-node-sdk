import { AxiosInstance } from 'axios';
import {
  IApiWrapper,
  IPaginatedData,
} from '@adricq/revocuba-sdk/types/pagination.ts';
import { IMarketCategory, IMarketCategoryTree } from '@adricq/revocuba-sdk';

export default function (api: AxiosInstance) {
  const baseUrl = '';

  return {
    filter: () => api.get<IPaginatedData<IMarketCategory>>(baseUrl),
    show: (id: string) =>
      api.get<IApiWrapper<IMarketCategoryTree>>(`${baseUrl}/${id}`),
  };
}
