import Http from '@/app/network/Http';
import Routes from '@/app/shared/routes'
import config from '@/app/config';
import { Response } from '@/app/network/domain/interfaces';
import { Client } from '@/types/Client.type';
import { IHttpSettings } from '@/app/network/domain/interfaces/IHttpSettings';
import { ID } from '@/types/Id.type';

const http = new Http();

export interface IClientRequest {
  name: string;
  lastnames?: string;
  phone?: string;
}

export const getClients = async(auth: IHttpSettings): Promise<Response<Array<Client>>> => {
  const url = Routes.getClients(config.api);
  const response = await http.get<string, Array<Client>>(url, { headers: { ...auth }});
  return response;
}

export const getClientById = async(clientId: string, auth: IHttpSettings): Promise<Response<Client>> => {
  const url = Routes.getClientById(config.api, clientId);
  const response = await http.get<string, Client>(url, { headers: { ...auth }});
  return response;
}

export const createClient = async(client: IClientRequest, auth: IHttpSettings): Promise<Response<{ id: ID }>> => {
  const url = Routes.createClient(config.api);
  const response = await http.post<IClientRequest, { id: ID }>(url, { data: client, headers: { ...auth }});
  return response;
}

export const updateClient = async(client: Client, auth: IHttpSettings): Promise<Response<{ id: ID }>> => {
  const url = Routes.updateClient(config.api, client.id.toString());
  const response = await http.put<Client, { id: ID }>(url, { data: client, headers: { ...auth }});
  return response;
}

export const deleteClient = async(clientId: string, auth: IHttpSettings): Promise<Response<{ id: ID }>> => {
  const url = Routes.deleteClient(config.api, clientId);
  const response = await http.delete<string, { id: ID }>(url, { headers: { ...auth }});
  return response;
}