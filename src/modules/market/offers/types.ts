import { IMarketStore } from '@/main';
import { IPaginationParams } from '@/types/pagination';

export interface IMarketOffer {
  id: string;
  name: string;
  description: string;
  image: string;
  price_sell: number;
  price_discount: number | null;
  stock: number;
  stock_type: MarketOfferStockType;
  rating: number;
}

export interface IMarketOfferMetadata {
  views: number;
  sales: number;
}

export enum MarketOfferStockType {
  LIMITED = 'limited',
  OUT_STOCK = 'out_stock',
  INFINITY = 'infinity',
  INCOMING = 'incoming',
}

export interface IMarketOfferAttribute {
  name: string;
  value: string;
}

export interface IMarketOfferExtended extends IMarketOffer {
  metadata: IMarketOfferMetadata;
  // attributes: IMarketOfferAttribute[];
  store: IMarketStore;
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
  location_id: string;
}
