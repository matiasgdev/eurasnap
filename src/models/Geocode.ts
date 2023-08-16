export interface GeoCodeParams {
  latlng: string;
  lang: string;
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface Location {
  lat: number;
  lng: number;
}

interface GeocodingResult {
  formatted_address: string;
  address_components: AddressComponent[];
  geometry: {
    location: Location;
  };
}

export interface GeocodingResponse {
  results: GeocodingResult[];
  status: string;
}
