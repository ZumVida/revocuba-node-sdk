import { IGeoAddress, IGeoLocation } from '../../geo/types.ts';

export interface IMarketStore {
  id: string;
  slug: string;
  image: string;
  name: string;
  description: string;
  address: IGeoAddress;
}

export interface IMarketStoreExtended extends IMarketStore {
  metadata: IMarketStoreMetadata;
}

export interface IMarketStoreMetadata {
  scope: IGeoLocation;
}
