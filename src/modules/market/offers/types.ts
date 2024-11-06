import { IPaginationParams } from '@/types/pagination';

export interface IMarketOffer {
  id: string;
  name: string;
  description: string;
  image: string;
  price_sell: number;
  price_discount: number | null;
  stock_quantity: number;
  stock_type: MarketOfferStockType;
  rating: number;
}

export interface IMarketOfferMetadata {
  views: number;
  sales: number;
}

export enum MarketOfferStockType {
  OUT = 0,
  LIMITED = 1,
  UNLIMITED = 2,
  INCOMING = 3,
}

export interface IMarketOfferAttribute {
  name: string;
  value: string;
}

export interface IMarketOfferExtended extends IMarketOffer {
  metadata: IMarketOfferMetadata;
  attributes: IMarketOfferAttribute[];
}

/**
 * ------------------------------------------
 * Requests
 * ------------------------------------------
 */

export interface IMarketOfferFilterRequest extends IPaginationParams {
  store_id?: string;
  category_id?: string;
  name?: string;
}
