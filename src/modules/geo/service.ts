import { AxiosInstance } from 'axios';
import { IApiWrapper } from '@/types/pagination';
import { IGeoLocation } from '@/modules/geo/types';

export default function (api: AxiosInstance) {
  const baseUrl = '/geo/locations';

  return {
    index: () => api.get<IApiWrapper<IGeoLocation[]>>(baseUrl),
  };
}
