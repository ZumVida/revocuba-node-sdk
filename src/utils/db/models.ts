import { IGeoLocation, IMarketOffer, IMarketStore } from '@/service';
import { IndexedDBService } from './db';

// Geo
export const GeoLocationDB = new IndexedDBService<IGeoLocation>(
  'geo_locations',
);
// Market
export const MarketOfferDB = new IndexedDBService<IMarketOffer>(
  'market_offers',
);
export const MarketStoreDB = new IndexedDBService<IMarketStore>(
  'market_stores',
);
