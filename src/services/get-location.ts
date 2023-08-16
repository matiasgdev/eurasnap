import axios from 'axios';
import {GEO_CODE_APIKEY} from '../const/api-key';
import {buildQueryParams} from '../lib/buildQueryParams';
import {getBaseURL} from '../lib/getBaseURL';
import {GeoCodeParams, GeocodingResponse} from '../models/Geocode';

export const getLocation = async (params: Partial<GeoCodeParams> = {}) => {
  const url = getBaseURL();
  const queryParams = buildQueryParams({
    ...params,
    key: GEO_CODE_APIKEY,
    lang: 'es',
  });

  const result = (
    await axios.get<GeocodingResponse>(`${url.href}?${queryParams.toString()}`)
  ).data;

  return result.results[0].formatted_address;
};
