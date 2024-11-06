export interface IGeoAddress {
  location: IGeoLocation;
  address: string;
  number: string;
}

export interface IGeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface IGeoLocation {
  id: string;
  code: string;
  name: string;
  type: GeoLocationType;
  coordinates: IGeoCoordinates | null;
  children?: IGeoLocation[];
  zip_code: string;
}

export enum GeoLocationType {
  COUNTRY = 1,
  STATE = 2,
  CITY = 3,
  TOWN = 4,
}
