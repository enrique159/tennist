import Http from '@/app/network/Http';
import Routes from '@/app/shared/routes'
import config from '@/app/config';
import { AuthHeader, Response } from '@/app/network/domain/interfaces';
import { FindNearbyVenuesParams, Venue } from '@/types';

const http = new Http();

export const getNearbyVenues = async (params: FindNearbyVenuesParams, authHeader: AuthHeader): Promise<Response<Venue[]>> => {
  const url = Routes.getNearbyVenues(config.api);
  const response = await http.get<FindNearbyVenuesParams, Venue[]>(url, { params, headers: authHeader });
  return response;
}