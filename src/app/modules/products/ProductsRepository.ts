import Http from '@/app/network/Http';
import Routes from '@/app/shared/routes'
import config from '@/app/config';
import { Response } from '@/app/network/domain/interfaces';
import { Product } from '@/types/Product.type';
import { IHttpSettings } from '@/app/network/domain/interfaces/IHttpSettings';
import { ProductStock } from '@/types/ProductStock.type';

const http = new Http();

export const getProductsByCI = async(codigoInternet: string, auth: IHttpSettings): Promise<Response<Array<Product>>> => {
  const url = Routes.getProductsByCI(config.api, codigoInternet);
  const response = await http.get<string, Array<Product>>(url, { headers: { ...auth }});
  return response;
}

export const getStockByCI = async(codigoInternet: string, auth: IHttpSettings): Promise<Response<Array<ProductStock>>> => {
  const url = Routes.getStockByCI(config.api, codigoInternet);
  const response = await http.get<string, Array<ProductStock>>(url, { headers: { ...auth }});
  return response;
}