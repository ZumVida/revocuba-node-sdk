import { IGeoAddress } from '../../geo/types';
import { IUser } from '../../users/types';
import { IMarketOffer } from '../offers/types';

export interface IMarketOrder {
  id: string;
  price_offers: number;
  price_taxes: number;
  price_delivery: number;
  delivery: IMarketDelivery;
}

export interface IMarketDelivery {
  recipient_name: string;
  recipient_contact: string;
  status: MarketDeliveryStatus;
  address: IGeoAddress;
  comments: IMarketDeliveryComment[] | null;
}

export interface IMarketDeliveryComment {
  from: IUser;
  message: string;
}

export enum MarketDeliveryStatus {
  PREPARING = 0,
  READY_FOR_DELIVERY = 1,
  DELIVERING = 2,
  COMPLETED = 3,
  CONFIRMED = 4,
  CANCELED = 5,
}

export interface IMarketOrderOffer {
  quantity: number;
  offer: IMarketOffer;
  price_sell: number;
  price_discount: number;
}
