import Http from '@/app/network/Http';
import Routes from '@/app/shared/routes'
import config from '../config';
import { ISignInRequestPayload, ISignInResponse } from './interfaces';
import { Response } from '../network/domain/interfaces';

const http = new Http();

export const signIn = async (payload: ISignInRequestPayload): Promise<Response<ISignInResponse>> => {
  const url = Routes.signIn(config.api);
  const response = await http.post<ISignInRequestPayload, ISignInResponse>(url, { data: payload });
  return response;
}