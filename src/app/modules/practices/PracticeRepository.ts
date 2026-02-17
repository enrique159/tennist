import Http from '@/app/network/Http';
import Routes from '@/app/shared/routes';
import config from '@/app/config';
import { AuthHeader, Response } from '@/app/network/domain/interfaces';
import {
  CreatePracticePayload,
  FindPracticesParams,
  Practice,
  PracticeStats,
} from '@/types';

const http = new Http();

export const createPractice = async (
  payload: CreatePracticePayload,
  authHeader: AuthHeader,
): Promise<Response<Practice>> => {
  const url = Routes.createPractice(config.api);
  const response = await http.post<CreatePracticePayload, Practice>(url, {
    data: payload,
    headers: authHeader,
  });
  return response;
};

export const getMyPractices = async (
  params: FindPracticesParams,
  authHeader: AuthHeader,
): Promise<Response<Practice[]>> => {
  const url = Routes.getMyPractices(config.api);
  const response = await http.get<FindPracticesParams, Practice[]>(url, {
    params,
    headers: authHeader,
  });
  return response;
};

export const getMyPracticeStats = async (
  params: FindPracticesParams,
  authHeader: AuthHeader,
): Promise<Response<PracticeStats>> => {
  const url = Routes.getMyPracticeStats(config.api);
  const response = await http.get<FindPracticesParams, PracticeStats>(url, {
    params,
    headers: authHeader,
  });
  return response;
};
