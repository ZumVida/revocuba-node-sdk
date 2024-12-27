import {
  IGeoLocation,
  IMarketOffer,
  IMarketOfferFilterRequest,
  IMarketStore,
  IMarketStoreFilterRequest,
  setupService,
} from '@/service';
import { GeoLocationDB, MarketOfferDB, MarketStoreDB } from './models';

function syncMarket(service: ISyncParams) {
  /**
   * syncOffers
   * @param storeId
   */
  async function offers(
    params: IMarketOfferFilterRequest,
  ): Promise<IMarketOffer[]> {
    const { data } = await service.market.offer.filter(params);

    data.data.forEach(async (offer) => {
      await MarketOfferDB.upsert(offer);
    });

    return data.data;
  }

  /**
   * syncStores
   */
  async function stores(params: {
    filter: IMarketStoreFilterRequest;
    includeOffers: boolean;
  }): Promise<IMarketStore[]> {
    const { data } = await service.market.store.filter(params.filter);
    data.data.forEach(async (store) => {
      await MarketStoreDB.upsert(store);
      if (params.includeOffers) await offers({ store_id: store.id });
    });

    return data.data;
  }

  async function init(): Promise<void> {
    await MarketOfferDB.init();
    await MarketStoreDB.init();
  }

  return {
    init,
    offers,
    stores,
  };
}

function syncGeo(service: ISyncParams) {
  async function locations(): Promise<IGeoLocation[]> {
    const { data } = await service.geo.index();
    data.data.forEach(async (location) => {
      await GeoLocationDB.upsert(location);
    });

    return data.data;
  }

  async function init() {
    GeoLocationDB.init();
  }

  return {
    init,
    locations,
  };
}

export function sync(service: ISyncParams) {
  return {
    geo: syncGeo(service),
    market: syncMarket(service),
  };
}

type ISyncParams = ReturnType<typeof setupService>;
