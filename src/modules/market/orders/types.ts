import { IGeoLocation, IMarketOffer, IUser } from '@/main';
import { IPaginationParams } from '@/types/pagination';

export interface IMarketOrder {
  id: string;
  status: MarketOrderStatus;
  payment_status: MarketOrderPaymentStatus;
  delivery_status: MarketDeliveryStatus;
  offers_price: number;
  delivery_price: number;
  tax_price: number;
  total_price: number;
  order_offers: IMarketOrderOffer[];
  customer: IUser;
  created_at: string | null;
  updated_at: string | null;
}

export interface IMarketOrderExtended extends IMarketOrder {
  payments: IMarketOrderPayment[];
  delivery: IMarketDelivery;
}

export interface IMarketDelivery {
  recipient_name: string;
  recipient_contact: string;
  location?: IGeoLocation | null;
  address: string;
  latitude: number;
  longitude: number;
  status: MarketDeliveryStatus;
}

export interface IMarketOrderOffer {
  offer: IMarketOffer;
  quantity: number;
  offer_sell_price: number;
  offer_discount_price: number;
}

export interface IMarketOrderPayment {
  id: string;
  amount: number;
  is_paid: boolean;
  is_partial: boolean;
}

export enum MarketDeliveryStatus {
  PROCESSING = 'processing',
  ON_WAY = 'on_way',
  DELIVERED = 'delivered',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
}
export enum MarketOrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum MarketOrderPaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  PARTIALLY = 'partially',
}

/**
 * ------------------------------------------
 *	Requests
 * ------------------------------------------
 */

export interface IMarketOrderCreateRequest {
  offers: IMarketOrderItemRequest[];
  delivery: IMarketOrderDeliveryRequest;
}

export interface IMarketOrderItemRequest {
  id: string;
  quantity: number;
}

export interface IMarketOrderDeliveryRequest {
  name: string;
  contact: string;
  address: string;
  location_id: string;
  latitude: number;
  longitude: number;
}

export interface IMarketOrderFilterRequest extends IPaginationParams {}
