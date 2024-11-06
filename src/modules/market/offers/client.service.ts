import { AxiosInstance } from 'axios';
import {
  IMarketOffer,
  IMarketOfferExtended,
  IMarketOfferFilterRequest,
} from './types.ts';
import {
  IApiWrapper,
  IPaginatedData,
} from '@adricq/revocuba-sdk/types/pagination.ts';

export default function (api: AxiosInstance) {
  const baseUrl = '';

  return {
    filter: (params?: IMarketOfferFilterRequest) =>
      api.get<IPaginatedData<IMarketOffer>>(baseUrl, { params }),
    show: (id: string) =>
      api.get<IApiWrapper<IMarketOfferExtended>>(`${baseUrl}/${id}`),
  };
}
