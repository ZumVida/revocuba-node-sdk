export interface IGeoAddress extends IGeoCoordinates {
  location: IGeoLocation;
  address: string;
}

export interface IGeoCoordinates {
  latitude: number | null;
  longitude: number | null;
}

export interface IGeoLocation extends IGeoCoordinates {
  id: string;
  name: string;
  type: GeoLocationType;
  children?: IGeoLocation[];
}

export enum GeoLocationType {
  COUNTRY = 'country',
  STATE = 'state',
  CITY = 'city',
  TOWN = 'town',
}

/**
 * ------------------------------------------
 * Requests
 * ------------------------------------------
 */
