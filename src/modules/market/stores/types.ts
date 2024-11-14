import { IMarketOffer } from '@/main';
import { IFinancePaymentMethod } from '@/modules/finance/paymentMethods/types';
import { IGeoAddress } from '@/modules/geo/types';
import { IPaginationParams } from '@/types/pagination';

export interface IMarketStore {
  id: string;
  slug: string;
  image: string;
  name: string;
  description: string;
}

export interface IMarketStoreExtended extends IMarketStore, IGeoAddress {
  // offers: IMarketOffer[];
  payment_methods: IMarketPaymentMethod[];
}
export interface IMarketPaymentMethod {
  id: string;
  is_active: boolean;
  config: IMarketPaymentMethodConfig;
  method: IFinancePaymentMethod;
}

interface IMarketPaymentMethodConfig {}

export interface IMarketStoreFilterRequest extends IPaginationParams {
  location_id: string;
  name?: string;
}
