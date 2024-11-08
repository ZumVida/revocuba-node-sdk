import { AxiosInstance } from 'axios';
import AuthService from './modules/users/auth/service';
import CategoryService from './modules/market/categories/service';
import OfferService from './modules/market/offers/customer.service';
import GeoService from './modules/geo/service';

function setup(api: AxiosInstance) {
  return {
    api,
    auth: AuthService(api),
    category: CategoryService(api),
    geo: GeoService(api),
    offer: OfferService(api),
  };
}

export default setup;

/**
 * ------------------------------------------
 * Utils
 * ------------------------------------------
 */

export * from './utils/initApi';
export * from './utils/interceptors';

/**
 * ------------------------------------------
 * Types
 * ------------------------------------------
 */

export * from './types/tokenHandler';

// Geo
export * from './modules/geo/types';
// Market
export * from './modules/market/categories/types';
export * from './modules/market/offers/types';
export * from './modules/market/orders/types';
export * from './modules/market/stores/types';
// User
export * from './modules/users/types';
export * from './modules/users/auth/types';
