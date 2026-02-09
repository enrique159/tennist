import Http from '@/app/network/Http';
import Routes from '@/app/shared/routes'
import config from '@/app/config';
import { AuthHeader, Response } from '@/app/network/domain/interfaces';
import { User, UserExperience } from '@/types';

const http = new Http();

export const updateUserExperience = async (payload: Partial<UserExperience>, userId: string, authHeader: AuthHeader): Promise<Response<User>> => {
  const url = Routes.updateUserExperience(config.api, userId);
  const response = await http.put<Partial<UserExperience>, User>(url, { data: payload, headers: authHeader });
  return response;
}